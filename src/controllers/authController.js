const User = require("../models/User");
const UserPreference = require("../models/UserPreference");
const { logUserAction } = require("../utils/actionLogger");

exports.signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      profile: {
        currentDepartment: 'all'
      },
      activityStats: {
        accountCreatedAt: new Date()
      }
    });

    await newUser.save();

    // Initialize user preferences
    const userPref = new UserPreference({
      userId: newUser._id
    });
    await userPref.save();

    // Log signup action
    await logUserAction(newUser._id, 'SIGNUP', {
      resourceType: 'user',
      resourceId: newUser._id,
      metadata: {
        email: newUser.email,
        name: newUser.name
      },
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || req.connection.remoteAddress || null
    });

    res.status(201).json({
      message: "Signup successful",
      userId: newUser._id,
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // Ensure user preferences exist
    let userPref = await UserPreference.findOne({ userId: user._id });
    if (!userPref) {
      userPref = new UserPreference({ userId: user._id });
      await userPref.save();
    }

    // Log login action
    await logUserAction(user._id, 'LOGIN', {
      resourceType: 'user',
      resourceId: user._id,
      metadata: {
        email: user.email,
        name: user.name
      },
      userAgent: req.headers['user-agent'] || null,
      ipAddress: req.ip || req.connection.remoteAddress || null
    });

    res.json({
      message: "Login successful",
      userId: user._id,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};