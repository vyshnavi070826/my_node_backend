const UserPreference = require("../models/UserPreference");
const User = require("../models/User");
const { logUserAction } = require("../utils/actionLogger");

// Initialize user preferences when they first login
exports.initializePreferences = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    const existingPref = await UserPreference.findOne({ userId });
    if (existingPref) {
      return res.json({ message: "Preferences already initialized", preferences: existingPref });
    }

    const newPref = new UserPreference({
      userId
    });

    await newPref.save();
    res.status(201).json({ message: "Preferences initialized", preferences: newPref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track explored department
exports.trackDepartment = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { department } = req.body;

    if (!department) {
      return res.status(400).json({ message: "Department required" });
    }

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    if (!pref.exploredDepartments.includes(department)) {
      pref.exploredDepartments.push(department);
      await pref.save();

      // Log department view action
      await logUserAction(userId, 'DEPARTMENT_VIEW', {
        resourceType: 'department',
        resourceId: department,
        resourceName: department,
        userAgent: req.headers['user-agent'] || null,
        ipAddress: req.ip || req.connection.remoteAddress || null
      });
    }

    res.json({ message: "Department tracked", preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to bookmark
exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { type, elementId, title, department, metadata } = req.body;

    if (!['program', 'job', 'exam', 'startup'].includes(type)) {
      return res.status(400).json({ message: "Invalid bookmark type" });
    }

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    const bookmarkField = `bookmarked${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    const item = { title, type, elementId, department, metadata };

    // Check if item already bookmarked
    if (!pref[bookmarkField].some(item => item.elementId === elementId)) {
      pref[bookmarkField].push(item);
      await pref.save();

      // Log bookmark action
      await logUserAction(userId, 'BOOKMARK_ADD', {
        resourceType: type,
        resourceId: elementId,
        resourceName: title,
        departmentId: department,
        metadata: {
          bookmarkField,
          ...metadata
        },
        userAgent: req.headers['user-agent'] || null,
        ipAddress: req.ip || req.connection.remoteAddress || null
      });
    }

    res.json({ message: `${type} bookmarked`, preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { type, elementId, title, department } = req.body;

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    const bookmarkField = `bookmarked${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    pref[bookmarkField] = pref[bookmarkField].filter(item => item.elementId !== elementId);
    await pref.save();

    // Log bookmark removal action
    await logUserAction(userId, 'BOOKMARK_REMOVE', {
      resourceType: type,
      resourceId: elementId,
      resourceName: title,
      departmentId: department,
      metadata: {
        bookmarkField
      },
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || req.connection.remoteAddress || null
    });

    res.json({ message: `${type} removed from bookmarks`, preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create personal collection
exports.createCollection = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Collection name required" });
    }

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    pref.personalCollections.push({
      name,
      description: description || '',
      items: []
    });

    await pref.save();

    // Log collection creation
    await logUserAction(userId, 'COLLECTION_CREATE', {
      resourceType: 'collection',
      resourceId: name,
      resourceName: name,
      metadata: {
        description
      },
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || req.connection.remoteAddress || null
    });

    res.status(201).json({ message: "Collection created", preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to personal collection
exports.addToCollection = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { collectionName, type, elementId, title, department, metadata } = req.body;

    if (!collectionName) {
      return res.status(400).json({ message: "Collection name required" });
    }

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    const collection = pref.personalCollections.find(c => c.name === collectionName);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const item = { title, type, elementId, department, metadata };
    if (!collection.items.some(item => item.elementId === elementId)) {
      collection.items.push(item);
      await pref.save();
    }

    res.json({ message: "Item added to collection", preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from personal collection
exports.removeFromCollection = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { collectionName, elementId } = req.body;

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    const collection = pref.personalCollections.find(c => c.name === collectionName);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    collection.items = collection.items.filter(item => item.elementId !== elementId);
    await pref.save();

    res.json({ message: "Item removed from collection", preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all user preferences
exports.getPreferences = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    res.json(pref);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete personal collection
exports.deleteCollection = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { collectionName } = req.body;

    const pref = await UserPreference.findOne({ userId });
    if (!pref) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    pref.personalCollections = pref.personalCollections.filter(c => c.name !== collectionName);
    await pref.save();

    // Log collection deletion
    await logUserAction(userId, 'COLLECTION_DELETE', {
      resourceType: 'collection',
      resourceId: collectionName,
      resourceName: collectionName,
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || req.connection.remoteAddress || null
    });

    res.json({ message: "Collection deleted", preferences: pref });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
