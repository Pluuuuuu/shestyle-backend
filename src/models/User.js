const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');

const hashPassword = (password, callback) => {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      callback(err, null);
    } else {
      callback(null, hash);
    }
  });
};

const User = sequelize.define('User', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true
      }
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  role: {
    type: DataTypes.ENUM('customer', 'admin'),
    defaultValue: 'customer' 
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      return new Promise((resolve, reject) => {
        hashPassword(user.password, (err, hashedPassword) => {
          if (err) return reject(err);
          user.password = hashedPassword;
          resolve();
        });
      });
    },

    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        return new Promise((resolve, reject) => {
          hashPassword(user.password, (err, hashedPassword) => {
            if (err) return reject(err);
            user.password = hashedPassword;
            resolve();
          });
        });
      }
    }
  }
});

module.exports = User;
// const User = sequelize.define('User', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   name: { type: DataTypes.STRING(100), allowNull: false },
//   email: { type: DataTypes.STRING(255), unique: true, allowNull: false },
//   password: { type: DataTypes.STRING(255), allowNull: false },
//   role: { type: DataTypes.ENUM('admin', 'customer'), defaultValue: 'customer' }
// });


// ✅ Purpose: Ensures passwords are always hashed before saving (for both new users and updates).
// ✅ Security: Prevents storing plain-text passwords.