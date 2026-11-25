const express = require("express");
const db = require("../db").promise;
const { requireAuth } = require("../middleware/auth");
const { findUserById } = require("./auth");

const router = express.Router();

// GET /api/reviews — latest traveler reviews, public
router.get("/", async (req, res) => {
    const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
    try {
        const [rows] = await db.query(
            "SELECT id, name, title, text, rating, created_at FROM reviews ORDER BY created_at DESC, id DESC LIMIT ?",
            [limit]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load reviews" });
    }
});

// POST /api/reviews — signed-in travelers only, to limit spam
router.post("/", requireAuth, async (req, res) => {
    const { title, text } = req.body || {};
    const rating = parseInt(req.body && req.body.rating, 10);
    if (!(rating >= 1 && rating <= 5)) {
        return res.status(400).json({ error: "Please choose a rating from 1 to 5 stars" });
    }
    if (!text || !String(text).trim()) {
        return res.status(400).json({ error: "Please write a few words about your trip" });
    }

    try {
        const user = await findUserById(req.userId);
        const name = String((req.body.name || "").trim() || user.full_name).slice(0, 100);
        const [result] = await db.query(
            "INSERT INTO reviews (user_id, name, title, text, rating) VALUES (?, ?, ?, ?, ?)",
            [req.userId, name, title ? String(title).trim().slice(0, 150) : null, String(text).trim().slice(0, 2000), rating]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not post the review" });
    }
});

module.exports = router;
