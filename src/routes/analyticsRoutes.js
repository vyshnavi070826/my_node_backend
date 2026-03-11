const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

// User action history and stats routes
router.get("/user/action-history", analyticsController.getUserActionHistory);
router.get("/user/action-summary", analyticsController.getUserActionSummary);
router.get("/user/activity-stats", analyticsController.getUserActivityStats);

// Department analytics
router.get("/department/:departmentId", analyticsController.getDepartmentAnalytics);

module.exports = router;
