const express = require("express");
const db = require("../db").promise;
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

const TYPES = ["worldcup", "guide", "activity", "transport"];
const PAYMENT_METHODS = ["card", "paypal", "bank_transfer", "cash"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function clip(value, max) {
    if (value === undefined || value === null || value === "") return null;
    return String(value).slice(0, max);
}

// GET /api/bookings — the signed-in user's bookings, newest first
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, type, title, city, DATE_FORMAT(trip_date, '%Y-%m-%d') AS trip_date, trip_time,
                    travelers, total_price, payment_method, image, status, created_at
             FROM bookings WHERE user_id = ? ORDER BY created_at DESC, id DESC`,
            [req.userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load your bookings" });
    }
});

// POST /api/bookings — record a booking. Card details are never sent here.
router.post("/", async (req, res) => {
    const b = req.body || {};
    const travelers = parseInt(b.travelers, 10) || 1;

    if (!TYPES.includes(b.type)) {
        return res.status(400).json({ error: "Unknown booking type" });
    }
    if (!b.title || !String(b.title).trim()) {
        return res.status(400).json({ error: "Booking title is required" });
    }
    if (b.trip_date && !DATE_RE.test(b.trip_date)) {
        return res.status(400).json({ error: "Invalid date" });
    }
    if (travelers < 1 || travelers > 50) {
        return res.status(400).json({ error: "Number of travelers must be between 1 and 50" });
    }
    const payment = PAYMENT_METHODS.includes(b.payment_method) ? b.payment_method : null;

    try {
        const [result] = await db.query(
            `INSERT INTO bookings (user_id, type, title, city, trip_date, trip_time, travelers,
                                   total_price, payment_method, image)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.userId,
                b.type,
                clip(String(b.title).trim(), 200),
                clip(b.city, 100),
                b.trip_date || null,
                clip(b.trip_time, 10),
                travelers,
                clip(b.total_price, 50),
                payment,
                clip(b.image, 500),
            ]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not save the booking" });
    }
});

// PATCH /api/bookings/:id/cancel — only the booking's owner can cancel it
router.patch("/:id/cancel", async (req, res) => {
    try {
        const [result] = await db.query(
            "UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?",
            [req.params.id, req.userId]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: "Booking not found" });
        res.json({ status: "cancelled" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not cancel the booking" });
    }
});

module.exports = router;
