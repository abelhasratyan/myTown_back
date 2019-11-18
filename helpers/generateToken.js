const jwt = require('jsonwebtoken')

exports.generateToken = (userId, userEmail) => {
    return new Promise((resolve, reject) => {
        if (!(userId && userEmail)) {
            reject('need user email and id')
        }
        resolve(jwt.sign({
                id: userId,
                email: userEmail
            }, 'SuperSecRetKey',
            {
                expiresIn: '24h'
            })
        );
    })
};