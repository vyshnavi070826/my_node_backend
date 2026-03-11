const {
  getUserActionHistory,
  getUserActionSummary,
  getDepartmentAnalytics
} = require("../utils/actionLogger");
const User = require("../models/User");

/**
 * Get user action history
 */
exports.getUserActionHistory = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;
    const { limit = 50, skip = 0, actionType, startDate, endDate } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const history = await getUserActionHistory(userId, {
      limit: parseInt(limit),
      skip: parseInt(skip),
      actionType,
      startDate,
      endDate
    });

    res.json({
      success: true,
      data: history,
      count: history.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get user action summary
 */
exports.getUserActionSummary = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const summary = await getUserActionSummary(userId);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get user activity stats
 */
exports.getUserActivityStats = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        accountStatus: user.accountStatus,
        activityStats: user.activityStats,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get department analytics
 */
exports.getDepartmentAnalytics = async (req, res) => {
  try {
    const { departmentId } = req.params;

    if (!departmentId) {
      return res.status(400).json({ message: "Department ID required" });
    }

    const analytics = await getDepartmentAnalytics(departmentId);

    res.json({
      success: true,
      departmentId,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
