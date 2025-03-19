const express = require("express");
const { Product } = require("../models/index");
const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get a single product
router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
});

// Update a product
router.put("/:id", async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Product updated" });
});

// Delete a product
router.delete("/:id", async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: "Product deleted" });
});

module.exports = router;
