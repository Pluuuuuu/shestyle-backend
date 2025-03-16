const express = require('express');
const { sequelize } = require('./config/db'); // Importing Sequelize connection
require('dotenv').config(); // Load environment variables

// Importing Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

// API Test Route
app.get('/', (req, res) => res.send('API is working!'));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Start Server After DB Connection
const PORT = process.env.PORT || 5000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
