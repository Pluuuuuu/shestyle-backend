// const { Category, Product } = require('../models');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Add a new category
exports.addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name });
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Error adding category' });
    }
};

// Delete an existing category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id, {
            include: Product // Ensure the category is not associated with any products
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (category.Products.length > 0) {
            return res.status(400).json({ error: 'Category has associated products, cannot delete' });
        }

        await category.destroy();
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting category' });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.name = name;
        await category.save();
        return res.json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating category' });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: Product // Get associated products in category listing
        });
        return res.json(categories);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching categories' });
    }
};

// Get a single category by ID with its products
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id, {
            include: Product // Including products in the category view
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching category' });
    }
};
