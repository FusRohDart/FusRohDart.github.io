import { secret } from 'dbConfig.json';
import { sign } from 'jsonwebtoken';
import { compare, hash as _hash } from 'bcrypt';
import { User } from '_helpers/MySQLDB';

export default {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
};

async function authenticate({ username, password }) {
    const user = await User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await compare(password, user.passHash)))
        throw 'Username or password is incorrect';

    // If authentication is successful
    const token = sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // Check if the user already exists
    if (await User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Auto-generate salt and hash
    if (params.password) {
        params.passHash = await _hash(params.password, 12);
    }

    // Save new user
    await User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // Check if the username already exists
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Auto-generate salt and hash for new password if necessary
    if (params.password) {
        params.passHash = await _hash(params.password, 12);
    }

    // Assign new values to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// Helper callback functions

async function getUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}