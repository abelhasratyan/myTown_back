const Posts = require('../models/PostModel')
const User = require('../models/UserModel')

exports.PostPhoto = (req, res, next) => {
    const file = req.file
    if (!file) {
        let error = new Error()
        error.msg = "couldn't add friend"
        next(error)
    } else {
        res.json({
            file: file
        })
    }
}

exports.addPost = (req, res, next) => {
    console.log('file =>>>>', req.file)
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
        file: {
            path: req.file.path,
            name: req.file.filename
        }
    }
    console.log('postData =>>>>', postData)
    Posts.findOneAndUpdate({ userId: postData.userId }, {
        $push: { posts: postData } 
    }, {new: true})
    .then(result => {
        if (!result) {
            res.json({
                success: false
            })
        }
        res.json({
            success: true,
            result
        })
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

