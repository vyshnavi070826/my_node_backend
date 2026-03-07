const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve all frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/templates/index.html"));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/departments", require("./routes/index"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/preferences", require("./routes/preferenceRoutes"));

module.exports = app;