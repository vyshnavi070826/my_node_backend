const mongoose = require("mongoose");

const userActionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Action categorization
  actionType: {
    type: String,
    enum: [
      'LOGIN',
      'LOGOUT',
      'SIGNUP',
      'BOOKMARK_ADD',
      'BOOKMARK_REMOVE',
      'SKILL_SEARCH',
      'DEPARTMENT_VIEW',
      'JOB_VIEW',
      'PROGRAM_VIEW',
      'EXAM_VIEW',
      'STARTUP_VIEW',
      'COLLECTION_CREATE',
      'COLLECTION_UPDATE',
      'COLLECTION_DELETE'
    ],
    required: true,
    index: true
  },
  
  // Resource being interacted with
  resourceInfo: {
    resourceType: {
      type: String,
      enum: ['job', 'program', 'exam', 'startup', 'department', 'collection', 'skill', 'user'],
      required: true
    },
    resourceId: String,
    resourceName: String,
    departmentId: String,
    departmentName: String
  },
  
  // Detailed action metadata
  metadata: {
    // For bookmarks
    bookmarkType: String,
    
    // For searches
    searchQuery: String,
    searchResults: Number,
    
    // For page views
    sessionDuration: Number, // in seconds
    
    // Device/browser info
    userAgent: String,
    ipAddress: String,
    
    // Custom metadata
    details: mongoose.Schema.Types.Mixed
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED', 'PENDING'],
    default: 'SUCCESS'
  },
  
  error: {
    message: String,
    code: String
  },
  
  // Timestamps
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  // Session tracking
  sessionId: {
    type: String,
    index: true
  }
}, { 
  timestamps: true,
  collection: 'user_action_logs'
});

// Index for efficient querying
userActionLogSchema.index({ userId: 1, timestamp: -1 });
userActionLogSchema.index({ userId: 1, actionType: 1, timestamp: -1 });
userActionLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model("UserActionLog", userActionLogSchema);
