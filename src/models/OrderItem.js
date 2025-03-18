const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = OrderItem;
