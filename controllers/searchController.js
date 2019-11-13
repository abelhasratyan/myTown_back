const User = require('../models/UserModel')

exports.searchUsers = (req, res, next) => {
    let filterResult = [];
    let searchingUser = {
        name: req.body.name,
        surname: req.body.surname
    }
    
    User.find({
        $and: [{"name": searchingUser.name}, {"surname": searchingUser.surname}]
    }).then(users => {
        users.forEach(user => {
            filterResult.push({
                avatar: user.avatar,
                name: user.name,
                surname: user.surname,
                id: user._id
            })
        })
        res.json({
            success: true,
            result: filterResult 
        })
    }).catch(err => {
        next(err)
    })
}   