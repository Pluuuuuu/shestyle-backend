const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'yourpassword',
      database: 'your_database'
    });

    console.log('Connected to MySQL!');

    // Read and execute the schema SQL file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await connection.query(schema);  // Execute the schema SQL

    console.log('Database initialized successfully!');
    
    await connection.end();
  } catch (err) {
    console.error('Error during database initialization:', err.stack);
  }
}

initDatabase();
