#!/usr/bin/env node
/**
 * MongoDB Connection Test
 * Run: node test-mongodb-connection.js
 * This will verify if MongoDB can be reached and authenticated
 */

require("dotenv").config();
const mongoose = require("mongoose");

console.log("🔍 MongoDB Connection Test");
console.log("========================\n");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables");
  process.exit(1);
}

console.log("Connection String (masked):", MONGO_URI.replace(/:[^:]*@/, ":****@"));
console.log("Connecting...\n");

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  w: 'majority',
  maxPoolSize: 10,
  minPoolSize: 2
})
.then(() => {
  console.log("✅ SUCCESS: MongoDB Connected!");
  console.log("\nConnection Details:");
  console.log("- Host:", mongoose.connection.host);
  console.log("- Port:", mongoose.connection.port);
  console.log("- Database:", mongoose.connection.name);
  console.log("- Ready State:", mongoose.connection.readyState, "(1 = connected)");
  
  // Test a simple operation
  return testConnection();
})
.then(() => {
  console.log("\n✅ Test completed successfully");
  process.exit(0);
})
.catch(error => {
  console.error("\n❌ CONNECTION FAILED");
  console.error("Error:", error.message);
  console.error("\nTroubleshooting:");
  console.error("1. Check if MONGO_URI is correct in .env");
  console.error("2. Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0 or your IP)");
  console.error("3. Check if MongoDB credentials are correct");
  console.error("4. Check network connectivity to MongoDB");
  
  process.exit(1);
});

// Test connection by listing databases
async function testConnection() {
  try {
    const db = mongoose.connection.db;
    console.log("\nTesting database operations...");
    const adminDb = db.admin();
    const { databases } = await adminDb.listDatabases();
    console.log("✅ Databases found:", databases.length);
    databases.forEach(db => {
      console.log(`   - ${db.name}`);
    });
  } catch (error) {
    console.warn("⚠️ Could not list databases:", error.message);
  }
}
