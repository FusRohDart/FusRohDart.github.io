const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const questionService = require('./questions.services');

// '/questions' routes
router.post('/createNew', authorize(), newQuestionSchema, newQuestion);
router.get('/', authorize(), allQuestions);
router.put('updateVotes', authorize(), updateVoteSchema(), updateVoteCount())

module.exports = router;

function newQuestionSchema(req, res, next) {
    const schema = Joi.object({
        qTitle: Joi.string().required(),
        qBody: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function newQuestion(req, res, next) {
    questionService.createQuestion(req.body)
        .then(() => res.json({ message: 'Question created successfully!' }))
        .catch(next);
}

function allQuestions(req, res, next) {
    questionService.allQuestions()
        .then((questions) => res.json(questions))
        .catch(next);
}

function updateVoteSchema(req, res, next) {
    const schema = Joi.object({
        qUpCount: Joi.number().min(0).integer().required()
    });
    validateRequest(req, next, schema);
}