// initdb.js
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Change this if you're using a remote server
  user: 'root', // Use your MySQL user
  password: '', // Use your MySQL password
  multipleStatements: true, // Allow multiple SQL queries at once
});

// Read the schema.sql file
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Connect to MySQL and execute the schema
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Execute the schema to set up the database
  db.query(`CREATE DATABASE IF NOT EXISTS shestyle; USE shestyle; ${schema}`, (err, results) => {
    if (err) {
      console.error('Error setting up database:', err);
    } else {
      console.log('Database and tables created successfully');
    }
    db.end();
  });
});
