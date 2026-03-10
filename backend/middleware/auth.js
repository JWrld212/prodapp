import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err)  {
    return res.status(401).json({ message: "Invalid session" });
  }
}
export default { requireAdmin }; 