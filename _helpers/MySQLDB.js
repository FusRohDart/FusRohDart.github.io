const config = require('dbConfig.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

// Login to MySQL server
async function initializeDB() {
    // Initialize and create if database does not exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    
    db.User = require('../dbModels/user.model')(sequelize);
    db.questions = require('../dbModels/question.model')(sequelize);
    db.answers = require('../dbModels/answer.model')(sequelize);

    await sequelize.sync();
}

initializeDB();