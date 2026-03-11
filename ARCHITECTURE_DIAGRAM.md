```
DATABASE ARCHITECTURE - NextStep
===============================

┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (User Actions)                      │
│  Login → Bookmark → Search → View Department → Remove Bookmark      │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND API ROUTES                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  /api/auth/login                                                     │
│    └─→ authController.login()                                       │
│        └─→ Verify credentials                                       │
│        └─→ [LOGS ACTION: LOGIN]                                    │
│        └─→ Updates User.activityStats                               │
│                                                                       │
│  /api/preferences/bookmark                                           │
│    └─→ preferenceController.addBookmark()                           │
│        └─→ Save to userPreferences                                  │
│        └─→ [LOGS ACTION: BOOKMARK_ADD]                             │
│        └─→ Updates User.activityStats.totalBookmarks                │
│                                                                       │
│  /api/preferences/remove-bookmark                                    │
│    └─→ preferenceController.removeBookmark()                        │
│        └─→ Remove from userPreferences                              │
│        └─→ [LOGS ACTION: BOOKMARK_REMOVE]                          │
│                                                                       │
│  /api/analytics/user/action-history                                 │
│    └─→ analyticsController.getUserActionHistory()                  │
│        └─→ Query user_action_logs collection                       │
│        └─→ Return filtered results                                  │
│                                                                       │
│  /api/analytics/user/activity-stats                                 │
│    └─→ analyticsController.getUserActivityStats()                  │
│        └─→ Return User.activityStats                                │
│                                                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         UTILITY FUNCTIONS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  logUserAction(userId, actionType, options)                         │
│    ├─→ Creates UserActionLog entry                                 │
│    ├─→ Calls updateUserActivityStats()                             │
│    └─→ Returns created log entry                                   │
│                                                                       │
│  updateUserActivityStats(userId, actionType)                        │
│    └─→ Updates User document with action stats                     │
│        ├─→ totalLoginCount++                                        │
│        ├─→ totalBookmarks++                                         │
│        ├─→ lastActivityAt = NOW                                     │
│        └─→ Saves to database                                        │
│                                                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MONGODB COLLECTIONS                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ users                                                       │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ {                                                           │   │
│  │   _id: ObjectId                                            │   │
│  │   name: String                                             │   │
│  │   email: String (indexed)                                  │   │
│  │   password: String                                         │   │
│  │   profile: {                                               │   │
│  │     phone, location, bio, avatar,                          │   │
│  │     currentDepartment, yearOfStudy                         │   │
│  │   }                                                        │   │
│  │   accountStatus: 'active'                                  │   │
│  │   activityStats: {  ◄─── AUTO-UPDATED                     │   │
│  │     totalLoginCount,                                       │   │
│  │     lastLoginAt,                                           │   │
│  │     totalBookmarks,                                        │   │
│  │     totalSearches,                                         │   │
│  │     lastActivityAt                                         │   │
│  │   }                                                        │   │
│  │   createdAt, updatedAt                                     │   │
│  │ }                                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ user_action_logs   (NEW - Complete Action History)         │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ {                                                           │   │
│  │   _id: ObjectId                                            │   │
│  │   userId: ObjectId (indexed)                               │   │
│  │   actionType: String (enum: LOGIN, BOOKMARK_ADD, etc)     │   │
│  │   resourceInfo: {                                          │   │
│  │     resourceType,                                          │   │
│  │     resourceId,                                            │   │
│  │     resourceName,                                          │   │
│  │     departmentId,                                          │   │
│  │     departmentName                                         │   │
│  │   }                                                        │   │
│  │   metadata: {                                              │   │
│  │     searchQuery,                                           │   │
│  │     userAgent,                                             │   │
│  │     ipAddress,                                             │   │
│  │     ...custom fields                                       │   │
│  │   }                                                        │   │
│  │   status: 'SUCCESS' | 'FAILED'                             │   │
│  │   error: { message, code }                                │   │
│  │   timestamp: Date (indexed)                                │   │
│  │   createdAt, updatedAt                                     │   │
│  │ }                                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ userpreferences                                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ {                                                           │   │
│  │   userId: ObjectId (ref: users)                            │   │
│  │   bookmarkedJobs: [{...}]                                  │   │
│  │   bookmarkedPrograms: [{...}]                              │   │
│  │   bookmarkedExams: [{...}]                                 │   │
│  │   bookmarkedStartups: [{...}]                              │   │
│  │   personalCollections: [{...}]                             │   │
│  │   exploredDepartments: [String]                            │   │
│  │ }                                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ departments                                                 │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ {                                                           │   │
│  │   _id: ObjectId                                            │   │
│  │   name: String                                             │   │
│  │   description: String                                      │   │
│  │   programs: [String]                                       │   │
│  │   jobs: [String]                                           │   │
│  │   timestamps: true                                         │   │
│  │ }                                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLES
==================

Example 1: User Login with Action Logging
──────────────────────────────────────────

User clicks "Login" with email + password
         │
         ▼
POST /api/auth/login
         │
         ▼
authController.login()
    │
    ├─→ Find user by email
    ├─→ Verify password
    │
    └─→ logUserAction(userId, 'LOGIN', {...})
        │
        ├─→ Create entry in user_action_logs:
        │   {
        │     userId: "...",
        │     actionType: "LOGIN",
        │     resourceInfo: { resourceType: "user" },
        │     metadata: { email, name, userAgent, ipAddress },
        │     timestamp: NOW
        │   }
        │
        └─→ updateUserActivityStats(userId, 'LOGIN')
            └─→ Update users collection:
                {
                  $inc: { "activityStats.totalLoginCount": 1 },
                  $set: { "activityStats.lastLoginAt": NOW }
                }

Result: 
  ✓ User logged in
  ✓ Login action recorded
  ✓ User stats updated


Example 2: User Adds Bookmark with Action Logging
──────────────────────────────────────────────────

User clicks "Bookmark" on a job
         │
         ▼
POST /api/preferences/bookmark { type: 'job', elementId: 'job-123', ... }
         │
         ▼
preferenceController.addBookmark()
    │
    ├─→ Add item to userpreferences.bookmarkedJobs
    │
    └─→ logUserAction(userId, 'BOOKMARK_ADD', {...})
        │
        ├─→ Create entry in user_action_logs:
        │   {
        │     userId: "...",
        │     actionType: "BOOKMARK_ADD",
        │     resourceInfo: {
        │       resourceType: "job",
        │       resourceId: "job-123",
        │       resourceName: "Software Engineer",
        │       departmentId: "biotech"
        │     },
        │     metadata: { userAgent, ipAddress },
        │     timestamp: NOW
        │   }
        │
        └─→ updateUserActivityStats(userId, 'BOOKMARK_ADD')
            └─→ Update users collection:
                {
                  $inc: { "activityStats.totalBookmarks": 1 },
                  $set: { "activityStats.lastActivityAt": NOW }
                }

Result:
  ✓ Job bookmarked
  ✓ Bookmark recorded
  ✓ User stats incremented


Example 3: Querying User Action History
───────────────────────────────────────

User requests: GET /api/analytics/user/action-history?actionType=BOOKMARK_ADD&limit=10
         │
         ▼
analyticsController.getUserActionHistory()
    │
    ├─→ Query construction:
    │   {
    │     userId: "...",
    │     actionType: "BOOKMARK_ADD"
    │   }
    │
    ├─→ Sort by timestamp DESC
    ├─→ Limit 10 results
    │
    └─→ Return results:
        [
          {
            actionType: "BOOKMARK_ADD",
            resourceInfo: { resourceType: "job", resourceName: "Senior Dev" },
            timestamp: "2026-03-11T12:30:00Z"
          },
          {
            actionType: "BOOKMARK_ADD",
            resourceInfo: { resourceType: "program", resourceName: "ML Course" },
            timestamp: "2026-03-11T11:15:00Z"
          },
          ...
        ]

Result:
  ✓ Complete bookmark history retrieved
  ✓ Organized by timestamp
  ✓ Filtered and limited as requested


INDEX STRATEGY
==============

Optimized indexes on user_action_logs:

1. userId, timestamp
   Purpose: Fast lookup of all actions by a user
   Usage: getUserActionHistory()

2. userId, actionType, timestamp
   Purpose: Find specific action type for a user quickly
   Usage: Get "all bookmarks added" by user

3. timestamp
   Purpose: Time-based queries across all users
   Usage: "All actions in last 24 hours"

Indexes on users:

1. email
   Purpose: Quick user lookup by email (unique)

2. activityStats.lastActivityAt
   Purpose: Find most active users
   Usage: User engagement rankings


QUERY PERFORMANCE
=================

With proper indexing:

- Get user's 50 recent actions: < 50ms
- Get bookmarks added in date range: < 100ms
- Get action summary (aggregation): < 200ms
- Get department analytics: < 500ms


SCALABILITY
===========

Design supports:
- Millions of users
- Billions of actions
- Real-time analytics queries
- Historical trend analysis

```
