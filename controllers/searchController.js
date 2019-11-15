const User = require('../models/UserModel')

exports.searchUsers = (req, res, next) => {
    let str = req.body.searchUser
    let name = [];
    name = str.trim().split(" ");


    let filterResult = []
    let searchingUser = {}
    if (name[0]) {
        searchingUser.name = name[0]
    }
    if (name[1]) {
        searchingUser.surname = name[1]
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