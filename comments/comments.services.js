const db = require('_helpers/MySQLDB');

module.exports = {
    allComments,
    getCommentByID
};

async function allComments() {
    return await db.Comment.findAll({
        include: ['cqID', 'answerID']
    });
}

async function getCommentByID(id) {
    return await getComment(id);
}

async function getComment(id) {
    const answer = await db.Comment.findOne({
        where: { id: id }, 
        include: ['cqID', 'answerID']
    });
    if (!answer) throw 'No such answer exists!';
    return answer;
}
