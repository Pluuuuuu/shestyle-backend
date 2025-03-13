const express = require('express');
const { sequelize, User, Product } = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API is working!'));

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

const PORT = process.env.PORT || 5000;
sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database connection error:', err));
