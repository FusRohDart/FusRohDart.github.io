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

async function createAnswer(params, queryStrings) {
    let queryID = parseInt(queryStrings.queryID, 10);
    let answererID = parseInt(queryStrings.userID, 10);
    await db.Answer.create({ params, queryID: queryID, answererID: answererID});
}

async function updateVotes(id, params) {
    let netCount = params.aUpCount - params.aDownCount;
    await db.Answer.update({ params, aNetVoteCount: netCount }, { where: { id: id }});
    const answer = await getAnswer(id);
    return answer.get();
}