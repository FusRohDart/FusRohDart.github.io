
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const questionService = require('./questions.services');

// '/questions' routes
router.post('/createNew', newQuestionSchema, newQuestion);
router.get('/', allQuestions);
router.get('/:id', questionByID);
router.put('/:id', updateVoteSchema, updateVoteCount);

module.exports = router;

/*
----------------------------------------------------------------------------------------------------
*/

function newQuestionSchema(req, res, next) {
    const schema = Joi.object({
        qTitle: Joi.string().required(),
        qBody: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function newQuestion(req, res, next) {
    questionService.createQuestion(req.body, req.query.id)
        .then(() => res.json({ message: 'Question created successfully!' }))
        .catch(next);
}

function allQuestions(req, res, next) {
    questionService.allQuestions()
        .then(question => res.json(question))
        .catch(next);
}

function questionByID(req, res, next) {
    questionService.getQuestionByID(req.params.id)
        .then(question => res.json(question))
        .catch(next);
}

function updateVoteSchema(req, res, next) {
    const schema = Joi.object({
        qUpCount: Joi.number().min(0).integer().empty()
    });
    validateRequest(req, next, schema);
}

function updateVoteCount(req, res, next) {
    questionService.updateVoteUp(req.params.id, req.body)
        .then(question => res.json(question))
        .catch(next);
}

/*
----------------------------------------------------------------------------------------------------
*/