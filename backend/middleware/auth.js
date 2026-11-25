const jwt = require("jsonwebtoken");

const crypto = require("crypto");

// JWT_SECRET if set; otherwise derived from the database password, which is
// already secret, so a deployment only needs one secret value.
function resolveSecret() {
    if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
    if (process.env.DB_PASSWORD) {
        return crypto.createHmac("sha256", process.env.DB_PASSWORD).update("yalla-jwt").digest("hex");
    }
    console.warn("JWT_SECRET is not set: using an insecure development secret.");
    return "dev-only-secret-change-me";
}

const JWT_SECRET = resolveSecret();
const TOKEN_TTL = "7d";

function signToken(user) {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

// Rejects the request unless it carries a valid "Authorization: Bearer <token>" header
function requireAuth(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ error: "Authentication required" });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.sub;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired session" });
    }
}

module.exports = { signToken, requireAuth };
