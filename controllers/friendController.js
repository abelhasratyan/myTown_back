const Users = require('../models/UserModel')
const Friend = require('../models/frinedsModel')
const Valid = require('../helpers/validation')
const jwt = require('jsonwebtoken');

const FriendsList = async (userId, friendId, next) => {
    await Friend.findOneAndUpdate({user: userId}, {
        $push: {friends: friendId}
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
    let currentUser = req.body.currentUser
    let askToFriend = req.body.askToFriend
    let counter = 0
    
    // console.log('currentUser =>', currentUser)
    // console.log('askToFriend =>', askToFriend)

    if (FriendsList(currentUser, askToFriend, next)) {
        counter += 1;
    }
    if (FriendsList(askToFriend, currentUser, next)) {
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
    Friend.findOne({user: req.user.id}).populate('friends')
    .then(result => {
        if (result) {
            console.log('friends => ', result)
            res.json({
                success: true,
                friends: result
            })
        }
    })
    .catch(err => {
        next(err)
    })
}