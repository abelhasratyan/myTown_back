const Users = require('../models/UserModel')
const Friend = require('../models/frinedsModel')
const Valid = require('../helpers/validation')
const jwt = require('jsonwebtoken');

const FriendsList = async (userId, friendId, next) => {
    await Friend.findOneAndUpdate({user: userId}, {
        $push: {friend: {user: friendId}}
    }, {new: true}).then(data => {
        console.log('data', data)
        if (data) {
            return true;
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
    // console.log('body', req.user)
    // console.log('id', req.params.id)
    let counter = 0;
    if (FriendsList(req.user._id, req.params.id, next)) {
        counter += 1;
    }
    if (FriendsList(req.params.id, req.user._id, next)) {
        counter += 1;
    }
    if (counter === 2) {
        counter = 0;
        res.json({
            success: true
        })
    } else {
        let error = new Error('cannot add to friend')
        next(error)
    }
}

exports.getFriends = (req, res, next) => {
    Friend.findOne({user: req.user.id}).populate('friend.user')
    .then(friends => {
        if (friends) {
            console.log('friends => ', friends)
            res.json({
                success: true,
                friends: friends.friend
            })
        }
    })
    .catch(err => {
        next(err)
    })
}