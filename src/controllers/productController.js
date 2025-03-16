// const { Product, Category } = require('../models');
const db = require('../config/db'); // Import db.js to ensure associations are loaded
const Product = require('../models/Product');
const Category = require('../models/Category');

// Get all products (For customers)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }] // Removed alias
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single product by ID (For customers)
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category }] // Removed alias
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get products by category (For customers)
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_id: categoryId },
      include: [{ model: Category }] // Removed alias
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products by category', error });
  }
};

// Add a product (Admin only)
const addProduct = async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category_id: categoryId
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Edit a product (Admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { 
  getAllProducts, 
  getProductById, 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct 
};
