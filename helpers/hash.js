const bcrypt = require('bcryptjs')

exports.HashingPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
};


exports.ComparyPassword = (password, UserPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, UserPassword, (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
};