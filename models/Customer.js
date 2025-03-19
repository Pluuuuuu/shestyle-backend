const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Order = require("./Order");

const Customer = sequelize.define("Customer", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

Customer.hasMany(Order); // A customer can have multiple orders

module.exports = Customer;
