const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch users" });
  }
});

// Add User
router.post("/add", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "❌ User already exists" });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    
    res.json({ message: "✅ User Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to add user" });
  }
});

// Delete User
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ User Deleted" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to delete user" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "❌ User not found" });
    }

    if (password !== user.password) { // No bcrypt since passwords are stored in plaintext
      return res.status(400).json({ error: "❌ Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role, email: user.email }, 
      "secret", 
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
