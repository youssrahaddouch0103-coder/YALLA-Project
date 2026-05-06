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
    res.send("Backend running");
});

app.get("/api/destinations", (req, res) => {
    const sql = "SELECT * FROM destinations";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});