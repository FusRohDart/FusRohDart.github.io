import { Router } from 'express';
import { object, string } from 'joi';
import validateRequest from '../_middleware/validate-request';
import authorize from '../_middleware/authorize';
import { authenticate as _authenticate, create, getAll as _getAll, getById as _getById, update as _update, _delete } from './user.services';
const router = Router();

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), deleteUser);

export default router;

function authenticateSchema(req, res, next) {
    const schema = object({
        username: string().required(),
        password: string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    _authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = object({
        userName: string().required(),
        email: string().required(),
        password: string().min(10).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    _getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    _getById(req.params.userID)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = object({
        userName: string().empty(''),
        email: string().empty(''),
        password: string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    _update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function deleteUser(req, res, next) {
    _delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}