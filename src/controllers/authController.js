exports.signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if password length is valid
    if(password.length < 6){
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const User = require("../models/User");

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful"
    });

  } catch(err){
    res.status(500).json({ message: err.message });
  }
};