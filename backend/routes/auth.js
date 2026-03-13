import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  // Use 'none' for cross-device testing in development, 'none' is required for production cross-origin
  sameSite: "none", 
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// check session
router.get("/me", (req, res) => {
  const token = req.cookies?.admin_token;
  
  console.log("Checking session, cookies received:", req.cookies);
  console.log("Token found:", !!token);

  if (!token) {
    return res.json({ isAdmin: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified");
    return res.json({ isAdmin: true });
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return res.json({ isAdmin: false });
  }
});

// login
router.post("/login", (req, res) => {
  const { code } = req.body || {};
  
  console.log("Login attempt, origin:", req.headers.origin);

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

  console.log("Cookie options:", cookieOptions);
  res.cookie("admin_token", token, cookieOptions);
  
  // Ensure credentials header is set
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  console.log("✅ Login successful, token set");
  return res.json({ ok: true });
});

// logout
router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  return res.json({ ok: true });
});

export default router;