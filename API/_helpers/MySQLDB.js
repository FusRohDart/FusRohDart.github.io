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
    db.Comment = require('../dbModels/comment.model')(sequelize);

    db.User.hasMany(db.Question, { as: 'asker', foreignKey: 'askerID', allowNull: true });
    db.Question.belongsTo(db.User, { as: 'asker', foreignKey: 'askerID', allowNull: true });

    db.User.hasMany(db.Answer, { as: 'answerer', foreignKey: 'answererID', allowNull: true });
    db.Answer.belongsTo(db.User, { as: 'answerer', foreignKey: 'answererID', allowNull: true });

    db.User.hasMany(db.Comment, { as: 'commenter', foreignKey: 'commenterID', allowNull: true });
    db.Comment.belongsTo(db.User, { as: 'commenter', foreignKey: 'commenterID', allowNull: true });

    db.Question.hasMany(db.Answer, { as: 'query', foreignKey: 'queryID', allowNull: true });
    db.Answer.belongsTo(db.Question, { as: 'query', foreignKey: 'queryID', allowNull: true });

    db.Question.hasMany(db.Comment, { as: 'commentQuery', foreignKey: 'cqID', allowNull: true });
    db.Comment.belongsTo(db.Question, { as: 'commentQuery', foreignKey: 'cqID', allowNull: true });

    db.Answer.hasMany(db.Comment, { as: 'answer', foreignKey: 'answerID', allowNull: true });
    db.Comment.belongsTo(db.Answer, { as: 'answer', foreignKey: 'answerID', allowNull: true });

    await sequelize.sync({ alter: true });
    
}

initializeDB();