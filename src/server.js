require("dotenv").config();  

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// Start server when MongoDB is connected
const startServer = async () => {
  try {
    // Wait for MongoDB connection before starting server
    if (mongoose.connection.readyState === 0) {
      console.log("⏳ Waiting for MongoDB connection...");
      // Give MongoDB up to 10 seconds to connect
      let attempts = 0;
      while (mongoose.connection.readyState === 0 && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }
    }

    if (mongoose.connection.readyState !== 1) {
      console.warn("⚠️ MongoDB not connected yet, but starting server anyway...");
      console.warn("📌 Connection status:", mongoose.connection.readyState);
    } else {
      console.log("✓ MongoDB Connected - Server starting");
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();