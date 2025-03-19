const express = require("express");
const { Order } = require("../models/index");
const router = express.Router();

// Create an order
router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

// Delete an order
router.delete("/:id", async (req, res) => {
  await Order.destroy({ where: { id: req.params.id } });
  res.json({ message: "Order deleted" });
});

router.get("/total-sales", getTotalSales);


module.exports = router;
