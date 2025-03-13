require('dotenv').config(); // Load environment variables from .env
const mysql = require('mysql2/promise');

async function initDatabase() {
    try {
        console.log("DB Config:", process.env.DB_USER, process.env.DB_PASSWORD ? "Has Password" : "No Password"); // Debug

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',  // Ensure it reads the password
            database: process.env.DB_NAME || 'shestyle_db',
            port: process.env.DB_PORT || 3306
        });

        console.log("Connected to MySQL!");

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log("Database created or already exists.");
        
        await connection.end();
    } catch (error) {
        console.error("Error during database initialization:", error);
    }
}

initDatabase();
