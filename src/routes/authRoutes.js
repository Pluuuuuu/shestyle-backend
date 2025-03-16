const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');
const User = require('../models/User');
//  Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Received data:", { name, email, password });

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

            // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
        }
         // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        const newUser = await User.create({name, email, password: hashedPassword });

        console.log("User created:", newUser);

        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).json({ message: "Server error/signup", error: error.message });
    }
});

// Login Route
router.get('/login', authController.login);

module.exports = router;
