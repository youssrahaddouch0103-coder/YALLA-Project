const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const TOKEN_TTL = "7d";

if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET is not set: using an insecure development secret.");
}

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
