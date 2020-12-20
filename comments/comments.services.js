const db = require('_helpers/MySQLDB');

module.exports = {
    allComments,
    getCommentByID,
    createComment,
    updateVotes
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
    const comment = await db.Comment.findOne({
        where: { id: id }, 
        include: ['cqID', 'answerID']
    });
    if (!comment) throw 'No such answer exists!';
    return comment;
}

function createComment(params, type, parentID) {
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
    let netCount = params.cUpCount - params.cDownCount;
    await db.Comment.update({ params, cNetVoteCount: netCount }, { where: { id: id }});
    const comment = await getComment(id);
    return comment.get();
}