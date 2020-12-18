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
    db.Question = require('../dbModels/question.model')(sequelize);
    db.Answer = require('../dbModels/answer.model')(sequelize);

    db.User.hasMany(db.Question, { as: 'asker', foreignKey: 'askerID' });
    db.Question.belongsTo(db.User, { as: 'query', foreignKey: 'queryID' });

    db.User.hasMany(db.Answer, { as: 'answerer', foreignKey: 'answererID' });
    db.Answer.belongsTo(db.User, { as: 'solution', foreignKey: 'solutionID' });

    await sequelize.sync({ alter: true });
    
}

initializeDB();