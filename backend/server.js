require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { router: authRouter } = require("./routes/auth");
const usersRouter = require("./routes/users");
const wishlistRouter = require("./routes/wishlist");
const bookingsRouter = require("./routes/bookings");
const reviewsRouter = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "2mb" })); // profile pictures are sent as data URLs

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("MySQL connected");
        connection.release();
    }
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/reviews", reviewsRouter);

// GET all destinations
app.get("/api/destinations", (req, res) => {
    const sql = "SELECT * FROM destinations ORDER BY popularity DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(result);
    });
});

// GET destination by ID
app.get("/api/destinations/:id", (req, res) => {
    const sql = "SELECT * FROM destinations WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length === 0) return res.status(404).json({ message: "Destination not found" });
        res.json(result[0]);
    });
});

// GET restaurants, accommodations or activities for a city
const cityResources = {
    restaurants: "restaurants",
    accommodations: "accommodations",
    activities: "activities",
};

for (const [route, table] of Object.entries(cityResources)) {
    app.get(`/api/${route}/:city_id`, (req, res) => {
        const sql = `SELECT * FROM ${table} WHERE city_id = ?`;
        db.query(sql, [req.params.city_id], (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(result);
        });
    });
}

// Serve the website itself, so `npm start` runs everything on one port
const frontendDir = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendDir));
app.get("/", (req, res) => res.sendFile(path.join(frontendDir, "index.html")));

app.listen(PORT, () => {
    console.log(`YALLA running on http://localhost:${PORT}`);
});
