const Posts = require('../models/PostModel');
const fs = require('fs');

exports.addPost = (req, res, next) => {
    const postData = {
        userId: req.body.userId,
        text: req.body.text,
    };
    if (req.file) {
        postData.file = {
            path: `${process.env.SERVER_URL}/uploads/posts/${req.file.filename}`,
            name: req.file.filename
        }
    }
    Posts.findOneAndUpdate({ userId: postData.userId }, {
        $push: {
           posts: {
                $each: [postData],
                $position: 0
        }} 
    }, {new: true})
    .then(result => {
        if (!result) {
            res.json({
                success: false
            })
        }
        res.json({
            success: true,
            result: result.posts.slice(0)[0]
        })
    }).catch(err => {
        next(err)
    })
};

exports.getUserPosts = (req, res, next) => {
    const userid = req.params.id;
    Posts.findOne({ 
        userId: userid
    }).then(result => {
        if (!result) {            
            res.json({
                error: true,
                message: "Posts not found"
            })
        } else {
            res.json({
                success: true,
                result: result.posts
            })
        }
    })
    .catch(err => {
        next(err)
    })
};


exports.deletePost = (req, res, next) => {
    let userd = req.body.userId;
    let postd = req.body.postId;
    let bool = false;
    Posts.findOneAndUpdate({ userId: userd }, {
        $pull: { 'posts': { _id: postd }}
    }).then(user => {
        for (let i = 0; i < user.posts.length; i++) {
            if ((user.posts[i].id === postd) && (user.posts[i].file)) {
                fs.unlinkSync(`${__basedir}/uploads/posts/${user.posts[i].file.name}`);
                bool = !bool;
                break;
            }
        }
        if (!bool) {
            res.status(400).json({
                success: false
            })
        } else {
            res.status(200).json({
                success: true
            })
        }
    }).catch(err => {
        next(err);
    });
};


// exports.addComment = (req, res, next) => {
    
//     console.log('log in add comment controller0')

// } 

