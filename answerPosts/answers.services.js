const db = require('_helpers/MySQLDB');

module.exports = {
    allAnswers,
    getAnswerByID
};

async function allAnswers() {
    return await db.Answer.findAll({
        include: ['queryID', 'answererID']
    });
}

async function getAnswerByID(id) {
    return await getAnswer(id);
}

async function getAnswer(id) {
    const answer = await db.Answer.findOne({
        where: { id: id }, 
        include: ['queryID', 'answererID']
    });
    if (!answer) throw 'No such answer exists!';
    return answer;
}
