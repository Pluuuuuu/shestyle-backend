const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../config/db'); 

// Signup endpoint  | Registration
//Ensured bcrypt.hash is used before saving passwords.
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("Hashed Password:", hashedPassword); // Log this to confirm it's hashed
        // Create new user
        const newUser = await User.create({ name, email, password, role });
        // Send response with the token
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Signup endpoint | Registration
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Received login request with email:", email);
        
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials, User not found" });
        }

        console.log("Incoming Password (Plain):", password.trim());

        console.log("Stored Password Hash:", user.password);

        // ✅ Ensure bcrypt compares correctly
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials, Wrong Password" });
        }

        res.json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
