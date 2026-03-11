const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic profile information
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  // Profile details
  profile: {
    phone: String,
    location: String,
    bio: String,
    avatar: String,
    currentDepartment: String,
    yearOfStudy: Number
  },

  // Account status
  accountStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active'
  },

  // Activity tracking
  activityStats: {
    totalLoginCount: {
      type: Number,
      default: 0
    },
    lastLoginAt: Date,
    lastLogoutAt: Date,
    totalBookmarks: {
      type: Number,
      default: 0
    },
    totalSearches: {
      type: Number,
      default: 0
    },
    accountCreatedAt: {
      type: Date,
      default: Date.now
    },
    lastActivityAt: Date
  },

  // Notification preferences
  notificationPreferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    jobAlerts: {
      type: Boolean,
      default: true
    },
    programUpdates: {
      type: Boolean,
      default: true
    },
    weeklyDigest: {
      type: Boolean,
      default: false
    }
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Index for efficient queries
userSchema.index({ email: 1 });
userSchema.index({ 'activityStats.lastActivityAt': -1 });

module.exports = mongoose.model("User", userSchema);