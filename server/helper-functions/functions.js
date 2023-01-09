const crypto = require('node:crypto')

function hashPassword(password) {
    let salt = crypto.randomBytes(128).toString('base64');
    let iterations = 100000;
    let hash = '';

    hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha256').toString('hex');

    return [
        salt,
        hash,
        iterations
    ];
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    const savedIterations = 100000
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha256').toString('hex');
}

module.exports = {hashPassword, isPasswordCorrect}