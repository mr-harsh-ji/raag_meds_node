// index.js

const express = require("express"); // express ko bula rahe hain
const app = express();              // app bana rahe hain

const PORT = 1100;                  // 👈 tumhara lucky port

const cors = require("cors");
const path = require("path");
app.use(cors());  // 🚀 ab browser se fetch request allowed hai
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ye line batati hai: data JSON me aayega
app.use(express.static("public"));
app.use(express.json());

// root route (test ke liye)
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Node.js API running on port 1100"
  });
});

const medicinesRoute = require("./routes/medicine");
app.use("/medicines", medicinesRoute);


// server start karo
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});
