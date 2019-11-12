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
    console.log('log 1 in add post')
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
        link: req.file.filename
    }
    console.log('log postData =>>>', postData)
    console.log('log 2 in add post')
    Posts.findOneAndUpdate({ userId: postData.userId }, {
        $push: { posts: postData } 
    }, {new: true})
    .then(result => {
        console.log('log 3 in add post')
        if (!result) {
            console.log('case if result is null ')
        }
        res.json({
            success: true,
            result
        })
        // console.log('result in post controller =>>', result)
        console.log('log 4 in add post')
    }).catch(err => {
        console.log("log 5 in catch")
        console.log('err =>>>>>', err)
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

