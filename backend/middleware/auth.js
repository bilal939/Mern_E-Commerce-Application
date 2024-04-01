const expressjwt = require('express-jwt');

function auth(params) {
    const secret = process.env.JWT_KEY
    return expressjwt.expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, method: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/product(.*)/, method: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/category(.*)/, method: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            '/api/v1/user/login',
            '/api/v1/user/register',
            '/'
            ]
    })
}

async function isRevoked(req, payload) {
    console.log(payload);
    if (!payload.payload.isAdmin) {
        console.log('Not Admin');
        return true;
    }
    console.log('Admin');
    return false;
}

module.exports = auth;