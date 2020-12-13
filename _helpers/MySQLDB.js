const mysql = require('mysql');

initializeDB();

//Login to MySQL server
async function initializeDB() {
    const connectMySQL = mysql.createConnection({
        host: process.env.MYSQL_DB_HOST || 'localhost',
        user: process.env.MYSQL_DB_USER || 'root',
        password: process.env.MYSQL_DB_PASS || 'Dovahkiin@0405'
    });
    
    connectMySQL.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB_NAME};`);
    connectMySQL.query("CREATE TABLE IF NOT EXISTS questions");
    connectMySQL.query("CREATE TABLE IF NOT EXISTS answers");
    connectMySQL.query("CREATE TABLE IF NOT EXISTS comments");
}
