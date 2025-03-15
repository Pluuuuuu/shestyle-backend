const { Product } = require('../models');

// Get all products (For customers)
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add a product (Admin only)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = await Product.create({ name, description, price, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Edit a product (Admin only)
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
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
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getProducts, addProduct, editProduct, deleteProduct };
