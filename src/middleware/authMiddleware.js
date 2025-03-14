const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Sequelize models are in the models folder
require('dotenv').config();

// User Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../models/db'); // Adjust the path if needed

// // Signup controller
// exports.signup = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user already exists
//         const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//         // if (existingUser.length > 0) {
//         if (existingUser[0].length > 0) { //This ensures the correct length check is done on the result set

//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert new user
//         const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

//         const user = result[0];

//         // Create JWT token
//         const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // Login controller
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//         if (user.length === 0) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Check password
//         const validPassword = await bcrypt.compare(password, user[0].password);

//         if (!validPassword) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Create JWT token
//         const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token, user: { id: user[0].id, name: user[0].name, email: user[0].email } });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };