```
MONGODB QUERY EXAMPLES & USE CASES
===================================

This file contains practical MongoDB queries you can use with your data.


=== USER ENGAGEMENT QUERIES ===

1. Get Top 10 Most Active Users (Last 30 Days)
─────────────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      timestamp: {
        $gte: new Date(Date.now() - 30*24*60*60*1000)
      }
    }
  },
  {
    $group: {
      _id: "$userId",
      actionCount: { $sum: 1 },
      lastAction: { $max: "$timestamp" }
    }
  },
  {
    $sort: { actionCount: -1 }
  },
  {
    $limit: 10
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $project: {
      _id: 0,
      userId: "$_id",
      userName: { $arrayElemAt: ["$user.name", 0] },
      userEmail: { $arrayElemAt: ["$user.email", 0] },
      actionCount: 1,
      lastAction: 1
    }
  }
])

Result:
[
  {
    userId: ObjectId("..."),
    userName: "John Doe",
    userEmail: "john@example.com",
    actionCount: 42,
    lastAction: ISODate("2026-03-11T14:30:00Z")
  },
  ...
]


2. Get User Activity Summary for One Week
──────────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      userId: ObjectId("USER_ID_HERE"),
      timestamp: {
        $gte: new Date(Date.now() - 7*24*60*60*1000)
      }
    }
  },
  {
    $group: {
      _id: "$actionType",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
])

Result:
[
  { _id: "BOOKMARK_ADD", count: 15 },
  { _id: "LOGIN", count: 8 },
  { _id: "DEPARTMENT_VIEW", count: 5 }
]


3. Find Users Who Haven't Been Active for 30+ Days
────────────────────────────────────────────────

db.users.find({
  "activityStats.lastActivityAt": {
    $lt: new Date(Date.now() - 30*24*60*60*1000)
  }
})

or with calculated field:

db.users.aggregate([
  {
    $addFields: {
      daysSinceActivity: {
        $divide: [
          { $subtract: [new Date(), "$activityStats.lastActivityAt"] },
          1000 * 60 * 60 * 24
        ]
      }
    }
  },
  {
    $match: {
      daysSinceActivity: { $gte: 30 }
    }
  },
  {
    $project: {
      name: 1,
      email: 1,
      daysSinceActivity: 1,
      lastActivityAt: "$activityStats.lastActivityAt"
    }
  }
])

Result:
[
  {
    name: "Jane Smith",
    email: "jane@example.com",
    daysSinceActivity: 45,
    lastActivityAt: ISODate("2026-01-26T10:00:00Z")
  },
  ...
]


=== BOOKMARK ANALYTICS ===

4. Get Most Bookmarked Jobs
────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      actionType: "BOOKMARK_ADD",
      "resourceInfo.resourceType": "job"
    }
  },
  {
    $group: {
      _id: "$resourceInfo.resourceName",
      bookmarkCount: { $sum: 1 },
      uniqueUsers: { $addToSet: "$userId" },
      departmentId: { $first: "$resourceInfo.departmentId" }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { bookmarkCount: -1 }
  },
  {
    $limit: 20
  }
])

Result:
[
  {
    _id: "Software Engineer",
    bookmarkCount: 156,
    uniqueUserCount: 89,
    departmentId: "biotech"
  },
  {
    _id: "Data Scientist",
    bookmarkCount: 134,
    uniqueUserCount: 72,
    departmentId: "biotech"
  },
  ...
]


5. Get Bookmark Removal Rate for Each Job
──────────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      actionType: { $in: ["BOOKMARK_ADD", "BOOKMARK_REMOVE"] },
      "resourceInfo.resourceType": "job"
    }
  },
  {
    $group: {
      _id: "$resourceInfo.resourceName",
      adds: {
        $sum: { $cond: [{ $eq: ["$actionType", "BOOKMARK_ADD"] }, 1, 0] }
      },
      removals: {
        $sum: { $cond: [{ $eq: ["$actionType", "BOOKMARK_REMOVE"] }, 1, 0] }
      }
    }
  },
  {
    $addFields: {
      removalRate: {
        $multiply: [
          { $divide: ["$removals", { $max: ["$adds", 1] }] },
          100
        ]
      }
    }
  },
  {
    $sort: { removalRate: -1 }
  },
  {
    $project: {
      jobName: "$_id",
      totalAdds: "$adds",
      totalRemovals: "$removals",
      removalRate: { $round: ["$removalRate", 2] },
      _id: 0
    }
  }
])

Result:
[
  {
    jobName: "Intern",
    totalAdds: 50,
    totalRemovals: 30,
    removalRate: 60
  },
  {
    jobName: "Senior Engineer",
    totalAdds: 120,
    totalRemovals: 15,
    removalRate: 12.5
  },
  ...
]


=== DEPARTMENT ANALYTICS ===

6. Get Department Popularity (By Action Count)
───────────────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      actionType: { $in: ["DEPARTMENT_VIEW", "JOB_VIEW", "BOOKMARK_ADD"] },
      "resourceInfo.departmentId": { $exists: true }
    }
  },
  {
    $group: {
      _id: "$resourceInfo.departmentId",
      totalActions: { $sum: 1 },
      uniqueUsers: { $addToSet: "$userId" },
      bookmarks: {
        $sum: { $cond: [{ $eq: ["$actionType", "BOOKMARK_ADD"] }, 1, 0] }
      },
      views: {
        $sum: { $cond: [{ $eq: ["$actionType", "DEPARTMENT_VIEW"] }, 1, 0] }
      }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { totalActions: -1 }
  }
])

Result:
[
  {
    _id: "biotech",
    totalActions: 456,
    uniqueUserCount: 89,
    bookmarks: 156,
    views: 234
  },
  {
    _id: "chem-eng",
    totalActions: 234,
    uniqueUserCount: 45,
    bookmarks: 89,
    views: 123
  },
  ...
]


7. Get Department Trend (Last 7 Days vs Previous Period)
─────────────────────────────────────────────────────────

// Last 7 days
db.user_action_logs.aggregate([
  {
    $match: {
      "resourceInfo.departmentId": { $exists: true },
      timestamp: {
        $gte: new Date(Date.now() - 7*24*60*60*1000)
      }
    }
  },
  {
    $group: {
      _id: "$resourceInfo.departmentId",
      actionCount: { $sum: 1 }
    }
  },
  {
    $sort: { actionCount: -1 }
  }
])

// Previous 7 days (days 8-14)
db.user_action_logs.aggregate([
  {
    $match: {
      "resourceInfo.departmentId": { $exists: true },
      timestamp: {
        $gte: new Date(Date.now() - 14*24*60*60*1000),
        $lt: new Date(Date.now() - 7*24*60*60*1000)
      }
    }
  },
  {
    $group: {
      _id: "$resourceInfo.departmentId",
      actionCount: { $sum: 1 }
    }
  },
  {
    $sort: { actionCount: -1 }
  }
])

Then calculate % change in application


=== SEARCH ANALYTICS ===

8. Get Most Common Search Queries
──────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      actionType: "SKILL_SEARCH",
      "metadata.searchQuery": { $exists: true }
    }
  },
  {
    $group: {
      _id: "$metadata.searchQuery",
      searchCount: { $sum: 1 },
      avgResults: { $avg: "$metadata.searchResults" },
      uniqueUsers: { $addToSet: "$userId" }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { searchCount: -1 }
  },
  {
    $limit: 20
  }
])

Result:
[
  {
    _id: "Python",
    searchCount: 145,
    avgResults: 32.5,
    uniqueUserCount: 89
  },
  {
    _id: "Machine Learning",
    searchCount: 98,
    avgResults: 28.3,
    uniqueUserCount: 67
  },
  ...
]


9. Get Search Queries with No Results
──────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      actionType: "SKILL_SEARCH",
      "metadata.searchResults": 0
    }
  },
  {
    $group: {
      _id: "$metadata.searchQuery",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { count: -1 }
  }
])

Result: Queries that need improvement/skills to add


=== LOGIN ANALYTICS ===

10. Get Login Frequency Distribution
─────────────────────────────────────

db.users.aggregate([
  {
    $addFields: {
      loginFrequency: "$activityStats.totalLoginCount"
    }
  },
  {
    $bucket: {
      groupBy: "$loginFrequency",
      boundaries: [0, 10, 20, 50, 100, 200, 500],
      default: "500+",
      output: {
        count: { $sum: 1 },
        users: { $push: "$email" }
      }
    }
  }
])

Result: How many users have different login frequencies


11. Get User Cohorts by Signup Date
────────────────────────────────────

db.users.aggregate([
  {
    $addFields: {
      signupMonth: {
        $dateToString: {
          format: "%Y-%m",
          date: "$createdAt"
        }
      }
    }
  },
  {
    $group: {
      _id: "$signupMonth",
      newUsers: { $sum: 1 },
      activeUsers: {
        $sum: {
          $cond: [
            {
              $gte: [
                "$activityStats.lastActivityAt",
                new Date(Date.now() - 30*24*60*60*1000)
              ]
            },
            1,
            0
          ]
        }
      },
      totalBookmarks: { $sum: "$activityStats.totalBookmarks" },
      avgLogins: { $avg: "$activityStats.totalLoginCount" }
    }
  },
  {
    $sort: { _id: -1 }
  }
])

Result: Retention and engagement by cohort


=== TIME-BASED ANALYTICS ===

12. Get Hourly Activity Pattern
───────────────────────────────

db.user_action_logs.aggregate([
  {
    $addFields: {
      hour: {
        $hour: "$timestamp"
      }
    }
  },
  {
    $group: {
      _id: "$hour",
      actionCount: { $sum: 1 },
      uniqueUsers: { $addToSet: "$userId" }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

Result: Shows peak usage hours


13. Get Daily Activity Trend (Last 30 Days)
────────────────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      timestamp: {
        $gte: new Date(Date.now() - 30*24*60*60*1000)
      }
    }
  },
  {
    $addFields: {
      date: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$timestamp"
        }
      }
    }
  },
  {
    $group: {
      _id: "$date",
      actionCount: { $sum: 1 },
      uniqueUsers: { $addToSet: "$userId" },
      loginCount: {
        $sum: { $cond: [{ $eq: ["$actionType", "LOGIN"] }, 1, 0] }
      }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

Result: Daily trends for 30 days


=== RETENTION ANALYSIS ===

14. Calculate User Retention Rate
──────────────────────────────────

// Step 1: Get all users created in a specific month
const signupThreshold = new Date("2026-03-01");
const nextMonth = new Date("2026-04-01");
const thirtyDaysLater = new Date(nextMonth.getTime() + 30*24*60*60*1000);

db.users.aggregate([
  {
    $match: {
      createdAt: { $gte: signupThreshold, $lt: nextMonth }
    }
  },
  {
    $addFields: {
      isActive30Days: {
        $cond: [
          { $gte: ["$activityStats.lastActivityAt", thirtyDaysLater] },
          1,
          0
        ]
      }
    }
  },
  {
    $group: {
      _id: null,
      totalUsers: { $sum: 1 },
      retainedUsers: { $sum: "$isActive30Days" }
    }
  },
  {
    $addFields: {
      retentionRate: {
        $multiply: [
          { $divide: ["$retainedUsers", "$totalUsers"] },
          100
        ]
      }
    }
  }
])

Result:
{
  totalUsers: 450,
  retainedUsers: 315,
  retentionRate: 70
}


=== DEVICE/BROWSER ANALYTICS ===

15. Get Most Used Devices/Browsers
───────────────────────────────────

db.user_action_logs.aggregate([
  {
    $match: {
      "metadata.userAgent": { $exists: true }
    }
  },
  {
    $group: {
      _id: "$metadata.userAgent",
      actionCount: { $sum: 1 },
      uniqueUsers: { $addToSet: "$userId" }
    }
  },
  {
    $addFields: {
      uniqueUserCount: { $size: "$uniqueUsers" }
    }
  },
  {
    $sort: { actionCount: -1 }
  },
  {
    $limit: 10
  }
])

Result: Most common user agents/browsers


=== QUICK EXPORT QUERIES ===

16. Export User Data for Email Campaign
────────────────────────────────────────

db.users.find(
  {
    "activityStats.lastActivityAt": {
      $lt: new Date(Date.now() - 7*24*60*60*1000)
    },
    "notificationPreferences.emailNotifications": true
  },
  {
    email: 1,
    name: 1,
    "activityStats.lastActivityAt": 1,
    _id: 1
  }
)


17. Export Bookmarked Items for User
─────────────────────────────────────

db.userpreferences.findOne(
  { userId: ObjectId("USER_ID_HERE") }
)
// Returns all bookmarks organized by type


18. Get User's Complete Profile with Stats
────────────────────────────────────────────

db.users.aggregate([
  {
    $match: { _id: ObjectId("USER_ID_HERE") }
  },
  {
    $lookup: {
      from: "userpreferences",
      localField: "_id",
      foreignField: "userId",
      as: "preferences"
    }
  },
  {
    $unwind: { path: "$preferences", preserveNullAndEmptyArrays: true }
  }
])

Result: Complete user profile with preferences and stats


```
