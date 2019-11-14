const Posts = require('../models/PostModel')
const User = require('../models/UserModel')

exports.addPost = (req, res, next) => {
    // console.log('file =>>>>', req.file)
    // console.log('req.body = >>>>>', req.body)
    let file  = null;
    if (req.file) {
        file = {
            path: `${process.env.SERVER_URL}/uploads/posts/${req.file.filename}`,
            name: req.file.filename
        }
    }
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
        file: file
    }
    Posts.findOneAndUpdate({ userId: postData.userId }, {
        $push: { posts: postData } 
    }, {new: true})
    .then(result => {
        if (!result) {
            res.json({
                success: false
            })
        }
        let length = result.posts.length
        res.json({
            success: true,
            result: result.posts.slice(-1)[0]
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

