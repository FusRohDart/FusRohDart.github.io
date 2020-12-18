const db = require('_helpers/MySQLDB');

module.exports = {
    allAnswers,
    getAnswer
};

async function allAnswers() {
    return await db.Answer.findAll({
        include: [
            {
                model: db.User,
                as: 'answerer'
            },
            {
                model: db.Question,
                as: 'query'
            }
        ]
    });
}

async function getAnswer(id) {
    const answer = await db.Answer.findByPk(id);
    if (!answer) throw 'No such answer exists!';
    return answer;
}
