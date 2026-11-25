const express = require("express");
const db = require("../db").promise;
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
router.use(requireAuth);

const SELECT_ITEMS = `SELECT item_id AS id, item_type AS type, name, image, city, price, category, added_at
                      FROM wishlist WHERE user_id = ? ORDER BY added_at DESC, id DESC`;

function clip(value, max) {
    if (value === undefined || value === null || value === "") return null;
    return String(value).slice(0, max);
}

// GET /api/wishlist — the signed-in user's saved items
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(SELECT_ITEMS, [req.userId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load the wishlist" });
    }
});

// POST /api/wishlist — save an item (saving it twice is harmless)
router.post("/", async (req, res) => {
    const item = req.body || {};
    if (!item.id || !item.type) {
        return res.status(400).json({ error: "Item id and type are required" });
    }
    try {
        await db.query(
            `INSERT INTO wishlist (user_id, item_id, item_type, name, image, city, price, category)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image), city = VALUES(city),
                                     price = VALUES(price), category = VALUES(category)`,
            [
                req.userId,
                clip(item.id, 50),
                clip(item.type, 30),
                clip(item.name, 150),
                clip(item.image, 500),
                clip(item.city, 100),
                clip(item.price, 50),
                clip(item.category, 50),
            ]
        );
        res.status(201).json({ saved: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not save this item" });
    }
});

// DELETE /api/wishlist/:type/:id
router.delete("/:type/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM wishlist WHERE user_id = ? AND item_type = ? AND item_id = ?", [
            req.userId,
            req.params.type,
            req.params.id,
        ]);
        res.json({ saved: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not remove this item" });
    }
});

module.exports = router;
