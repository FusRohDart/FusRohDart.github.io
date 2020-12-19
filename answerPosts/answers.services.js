const db = require('_helpers/MySQLDB');

module.exports = {
    allAnswers,
    getAnswerByID
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

async function getAnswerByID(id) {
    return await getAnswer(id);
}

async function getAnswer(id) {
    const answer = await db.Answer.findOne({
        where: { aID: id }, 
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
    if (!answer) throw 'No such answer exists!';
    return answer;
}
