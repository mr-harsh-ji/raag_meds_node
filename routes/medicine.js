// routes/medicine.js
const express = require('express');
const router = express.Router();
const db = require('../db');

/*
====================================
 GET all medicines (with LIVE SEARCH)
====================================
GET /medicines
GET /medicines?search=para
*/
router.get('/', (req, res) => {
  const search = req.query.search || "";

  let query = "SELECT * FROM medicines";
  let params = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

/*
===============================
 GET single medicine by ID
===============================
*/
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM medicines WHERE id = ?';

  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: 'Medicine not found' });

    res.json(results[0]);
  });
});

/*
===========================
 ADD new medicine
===========================
image = image URL/path
*/
router.post('/', (req, res) => {
  const { name, price, stock, image } = req.body;

  const query =
    'INSERT INTO medicines (name, price, stock, image) VALUES (?, ?, ?, ?)';

  db.query(query, [name, price, stock, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      status: true,
      message: 'Medicine added ✅',
      id: result.insertId,
    });
  });
});

/*
===========================
 UPDATE medicine
===========================
*/
router.put('/:id', (req, res) => {
  const { name, price, stock, image } = req.body;

  const query =
    'UPDATE medicines SET name = ?, price = ?, stock = ?, image = ? WHERE id = ?';

  db.query(
    query,
    [name, price, stock, image, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Medicine not found' });

      res.json({ status: true, message: 'Medicine updated ✅' });
    }
  );
});

/*
===========================
 DELETE medicine
===========================
*/
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM medicines WHERE id = ?';

  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Medicine not found' });

    res.json({ status: true, message: 'Medicine deleted ✅' });
  });
});

module.exports = router;
