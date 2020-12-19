const db = require('_helpers/MySQLDB');

module.exports = {
    allQuestions,
    getQuestionByID,
    createQuestion,
    updateVoteUp
};

async function allQuestions() {
    return await db.Question.findAll({ include: 'asker'});
}

async function getQuestion(id) {
    const question = await db.Question.findByPk(id);
    if (!question) throw 'No such question found!';
    return question;
}

async function getQuestionByID(id) {
    return await getQuestion(id);
}

async function createQuestion(params) {
    await db.Question.create(params);
}

async function updateVoteUp(id, params) {
    const question = await getQuestion(id);

    // Copy and save new vote count for the question
    Object.assign(question, params);
    await question.save();
    
    return question.get();
}