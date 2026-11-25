const mysql = require("mysql2");

// Hosted databases such as TiDB Cloud require an encrypted connection
const useSsl = process.env.DB_SSL === "true";

const settings = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "yalla_db",
    ssl: useSsl ? { minVersion: "TLSv1.2", rejectUnauthorized: true } : undefined,
};

// Connection pool: reconnects automatically and handles concurrent requests.
// `db.promise()` gives an async/await API for the newer routes.
const db = mysql.createPool({ ...settings, waitForConnections: true, connectionLimit: 10 });

module.exports = db;
module.exports.promise = db.promise();
module.exports.settings = settings;
