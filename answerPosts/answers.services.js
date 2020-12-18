const db = require('_helpers/MySQLDB');

module.exports = {};

async function allAnswers() {
    return await db.Answer.findAll({ include: 'answerer' });
}