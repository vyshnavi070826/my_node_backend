const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve all frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Homepage & index.html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/templates/index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/templates/index.html"));
});

// Template HTML routes (serve from templates folder)
const templateFiles = [
  'departments.html',
  'hub.html',
  'jobs.html',
  'exams.html',
  'programs.html',
  'startup.html',
  'startup-guide.html',
  'skill-matcher.html',
  'bookmarks.html',
  'NxstepGo.html',
  'login.html',
  'signup.html'
];

templateFiles.forEach(file => {
  app.get(`/${file}`, (req, res) => {
    res.sendFile(path.join(__dirname, `../frontend/templates/${file}`));
  });
});

// MongoDB connection with proper configuration
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 10,
  minPoolSize: 2
})
.then(() => {
  console.log("✓ MongoDB Connected Successfully");
})
.catch(err => {
  console.error("✗ MongoDB Connection Error:", err.message);
  console.error("Connection String:", process.env.MONGO_URI ? "Set" : "NOT SET");
});

// Routes
app.use("/api/departments", require("./routes/index"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/preferences", require("./routes/preferenceRoutes"));
app.use("/api/skill-matcher", require("./routes/skillMatcherRoutes"));

module.exports = app;