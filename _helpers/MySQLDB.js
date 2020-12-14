import { database as _database } from 'dbConfig.json';
import { createConnection } from 'mysql2/promise';
import { Sequelize } from 'sequelize';

export default db = {};

initializeDB();

//Login to MySQL server
async function initializeDB() {
    // Initialize and create if database does not exist
    const {database, host, port, user, password} = _database;
    const connectMySQL = await createConnection({ host, port, user, password });
    await connectMySQL.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.questions = require('../Q-posts/Q-posts.model')(sequelize);
    db.answers = require('../A-posts/A-posts.model')(sequelize);
    db.User = require('../users/user.model')(sequelize);

    await sequelize.sync();
}
