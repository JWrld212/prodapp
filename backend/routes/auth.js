import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// check session
router.get("/me", async (req, res) => {
  const token = req.cookies?.admin_token;
  if (!token) return res.json({ isAdmin: false });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAdmin: true });
  } catch {
    return res.json({ isAdmin: false });
  }
});

// login
router.post("/login", async (req, res) => {
  const { code } = req.body || {};
  if (!code) return res.status(400).json({ message: "Missing code" });

  // Use ADMIN_PASSWORD from .env
  const adminSecret = process.env.ADMIN_PASSWORD;
  if (!adminSecret) return res.status(500).json({ message: "Admin secret not set" });

  // Compare code directly (no hashing for simplicity)
  if (code !== adminSecret) return res.status(401).json({ message: "Invalid code" });

  // Create a dummy admin token
  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ ok: true });
});

// logout
router.post("/logout", async (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ ok: true });
});

export default router;