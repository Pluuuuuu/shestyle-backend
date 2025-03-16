const { Product, Category } = require('../models');

// Get all products with their categories (For customers)
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
      category_id: categoryId, // Ensure category is included
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Edit a product (Admin only)
const editProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update(req.body);  // Sequelize's built-in .update method
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

// Get products by category (For customers)
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { category_id: categoryId },
      include: [{ model: Category, as: 'category' }] // Ensuring category info is included
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products by category', error });
  }
};

module.exports = { getProducts, addProduct, editProduct, deleteProduct, getProductsByCategory };



// const { Product } = require('../models');

// // Get all products (For customers)
// const getProducts = async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Add a product (Admin only)
// const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock } = req.body;
//         const product = await Product.create({ name, description, price, stock });
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Edit a product (Admin only)
// const editProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByPk(id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });

//         await product.update(req.body);
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Delete a product (Admin only)
// const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByPk(id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });

//         await product.destroy();
//         res.json({ message: 'Product deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = { getProducts, addProduct, editProduct, deleteProduct };
