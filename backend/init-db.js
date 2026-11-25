/**
 * Creates the tables and loads the seed data from database/yalla_db.sql
 * when the configured database is still empty.
 *
 * Runs automatically at startup when DB_AUTO_INIT=true (used for hosting,
 * where there is no terminal to import the SQL file), or by hand:
 *   npm run db:init
 */
if (require.main === module) require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const { settings } = require("./db");

const SQL_FILE = path.join(__dirname, "..", "database", "yalla_db.sql");

async function initDatabase() {
    const connection = await mysql.createConnection({ ...settings, multipleStatements: true });
    try {
        const [tables] = await connection.query("SHOW TABLES LIKE 'destinations'");
        if (tables.length > 0) {
            console.log("Database already initialised");
            return false;
        }
        // The file creates and selects `yalla_db`; on a hosted database we load it
        // into the database named in DB_NAME instead.
        const sql = fs
            .readFileSync(SQL_FILE, "utf8")
            .replace(/^CREATE DATABASE[^;]*;/im, "")
            .replace(/^USE [^;]*;/im, "");
        await connection.query(sql);
        console.log("Database initialised from database/yalla_db.sql");
        return true;
    } finally {
        await connection.end();
    }
}

module.exports = initDatabase;

if (require.main === module) {
    initDatabase().catch((err) => {
        console.error("Database initialisation failed:", err.message);
        process.exit(1);
    });
}
