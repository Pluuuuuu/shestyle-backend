const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create an order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        await order.destroy();
        res.json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.sum("totalPrice");
        res.json({ totalSales });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
