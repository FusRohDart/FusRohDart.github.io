const mysql = require('mysql'); 
const catchErrors = require('../_middleware/error-handler');

initializeDB();

//Login to MySQL server
async function initializeDB() {
    const connectMySQL = await mysql.createConnection({
        host     : process.env.MYSQL_DB_HOST || 'localhost',
        user     : process.env.MYSQL_DB_USER || 'root',
        password : process.env.MYSQL_DB_PASS || 'Dovahkiin@0405'
    });
    
    await connectMySQL.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB_NAME};`);
    await connectMySQL.query("CREATE TABLE IF NOT EXISTS questions");
}
