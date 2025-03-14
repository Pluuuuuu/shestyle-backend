const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'customer'),  allowNull: false,  defaultValue: 'customer' },
},
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
);

// Instance method to compare passwords
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = User;
