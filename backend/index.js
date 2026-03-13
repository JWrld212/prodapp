import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submissions.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://chain-assist.com",
  "https://www.chain-assist.com",
  process.env.CLIENT_ORIGIN,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(helmet());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "✅ API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);

  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal server error" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`✅ API running on :${port}`));
  })
  .catch((err) => {
    console.error("DB error:", err);
    process.exit(1);
  });