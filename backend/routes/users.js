const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db").promise;
const { requireAuth } = require("../middleware/auth");
const { findUserById, MIN_PASSWORD_LENGTH } = require("./auth");

const router = express.Router();
router.use(requireAuth);

// Profile fields a user may edit, mapped to their column
const EDITABLE = ["full_name", "phone", "avatar", "language", "nationality", "passport_number", "currency"];
const MAX_AVATAR_LENGTH = 1024 * 1024; // data URL of an image under ~700 KB

// PUT /api/users/me — update the signed-in user's profile
router.put("/me", async (req, res) => {
    const body = req.body || {};
    const updates = {};
    for (const field of EDITABLE) {
        if (field in body) updates[field] = body[field] === "" ? null : body[field];
    }
    if ("full_name" in updates && !String(updates.full_name || "").trim()) {
        return res.status(400).json({ error: "Name cannot be empty" });
    }
    if (updates.avatar && String(updates.avatar).length > MAX_AVATAR_LENGTH) {
        return res.status(413).json({ error: "Profile picture is too large" });
    }
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Nothing to update" });
    }

    try {
        await db.query("UPDATE users SET ? WHERE id = ?", [updates, req.userId]);
        res.json({ user: await findUserById(req.userId) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not update the profile" });
    }
});

// PUT /api/users/me/password
router.put("/me/password", async (req, res) => {
    const { current_password, new_password } = req.body || {};
    if (!current_password || !new_password) {
        return res.status(400).json({ error: "Current and new password are required" });
    }
    if (new_password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    }

    try {
        const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [req.userId]);
        if (!rows[0] || !(await bcrypt.compare(current_password, rows[0].password))) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }
        const hash = await bcrypt.hash(new_password, 10);
        await db.query("UPDATE users SET password = ? WHERE id = ?", [hash, req.userId]);
        res.json({ message: "Password updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not change the password" });
    }
});

module.exports = router;
