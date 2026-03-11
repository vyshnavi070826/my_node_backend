# NextStep Database Structure - Updated Architecture

## Overview
The MongoDB database has been reorganized with proper action logging, enhanced user profiles, and structured analytics capabilities. All user interactions are now tracked and categorized in an organized, queryable format.

---

## Database Collections

### 1. **users** Collection
Enhanced user model with complete profile and activity tracking.

**Schema:**
```javascript
{
  _id: ObjectId,
  
  // Basic Profile
  name: String,
  email: String (unique, indexed),
  password: String,
  
  // Profile Details
  profile: {
    phone: String,
    location: String,
    bio: String,
    avatar: String,
    currentDepartment: String,
    yearOfStudy: Number
  },
  
  // Account Status
  accountStatus: String, // 'active', 'inactive', 'suspended', 'deleted'
  
  // Activity Statistics (Auto-updated)
  activityStats: {
    totalLoginCount: Number,
    lastLoginAt: Date,
    lastLogoutAt: Date,
    totalBookmarks: Number,
    totalSearches: Number,
    accountCreatedAt: Date,
    lastActivityAt: Date
  },
  
  // Notification Preferences
  notificationPreferences: {
    emailNotifications: Boolean,
    jobAlerts: Boolean,
    programUpdates: Boolean,
    weeklyDigest: Boolean
  },
  
  // Timestamps
  createdAt: Date (indexed),
  updatedAt: Date
}
```

**Indexes:**
- `email` - For quick user lookup
- `activityStats.lastActivityAt` - For finding active users

---

### 2. **user_action_logs** Collection (NEW)
Comprehensive action tracking for all user interactions.

**Schema:**
```javascript
{
  _id: ObjectId,
  
  // User Reference
  userId: ObjectId (indexed),
  
  // Action Type (indexed for filtering)
  actionType: String, // Enum: LOGIN, LOGOUT, SIGNUP, BOOKMARK_ADD, 
                      // BOOKMARK_REMOVE, SKILL_SEARCH, DEPARTMENT_VIEW, 
                      // JOB_VIEW, PROGRAM_VIEW, EXAM_VIEW, STARTUP_VIEW,
                      // COLLECTION_CREATE, COLLECTION_UPDATE, COLLECTION_DELETE
  
  // Resource Information
  resourceInfo: {
    resourceType: String, // 'job', 'program', 'exam', 'startup', 'department', 'collection', 'skill'
    resourceId: String,
    resourceName: String,
    departmentId: String,
    departmentName: String
  },
  
  // Detailed Metadata
  metadata: {
    searchQuery: String,        // For search actions
    searchResults: Number,      // Count of results
    sessionDuration: Number,    // In seconds
    userAgent: String,
    ipAddress: String,
    details: Mixed              // Custom metadata
  },
  
  // Status Tracking
  status: String, // 'SUCCESS', 'FAILED', 'PENDING'
  error: {
    message: String,
    code: String
  },
  
  // Session Tracking
  sessionId: String,
  
  // Timestamps
  timestamp: Date (indexed),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId, timestamp` - For user action history
- `userId, actionType, timestamp` - For filtered user history
- `timestamp` - For time-based queries

---

### 3. **userpreferences** Collection
Existing collection - now works seamlessly with action logging.

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique),
  exploredDepartments: [String],
  bookmarkedPrograms: [{ title, type, elementId, department, addedAt, metadata }],
  bookmarkedJobs: [{ title, type, elementId, department, addedAt, metadata }],
  bookmarkedStartups: [{ title, type, elementId, department, addedAt, metadata }],
  bookmarkedExams: [{ title, type, elementId, department, addedAt, metadata }],
  personalCollections: [{
    name: String,
    description: String,
    items: [...],
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

---

### 4. **departments** Collection
Department information (existing).

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  programs: [String],
  jobs: [String],
  timestamps: true
}
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
**Action Logged:** `SIGNUP`
- Creates user account
- Initializes user preferences
- Logs signup action with metadata

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
**Action Logged:** `LOGIN`
- Authenticates user
- Updates lastLoginAt
- Increments totalLoginCount

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Preferences Routes (`/api/preferences`)

#### POST `/api/preferences/bookmark`
**Action Logged:** `BOOKMARK_ADD`
- Adds item to bookmarks
- Updates user activityStats.totalBookmarks

**Request:**
```json
{
  "type": "job",
  "elementId": "software-engineer",
  "title": "Software Engineer",
  "department": "biotech",
  "metadata": { "salary": "$100k", "company": "TechCorp" }
}
```

**Action Log Entry:**
```javascript
{
  userId: "...",
  actionType: "BOOKMARK_ADD",
  resourceInfo: {
    resourceType: "job",
    resourceId: "software-engineer",
    resourceName: "Software Engineer",
    departmentId: "biotech"
  },
  metadata: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1"
  },
  timestamp: "2026-03-11T12:30:00Z"
}
```

#### POST `/api/preferences/remove-bookmark`
**Action Logged:** `BOOKMARK_REMOVE`
- Removes item from bookmarks
- Records removal action with item details

**Request:**
```json
{
  "type": "job",
  "elementId": "software-engineer",
  "title": "Software Engineer",
  "department": "biotech"
}
```

#### POST `/api/preferences/track-department`
**Action Logged:** `DEPARTMENT_VIEW`
- Tracks department exploration
- Records which departments user visits

**Request:**
```json
{
  "department": "biotech"
}
```

#### POST `/api/preferences/collection/create`
**Action Logged:** `COLLECTION_CREATE`
- Creates personal collection
- Logs collection name and description

**Request:**
```json
{
  "name": "My Top Jobs",
  "description": "Jobs I'm interested in"
}
```

---

### Analytics Routes (`/api/analytics`) - NEW

#### GET `/api/analytics/user/action-history`
**Get user's complete action history**

**Query Parameters:**
- `limit` (default: 50) - Number of records
- `skip` (default: 0) - Pagination
- `actionType` (optional) - Filter by action type (LOGIN, BOOKMARK_ADD, etc.)
- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string

**Response:**
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "_id": "...",
      "userId": "...",
      "actionType": "BOOKMARK_ADD",
      "resourceInfo": {
        "resourceType": "job",
        "resourceName": "Software Engineer"
      },
      "timestamp": "2026-03-11T12:30:00Z"
    }
  ]
}
```

**Example Requests:**
```bash
# Get recent actions
GET /api/analytics/user/action-history?limit=20

# Get bookmarks only from last 7 days
GET /api/analytics/user/action-history?actionType=BOOKMARK_ADD&startDate=2026-03-04&endDate=2026-03-11

# Get login history with pagination
GET /api/analytics/user/action-history?actionType=LOGIN&limit=10&skip=10
```

---

#### GET `/api/analytics/user/action-summary`
**Get summary of user actions by type**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "BOOKMARK_ADD",
      "count": 15,
      "lastOccurrence": "2026-03-11T12:30:00Z"
    },
    {
      "_id": "LOGIN",
      "count": 42,
      "lastOccurrence": "2026-03-11T14:00:00Z"
    },
    {
      "_id": "DEPARTMENT_VIEW",
      "count": 8,
      "lastOccurrence": "2026-03-10T10:00:00Z"
    }
  ]
}
```

**Use Cases:**
- See what actions user has taken most
- Identify engagement patterns
- Track which features are used

---

#### GET `/api/analytics/user/activity-stats`
**Get user's activity statistics and profile**

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "accountStatus": "active",
    "activityStats": {
      "totalLoginCount": 42,
      "lastLoginAt": "2026-03-11T14:00:00Z",
      "lastLogoutAt": "2026-03-11T13:45:00Z",
      "totalBookmarks": 15,
      "totalSearches": 8,
      "accountCreatedAt": "2026-01-15T10:00:00Z",
      "lastActivityAt": "2026-03-11T14:00:00Z"
    },
    "profile": {
      "currentDepartment": "biotech",
      "yearOfStudy": 3
    }
  }
}
```

---

#### GET `/api/analytics/department/:departmentId`
**Get analytics for a specific department**

**Response:**
```json
{
  "success": true,
  "departmentId": "biotech",
  "data": [
    {
      "actionType": "DEPARTMENT_VIEW",
      "count": 156,
      "uniqueUsersCount": 45
    },
    {
      "actionType": "JOB_VIEW",
      "count": 89,
      "uniqueUsersCount": 32
    },
    {
      "actionType": "BOOKMARK_ADD",
      "count": 42,
      "uniqueUsersCount": 18
    }
  ]
}
```

**Use Cases:**
- See department popularity
- Track engagement metrics
- Identify trending content

---

## Action Types Reference

| Action Type | When Logged | Data Captured |
|------------|------------|---------------|
| `LOGIN` | User logs in | Email, name, device info |
| `LOGOUT` | User logs out | Session duration |
| `SIGNUP` | New account created | Email, name, registration source |
| `BOOKMARK_ADD` | Item bookmarked | Item details, type, department |
| `BOOKMARK_REMOVE` | Bookmark deleted | Item details for audit trail |
| `SKILL_SEARCH` | User searches by skill | Search query, results count |
| `DEPARTMENT_VIEW` | Department page visited | Department ID and name |
| `JOB_VIEW` | Job details viewed | Job ID, title, department |
| `PROGRAM_VIEW` | Program details viewed | Program ID, title, department |
| `EXAM_VIEW` | Exam details viewed | Exam ID, department |
| `STARTUP_VIEW` | Startup details viewed | Startup ID, department |
| `COLLECTION_CREATE` | Personal collection created | Collection name, description |
| `COLLECTION_UPDATE` | Collection modified | Changes made |
| `COLLECTION_DELETE` | Collection removed | Collection name (audit trail) |

---

## Utility Functions

### Using Action Logger in Code

**File:** `src/utils/actionLogger.js`

#### `logUserAction(userId, actionType, options)`
```javascript
const { logUserAction } = require('../utils/actionLogger');

// Example: Log a custom action
await logUserAction(userId, 'JOB_VIEW', {
  resourceType: 'job',
  resourceId: 'job-123',
  resourceName: 'Software Engineer',
  departmentId: 'biotech',
  metadata: { salary: '$100k' },
  userAgent: req.headers['user-agent'],
  ipAddress: req.ip
});
```

#### `getUserActionHistory(userId, options)`
```javascript
const history = await getUserActionHistory(userId, {
  limit: 100,
  skip: 0,
  actionType: 'BOOKMARK_ADD',
  startDate: '2026-03-01',
  endDate: '2026-03-11'
});
```

#### `getDepartmentAnalytics(departmentId)`
```javascript
const analytics = await getDepartmentAnalytics('biotech');
// Returns: [{ actionType, count, uniqueUsersCount }, ...]
```

---

## Query Examples

### Find all bookmarks added by a user in the last 7 days
```javascript
UserActionLog.find({
  userId: ObjectId("..."),
  actionType: 'BOOKMARK_ADD',
  timestamp: { $gte: new Date(Date.now() - 7*24*60*60*1000) }
})
.sort({ timestamp: -1 })
.limit(50);
```

### Get most active users
```javascript
await User.find({})
  .sort({ 'activityStats.lastActivityAt': -1 })
  .limit(10);
```

### Get popular departments by view count
```javascript
UserActionLog.aggregate([
  { $match: { actionType: 'DEPARTMENT_VIEW' } },
  { $group: {
    _id: '$resourceInfo.departmentId',
    totalViews: { $sum: 1 },
    uniqueUsers: { $addToSet: '$userId' }
  }},
  { $project: {
    _id: 1,
    totalViews: 1,
    uniqueUsers: { $size: '$uniqueUsers' }
  }},
  { $sort: { totalViews: -1 } }
]);
```

### Get user engagement score
```javascript
User.findById(userId);
// activityStats shows: logins, bookmarks, searches - can calculate engagement
const engagementScore = (stats.totalLoginCount * 10 + 
                         stats.totalBookmarks * 5 + 
                         stats.totalSearches * 3) / daysActive;
```

---

## Migration Notes

✅ **What's Changed:**
- User model now includes profile, activityStats, notificationPreferences
- New user_action_logs collection for all action tracking
- Action logging automatically integrated into auth and preference controllers
- New analytics API endpoints available

✅ **Backward Compatible:**
- Existing bookmarks still work
- UserPreference collection unchanged
- Old user data will work with new schema

⚠️ **To Migrate Existing Users:**
```bash
# Add missing activity stats to existing users
db.users.updateMany({}, {
  $set: {
    "activityStats.accountCreatedAt": "$createdAt",
    "activityStats.totalLoginCount": 0,
    "activityStats.totalBookmarks": { $size: "$bookmarks" }
  }
})
```

---

## Frontend Integration

All tracking happens automatically on the backend. Frontend just needs to send requests normally:

```javascript
// Frontend doesn't need to do anything special
// Just send requests as before:

// Login
await fetch('/api/auth/login', { ... });
// Action automatically logged: { actionType: 'LOGIN', ... }

// Add bookmark
await fetch('/api/preferences/bookmark', { ... });
// Action automatically logged: { actionType: 'BOOKMARK_ADD', ... }

// Get user stats
await fetch('/api/analytics/user/activity-stats', { ... });
// Returns user's complete activity statistics
```

---

## Dashboard Ideas

With this data structure, you can create:

1. **User Dashboard**
   - Login frequency
   - Total bookmarks
   - Departments explored
   - Recent activities

2. **Admin Analytics**
   - Most popular departments
   - User engagement trends
   - Feature usage statistics
   - Peak usage times

3. **Personalization**
   - Recommend departments based on exploration
   - Suggest jobs based on bookmarks
   - Send notifications based on preferences

4. **User Insights**
   - Time spent on platform
   - Job search patterns
   - Department interests
   - Skill matching engagement

---

## Summary

This updated database structure provides:
- ✅ Organized action tracking
- ✅ Comprehensive user analytics
- ✅ Audit trail for all user actions
- ✅ Easy querying and filtering
- ✅ Performance optimization with proper indexes
- ✅ Backward compatibility
- ✅ Foundation for personalization and ML

