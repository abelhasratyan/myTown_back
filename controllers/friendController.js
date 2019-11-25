const Users = require('../models/UserModel')
const Friend = require('../models/frinedsModel')
const Valid = require('../helpers/validation')
const jwt = require('jsonwebtoken');

const haveOnFrinedList = async (currentUserId, friendUserId, next) => {
    await Friend.findOne({user: currentUserId}, {
        friends: friendUserId    
    }).then(result => {
        if (result.friends.length === 0) {
            return false
        } else {
            result.friends.forEach(element => {
                if (element === friendUserId) {
                    return true
                }
            });
        }
    }).catch(err => {
        next(err)
    })
}

const AddToFriend = async (userId, friendId, next) => {
    await Friend.findOneAndUpdate({ user: userId }, {
        $push: {friends: friendId}
    }, {
        new: true
    }).then(data => {
        if (data) {
            return true;
        } else{
            let error = new Error()
            error.msg = "couldn't add friend"
            next(error)
        }
    }).catch(err => {
        next(err)
    })
};

const DeleteFormFriends = async (currentUserId, deleteFriendId, next) => {
    await Friend.findOneAndUpdate({user: currentUserId }, {
        $pull: { friends:  deleteFriendId  }
    }).then(result => {
        if (result) {
            return true
        } else {
            let error = new Error();
            error.msg = "couldn't add friend";
            next(error)
        }
    }).catch(err => {
        next(err)
    })
    
}

exports.addFriend = (req, res ,next) => {
    let currentUser = req.body.currentUser;
    let askToFriend = req.body.askToFriend;
    let counter = 0;

    if (currentUser === askToFriend) {
        let error = new Error('cannot add to friend');
        next(error)
    } else if (!haveOnFrinedList(currentUser, askToFriend, next)) {
        return res.json({
            success: false
        })
    } else if (AddToFriend(currentUser, askToFriend, next)) {
        counter += 1;
    } 

    if (AddToFriend(askToFriend, currentUser, next)) {
        counter += 1;
    }
    if (counter === 2) {
        counter = 0;
        res.json({
            success: true
        })
    } else {
        let error = new Error('cannot add to friend');
        next(error)
    }
};

exports.getFriends = (req, res, next) => {
    Friend.findOne({user: req.user.id}).populate('friends')
    .then(result => {
        if (result) {
            res.json({
                success: true,
                friends: result
            })
        }
    }).catch(err => {
        next(err)
    })
}

exports.deleteFriend = (req, res, next) => {
    let currentUser = req.body.currentUserId;
    let deleteFriend = req.body.deleteFriendId;
    let counter = 0;

    if (currentUser === deleteFriend) {
        let error = new Error('cannot delete');
        next(error)
    } else if (DeleteFormFriends(currentUser, deleteFriend, next)) {
        counter++;
    }

    if (DeleteFormFriends( deleteFriend, currentUser, next)) {
        counter++;
    }
    if (counter === 2 ) {
        counter = 0;
        res.json({
            success: true
        })
    } else {
        let error = new Error('cannot add to friend')
        next(error)
    }
};

