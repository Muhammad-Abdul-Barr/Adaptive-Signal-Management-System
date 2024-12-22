const User = require('../models/User'); // Import the User model

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Find user by email

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If user doesn't exist
    }
    if (user.password === password) { // Check if the password matches (Note: you should use hashing in production)
      return res.status(200).json({ success: true, role: user.role });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
