require("dotenv").config();

const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connection pool: reconnects automatically and handles concurrent requests
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "yalla_db",
    waitForConnections: true,
    connectionLimit: 10,
});

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
