const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } }
});

module.exports = Cart;

//Cart.belongsTo(User);
//Cart.belongsTo(Product);

