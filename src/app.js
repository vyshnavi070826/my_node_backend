const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname, "../frontend")));

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ DB Error:", err.message);
  });

// Routes
app.use("/api/departments", require("./routes/index"));
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;