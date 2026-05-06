const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "yalla_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.get("/", (req, res) => {
    res.send("Yalla Morocco Backend Running");
});

// GET all destinations
app.get("/api/destinations", (req, res) => {
    const sql = "SELECT * FROM destinations ORDER BY popularity DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// GET destination by ID
app.get("/api/destinations/:id", (req, res) => {
    const sql = "SELECT * FROM destinations WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: "Destination not found" });
        res.json(result[0]);
    });
});

// GET restaurants for a city
app.get("/api/restaurants/:city_id", (req, res) => {
    const sql = "SELECT * FROM restaurants WHERE city_id = ?";
    db.query(sql, [req.params.city_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// GET accommodations for a city
app.get("/api/accommodations/:city_id", (req, res) => {
    const sql = "SELECT * FROM accommodations WHERE city_id = ?";
    db.query(sql, [req.params.city_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// GET activities for a city
app.get("/api/activities/:city_id", (req, res) => {
    const sql = "SELECT * FROM activities WHERE city_id = ?";
    db.query(sql, [req.params.city_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});