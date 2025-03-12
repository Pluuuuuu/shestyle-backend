const mysql = require('mysql2/promise');

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',        // Change if using a remote DB
  user: 'root',             // Your MySQL username
  password: 'yourpassword', // Your MySQL password
  database: 'shestyle_db',  // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
//pool allows multiple connections at once, which improves performance for an e-commerce site.