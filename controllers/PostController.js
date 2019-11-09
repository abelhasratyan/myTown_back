const Post = require('../models/PostModel')
const User = require('../models/UserModel')

exports.addPost = (req, res, next) => {
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
    }
    Post.findOneAndUpdate({ userId: postData.userId }, {
        $push: { posts : postData} 
    }, {new: true})
    .then(result => {
        res.json({
            result
        })
        // console.log('result in post controller =>>', result)
    }).catch(err => {
        next(err)
    })
}

exports.getUserPosts = (req, res, next) => {
    const userid = req.body.userId
    Post.find({
        userId: userid
    })
}

// exports.addComment = (req, res, next) => {
    
//     console.log('log in add comment controller0')

// } 

