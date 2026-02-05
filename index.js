// index.js
const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/uploads/profile", express.static("uploads/profile"));
app.use("/uploads/posts", express.static("uploads/posts"));
app.use("/uploads/medicines", express.static("uploads/medicines"));

app.get("/", (req, res) => {
  res.json({ status: true, message: "API running successfully 🚀" });
});

app.get("/medicines", async (req, res) => {
  const search = req.query.search || "";
  try {
    let query = "SELECT * FROM medicines";
    const params = [];
    if (search) {
      query += " WHERE name LIKE ?";
      params.push(`%${search}%`);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

app.get("/medicines/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM medicines WHERE id=?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Medicine not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicine" });
  }
});

app.post("/medicines", async (req, res) => {
  const { name, price, stock, image } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO medicines(name, price, stock, image) VALUES (?,?,?,?)",
      [name, price, stock, image]
    );
    res.json({ status: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

app.put("/medicines/:id", async (req, res) => {
  const { name, price, stock, image } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE medicines SET name=?, price=?, stock=?, image=? WHERE id=?",
      [name, price, stock, image, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Medicine not found" });
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update medicine" });
  }
});

app.delete("/medicines/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM medicines WHERE id=?",
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Medicine not found" });
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
});

const PORT = process.env.PORT || 1100;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 API running on port:", PORT);
});
