const sequelize = require("../config/database");
const Product = require("./Product");
const Order = require("./Order");
const Customer = require("./Customer");

// Sync all models with the database
const syncDB = async () => {
  await sequelize.sync({ force: true });
  console.log("Database & tables created!");
};

module.exports = { syncDB, Product, Order, Customer };
