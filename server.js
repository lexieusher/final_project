/**
 * server.js — Backend Development
 * ---------------------------------------------------
 * This file is a partially completed backend for the
 * Electron Community Hub project.
 *
 * Your task is to finish implementing:
 *   ✔ Database tables
 *   ✔ API routes for plugins
 *   ✔ API routes for issues
 *   ✔ API routes for FAQs
 *
 * IMPORTANT:
 * The backend uses SQLite. The database file MUST exist
 * in the backend folder and must be named:
 *
 *          database.db
 *
 * If the file does not exist, SQLite will automatically
 * create it. But your CREATE TABLE statements MUST run
 * correctly, or the public pages will NOT work.
 */

// -----------------------------------------------------
// 1. IMPORT DEPENDENCIES
// -----------------------------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// -----------------------------------------------------
// 2. INITIALIZE EXPRESS APP
// -----------------------------------------------------
const app = express();
const PORT = 4000;

// Middleware so server accepts JSON and cross-origin requests
app.use(express.json());
app.use(cors());

// -----------------------------------------------------
// 3. SERVE STATIC FRONTEND FILES
// -----------------------------------------------------
const PUBLIC_DIR = path.join(__dirname, "..", "public");
app.use(express.static(PUBLIC_DIR));

// Optional: When visiting "/", load index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

// -----------------------------------------------------
// 4. CONNECT TO SQLITE DATABASE
// -----------------------------------------------------
/**
 * DATABASE NOTE:
 * ---------------
 * SQLite stores all data in a single file.
 * If database.db does NOT exist yet, SQLite will create it.
 *
 * Create tables using SQL so they appear in the file.
 *
 * Example:
 *   db.run("CREATE TABLE IF NOT EXISTS plugins (...)");
 */

const DB_PATH = path.join(__dirname, "database.db");
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(" Failed to connect to database:", err.message);
  } else {
    console.log(" Connected to SQLite database:", DB_PATH);
  }
});

// -----------------------------------------------------
// 5. INITIALIZE DATABASE TABLES
// -----------------------------------------------------
/**
 * TODO: create ALL project tables here.
 *       Use db.run("CREATE TABLE IF NOT EXISTS ...")
 *
 * Required tables:
 *
 *  plugins
 *    id INTEGER PRIMARY KEY
 *    name TEXT
 *    author TEXT
 *    version TEXT
 *    rating REAL
 *
 * tags
 *    id INTEGER PRIMARY KEY
 *    name TEXT
 *
 * plugin_tags  (many-to-many join table)
 *    plugin_id INTEGER
 *    tag_id INTEGER
 *
 *  issues
 *    id INTEGER PRIMARY KEY
 *    title TEXT
 *    severity TEXT
 *    status TEXT
 *    created_at TEXT
 *
 *  faqs
 *    id INTEGER PRIMARY KEY
 *    question TEXT
 *    answer TEXT
 */

function initializeDatabase() {
  db.serialize(() => {
    console.log("🛠 Creating tables (if they do not exist)...");

    // EXAMPLE of how to create a table:
    db.run(
      `
      CREATE TABLE IF NOT EXISTS plugins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        author TEXT NOT NULL,
        version TEXT NOT NULL,
        rating REAL NOT NULL
      );
      `,
      (err) => {
        if (err) console.log(" Error creating plugins table:", err.message);
        else console.log(" plugins table ready");
      }
    );

    // TODO: Create remaining tables (tags, plugin_tags, issues, faqs)
  });
}

// Run table creation on server start
initializeDatabase();

// -----------------------------------------------------
// 6. API ROUTES (You will fill these in)
// -----------------------------------------------------
/**
 * Implement:
 *
 * ------------- PLUGIN ROUTES -------------
 * GET  /api/plugins
 * POST /api/plugins
 *
 * ------------- TAG ROUTES ---------------
 * GET /api/tags    (for dropdown filter)
 *
 * ------------- ISSUE ROUTES --------------
 * GET  /api/issues
 * POST /api/issues
 *
 * ------------- FAQ ROUTES ----------------
 * GET  /api/faqs
 * POST /api/faqs
 *
 * Each route should use SQL queries with db.all() or db.run()
 */


// EXAMPLE EMPTY ROUTE (Replace with real SQL logic)
app.get("/api/plugins", (req, res) => {
  res.json({ message: "TODO: Return plugin list from database" });
});

app.post("/api/plugins", (req, res) => {
  res.json({ message: "TODO: Insert plugin into database" });
});

// TODO: Add routes for tags, issues, and faqs


// -----------------------------------------------------
// 7. START THE SERVER
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
  console.log(" Serving files from:", PUBLIC_DIR);
});
