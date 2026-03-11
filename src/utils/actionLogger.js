const UserActionLog = require('../models/UserActionLog');
const User = require('../models/User');

/**
 * Log user action to database
 * @param {String} userId - User ID
 * @param {String} actionType - Type of action (LOGIN, BOOKMARK_ADD, etc.)
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Created action log document
 */
async function logUserAction(userId, actionType, options = {}) {
  try {
    if (!userId) {
      console.warn('logUserAction: userId is required');
      return null;
    }

    const {
      resourceType = null,
      resourceId = null,
      resourceName = null,
      departmentId = null,
      departmentName = null,
      metadata = {},
      status = 'SUCCESS',
      error = null,
      sessionId = null,
      userAgent = null,
      ipAddress = null
    } = options;

    // Create action log entry
    const actionLog = new UserActionLog({
      userId,
      actionType,
      resourceInfo: {
        resourceType,
        resourceId,
        resourceName,
        departmentId,
        departmentName
      },
      metadata: {
        ...metadata,
        userAgent,
        ipAddress
      },
      status,
      error,
      sessionId,
      timestamp: new Date()
    });

    await actionLog.save();

    // Update user's activity stats
    await updateUserActivityStats(userId, actionType);

    console.log(`✓ Action logged: ${actionType} for user ${userId}`);
    return actionLog;
  } catch (error) {
    console.error('Error logging user action:', error);
    return null;
  }
}

/**
 * Update user's activity statistics
 * @param {String} userId - User ID
 * @param {String} actionType - Type of action
 */
async function updateUserActivityStats(userId, actionType) {
  try {
    const update = {
      'activityStats.lastActivityAt': new Date()
    };

    // Update specific counters based on action type
    if (actionType === 'LOGIN') {
      update['activityStats.totalLoginCount'] = { $inc: 1 };
      update['activityStats.lastLoginAt'] = new Date();
    } else if (actionType === 'LOGOUT') {
      update['activityStats.lastLogoutAt'] = new Date();
    } else if (actionType === 'BOOKMARK_ADD') {
      update['activityStats.totalBookmarks'] = { $inc: 1 };
    } else if (actionType === 'SKILL_SEARCH') {
      update['activityStats.totalSearches'] = { $inc: 1 };
    }

    await User.findByIdAndUpdate(userId, update, { new: true });
  } catch (error) {
    console.error('Error updating user activity stats:', error);
  }
}

/**
 * Get user action history
 * @param {String} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} - Array of action logs
 */
async function getUserActionHistory(userId, options = {}) {
  try {
    const {
      limit = 50,
      skip = 0,
      actionType = null,
      startDate = null,
      endDate = null
    } = options;

    const query = { userId };

    if (actionType) {
      query.actionType = actionType;
    }

    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const actions = await UserActionLog.find(query)
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    return actions;
  } catch (error) {
    console.error('Error fetching user action history:', error);
    return [];
  }
}

/**
 * Get user action summary/stats
 * @param {String} userId - User ID
 * @returns {Promise<Object>} - Summary statistics
 */
async function getUserActionSummary(userId) {
  try {
    const summary = await UserActionLog.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$actionType',
          count: { $sum: 1 },
          lastOccurrence: { $max: '$timestamp' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    return summary;
  } catch (error) {
    console.error('Error fetching user action summary:', error);
    return [];
  }
}

/**
 * Get analytics for a department
 * @param {String} departmentId - Department ID
 * @returns {Promise<Object>} - Department analytics
 */
async function getDepartmentAnalytics(departmentId) {
  try {
    const analytics = await UserActionLog.aggregate([
      { 
        $match: { 
          'resourceInfo.departmentId': departmentId 
        } 
      },
      {
        $group: {
          _id: '$actionType',
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          actionType: '$_id',
          count: 1,
          uniqueUsersCount: { $size: '$uniqueUsers' },
          _id: 0
        }
      }
    ]);

    return analytics;
  } catch (error) {
    console.error('Error fetching department analytics:', error);
    return [];
  }
}

module.exports = {
  logUserAction,
  updateUserActivityStats,
  getUserActionHistory,
  getUserActionSummary,
  getDepartmentAnalytics
};
