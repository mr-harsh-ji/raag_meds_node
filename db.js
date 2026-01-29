// db.js
const mysql = require("mysql2/promise");

// MySQL CONNECTION POOL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "raag_meds",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL connected successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

module.exports = db;
