import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// check session
router.get("/me", (req, res) => {
  const token = req.cookies?.admin_token;

  console.log("Cookies received on /me:", req.cookies);

  if (!token) {
    return res.json({ isAdmin: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ isAdmin: true });
  } catch {
    return res.json({ isAdmin: false });
  }
});

// login
router.post("/login", (req, res) => {
  const { code } = req.body || {};

  if (!code) {
    return res.status(400).json({ message: "Missing code" });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ message: "Admin secret not set" });
  }

  if (code !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid code" });
  }

  const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".chain-assist.com",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.json({ ok: true });
});

// logout
router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".chain-assist.com",
    path: "/",
  });

  return res.json({ ok: true });
});

export default router;