const config = require('dbConfig.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initializeDB();

// Login to MySQL server
async function initializeDB() {
    // Initialize and create if database does not exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.questions = require('../Q-posts/Q-posts.model')(sequelize);
    db.answers = require('../A-posts/A-posts.model')(sequelize);
    db.User = require('../users/user.model')(sequelize);

    await sequelize.sync();
}
