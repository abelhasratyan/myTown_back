const Posts = require('../models/PostModel')
const User = require('../models/UserModel')

exports.addPost = (req, res, next) => {
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
    }
    console.log("+_+_+_+ =>", postData)
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
    const userid = req.params.id
    Posts.findOne({
        userId: userid
    }).then(result => {
        if (!result) {            
            res.json({
                postsList: result.posts
            })
        } else {
            res.json({
                postsList: result.posts
            })
        }
    })
    .catch(err => {
        next(err)
    })
}

// exports.addComment = (req, res, next) => {
    
//     console.log('log in add comment controller0')

// } 

