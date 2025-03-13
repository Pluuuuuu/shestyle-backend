const { sequelize } = require('./db');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Use { alter: true } to avoid data loss
    console.log('Database synchronized successfully!');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
}

syncDatabase();
