const db = require('_helpers/MySQLDB');

module.exports = {
    allAnswers,
    getAnswerByID,
    createAnswer,
    updateVotes
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

function createAnswer(params, queryID) {
    let id = parseInt(parentID, 10);
    switch (type) {
        case 'answer':
            await db.Comment.create({ params, answerID: id });
            break;
        case 'question':
            await db.Comment.create({ params, cqID: id });
            break;
        default:
            throw 'Invalid type of post!';
    }
}

function updateVotes(id, params) {
    let netCount = params.aUpCount - params.aDownCount;
    await db.Answer.update({ params, aNetVoteCount: netCount }, { where: { id: id }});
    const answer = await getAnswer(id);
    return answer.get();
}
