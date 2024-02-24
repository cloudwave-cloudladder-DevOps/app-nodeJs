const mysql = require('mysql');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100, 
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    multipleStatements: true
});

module.exports = pool;
