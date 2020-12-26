const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../questions/node_modules/_middleware/validate-request');
const answerService = require('./answers.services');

// '/answers' routes
router.post('/createnew', newAnswerSchema, makeNewAnswer);
router.get('/', allAnswers);
router.get('/:id', answerByID);
router.put('/:id', updateVoteSchema, updateVoteCount);

module.exports = router;

/*
----------------------------------------------------------------------------------------------------
*/

function newAnswerSchema(req, res, next) {
    const schema = Joi.object({
        aBody: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function makeNewAnswer(req, res, next) {
    answerService.createAnswer(req.body, req.query)
        .then(() => res.json({ message: 'Answer created successfully!' }))
        .catch(next);
}

function allAnswers(req, res, next) {
    answerService.allComments()
        .then(answer => res.json(answer))
        .catch(next);
}

function answerByID(req, res, next) {
    answerService.getCommentByID(req.params.id)
        .then(answer => res.json(answer))
        .catch(next);
}

function updateVoteSchema(req, res, next) {
    const schema = Joi.object({
        aUpCount: Joi.number().min(0).integer().empty(),
        aDownCount: Joi.number().min(0).integer().empty()
    });
    validateRequest(req, next, schema);
}

function updateVoteCount(req, res, next) {
    answerService.updateVotes(req.params.id, req.body)
        .then(answer => res.json(answer))
        .catch(next);
}

/*
----------------------------------------------------------------------------------------------------
*/