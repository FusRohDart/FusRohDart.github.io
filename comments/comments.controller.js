const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const commentService = require('./comments.services');

// '/comments' routes
router.post('/createnew', newCommentSchema, makeNewComment);
router.get('/', allComments);
router.get('/:id', commentByID);
router.put('/:id', updateVoteSchema, updateVoteCount);

module.exports = router;

/*
----------------------------------------------------------------------------------------------------
*/

function newCommentSchema(req, res, next) {
    const schema = Joi.object({
        cBody: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function makeNewComment(req, res, next) {
    commentService.createComment(req.body, req.query)
        .then(() => res.json({ message: 'Comment created successfully!' }))
        .catch(next);
}

function allComments(req, res, next) {
    commentService.allComments()
        .then(comment => res.json(comment))
        .catch(next);
}

function commentByID(req, res, next) {
    commentService.getCommentByID(req.params.id)
        .then(comment => res.json(comment))
        .catch(next);
}

function updateVoteSchema(req, res, next) {
    const schema = Joi.object({
        cUpCount: Joi.number().min(0).integer().empty(),
        cDownCount: Joi.number().min(0).integer().empty()
    });
    validateRequest(req, next, schema);
}

function updateVoteCount(req, res, next) {
    commentService.updateVotes(req.params.id, req.body)
        .then(comment => res.json(comment))
        .catch(next);
}

/*
----------------------------------------------------------------------------------------------------
*/