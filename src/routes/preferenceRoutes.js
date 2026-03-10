const express = require("express");
const router = express.Router();

const preferenceController = require("../controllers/preferenceController");
const { verifyUser } = require("../middleware");

// Initialize preferences after login
router.post("/initialize", verifyUser, preferenceController.initializePreferences);

// Track department visits
router.post("/track-department", verifyUser, preferenceController.trackDepartment);

// Bookmarks
router.post("/bookmark", verifyUser, preferenceController.addBookmark);
router.post("/remove-bookmark", verifyUser, preferenceController.removeBookmark);

// Personal collections
router.post("/collection/create", verifyUser, preferenceController.createCollection);
router.post("/collection/add-item", verifyUser, preferenceController.addToCollection);
router.post("/collection/remove-item", verifyUser, preferenceController.removeFromCollection);
router.post("/collection/delete", verifyUser, preferenceController.deleteCollection);

// Get all preferences
router.get("/", verifyUser, preferenceController.getPreferences);

module.exports = router;
