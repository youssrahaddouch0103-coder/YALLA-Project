const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db").promise;
const { signToken, requireAuth } = require("../middleware/auth");

const router = express.Router();

const PUBLIC_FIELDS =
    "id, full_name, email, phone, avatar, language, nationality, passport_number, currency, join_date";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

async function findUserById(id) {
    const [rows] = await db.query(`SELECT ${PUBLIC_FIELDS} FROM users WHERE id = ?`, [id]);
    return rows[0] || null;
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    const { full_name, email, password, phone, nationality, passport_number } = req.body || {};
    const name = (full_name || "").trim();
    const mail = (email || "").trim().toLowerCase();

    if (!name || !mail || !password) {
        return res.status(400).json({ error: "Name, email and password are required" });
    }
    if (!EMAIL_RE.test(mail)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            `INSERT INTO users (full_name, email, password, phone, nationality, passport_number)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, mail, hash, phone || null, nationality || null, passport_number || null]
        );
        const user = await findUserById(result.insertId);
        res.status(201).json({ token: signToken(user), user });
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "An account already exists with this email" });
        }
        console.error(err);
        res.status(500).json({ error: "Could not create the account" });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    const mail = ((req.body && req.body.email) || "").trim().toLowerCase();
    const password = (req.body && req.body.password) || "";
    if (!mail || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const [rows] = await db.query("SELECT id, password FROM users WHERE email = ?", [mail]);
        const match = rows[0] && (await bcrypt.compare(password, rows[0].password));
        if (!match) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }
        const user = await findUserById(rows[0].id);
        res.json({ token: signToken(user), user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not sign in" });
    }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await findUserById(req.userId);
        if (!user) return res.status(401).json({ error: "Account not found" });
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load the account" });
    }
});

module.exports = { router, findUserById, MIN_PASSWORD_LENGTH };
