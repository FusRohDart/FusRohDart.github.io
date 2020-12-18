const db = require('_helpers/MySQLDB');

module.exports = {
    allQuestions,
    getQuestion,
    createQuestion
};

async function allQuestions() {
    return await db.Question.findAll({ include: 'asker'});
}

async function getQuestion(id) {
    const question = await db.Question.findByPk(id);
    if (!question) throw 'No such question found!';
    return question;
}

async function createQuestion(params) {
    await db.Question.create(params);
}