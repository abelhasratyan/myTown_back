const Users = require('../models/UserModel')
const Friend = require('../models/frinedsModel')
const Valid = require('../helpers/validation')
const jwt = require('jsonwebtoken');

const FriendsList = (userId, friendId, next) => {
    Friend.findOneAndUpdate({user: userId}, {
        $push: {friend: {user: friendId}}
    }, {new: true}).then(data => {
        console.log('data', data)
        if (data) {
            return 1;
        } else{
            let error = new Error()
            error.msg = "couldn't add friend"
            next(error)
        }
    })
    .catch(err => {
        next(err)
    })
}

exports.addFriend = (req, res ,next) => {
    console.log('body', req.user)
    console.log('id', req.params.id)
    let counter = 0;
    if (FriendsList(req.user._id, req.params.id, next) === 1) {
        counter++;
    }
    if (FriendsList(req.params.id, req.user._id, next) === 1) {
        counter++;
    }
    if (counter === 2) {
        res.json({
            success: true
        })
    } else {
        let error = new Error('cannot add to friend')
        next(error)
    }
}