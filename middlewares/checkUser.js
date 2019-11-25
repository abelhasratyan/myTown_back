const User = require('../models/UserModel');

exports.CheckUser= (req, res, next) => {
    const userId = req.user._id;
    User.findOne({ _id: userId
    }).then(user => {
        if ((user === null) || (user === undefined)) {
            res.json({
                success: false,
                msg: "user doesn't exist"
            })
        } else {
            next()
        }
    }).catch(err => {
        next(err)
    })
};