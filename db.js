// db.js
const mysql = require("mysql2");

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

// test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL pool connected successfully!");
  connection.release(); // IMPORTANT
});

module.exports = db;
