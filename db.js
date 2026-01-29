// db.js
const mysql = require("mysql2");

// database connection setup
const db = mysql.createConnection({
  host: "localhost",     // apka computer
  user: "root",          // MySQL username
  password: "",          // MySQL password, agar hai to yaha dal do
  database: "raag_meds", // jo database tum php me use kar rahe the
  port: 3306             // default MySQL port
});

// connect check
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("MySQL connected successfully!");
});

module.exports = db; // ye export kar rahe hain taaki baki files use kar saken
