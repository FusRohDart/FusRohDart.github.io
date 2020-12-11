const mysql = require('mysql'); 

initializeDB();

//Login to MySQL server
async function initializeDB() {
    const connectMySQL = await mysql.createConnection({
        host     : process.env.MYSQL_DB_HOST || 'localhost',
        user     : process.env.MYSQL_DB_USER || 'root',
        password : process.env.MYSQL_DB_PASS || 'Dovahkiin@0405'
    });

    let query = "SHOW DATABASES LIKE 'main'";
    await connectMySQL.query(query, (error, result) => {

    });
}
