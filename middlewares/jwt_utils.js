const jwt = require('jsonwebtoken');

function generateJWT(payload, secret) {
    return jwt.sign(payload, secret, {
        expiresIn: "1d",
        algorithm: 'HS256'
    });
}

module.exports = { generateJWT };