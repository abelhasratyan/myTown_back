const User = require('../models/UserModel')

exports.searchUsers = (req, res, next) => {
    let filterResult = []
    // let query = {}
    let searchingUser = {}
    if (req.body.name) {
        searchingUser.name = req.body.name
    }
    if (req.body.username) {
        searchingUser.surname = req.body.surname
    }
    // {
    //     $and: [{"name": searchingUser.name}, {"surname": searchingUser.surname}]
    // }
    User.find(searchingUser).then(users => {
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