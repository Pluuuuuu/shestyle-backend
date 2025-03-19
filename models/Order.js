const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");

const Order = sequelize.define("Order", {
  customerName: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
});

Order.belongsTo(Product); // Order is linked to a Product

module.exports = Order;
