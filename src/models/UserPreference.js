const mongoose = require("mongoose");

const collectionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['program', 'job', 'exam', 'startup'],
    required: true
  },
  elementId: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  exploredDepartments: {
    type: [String],
    default: []
  },
  bookmarkedPrograms: {
    type: [collectionItemSchema],
    default: []
  },
  bookmarkedJobs: {
    type: [collectionItemSchema],
    default: []
  },
  bookmarkedStartups: {
    type: [collectionItemSchema],
    default: []
  },
  bookmarkedExams: {
    type: [collectionItemSchema],
    default: []
  },
  personalCollections: {
    type: [
      {
        name: String,
        description: String,
        items: [collectionItemSchema],
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
userPreferenceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserPreference", userPreferenceSchema);
