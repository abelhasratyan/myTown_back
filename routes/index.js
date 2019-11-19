const User = require('../controllers/UserController')
const Album = require('../controllers/PhotoController')
const Friend = require('../controllers/friendController')
const Post = require('../controllers/PostController')
const Search = require('../controllers/searchController')

const passport = require('passport')
const upload = require('../middlewares/uploadSingleImage')
const postImage = require('../middlewares/uploadPostPhoto')
const finds = require('../middlewares/finds')

const express = require('express');
const router = express.Router();


/* GET home page. */
router.post('/registration', User.registration)
router.post('/login', User.login)


// User
//router.get('/user', passport.authenticate('jwt', { session: false }), User.getUser)

router.post('/user', passport.authenticate('jwt', { session: false }), User.getUser)

router.get('/user/:id', passport.authenticate('jwt', { session: false }), User.getUser)
router.post('/updateuser', passport.authenticate('jwt', { session: false }), User.UpdateUserData)
router.post('/user/avatar/update', passport.authenticate('jwt', {session: false}), upload.single('file'), User.updateUserProfilePhoto)


//Forgot Password
router.post('/validateuser', User.validateUser)
router.post('/validatenumber', User.validateNumber)
router.post('/changepassword', User.userForgotPassword)


// Album
router.post('/album', passport.authenticate('jwt', { session: false }), Album.CreateAlbum)
router.get('/albums', passport.authenticate('jwt', { session: false }), Album.getAlbums)
router.get('/albums/user', passport.authenticate('jwt', { session: false }), Album.getUserAlbums)
router.get('/albums/:id', passport.authenticate('jwt', { session: false }), Album.getAlbums)


// Photo
router.post('/photo', passport.authenticate('jwt', { session: false }), upload.single('file'), finds.findAlbum, Album.addPhoto)
router.get('/profilePhotos', passport.authenticate('jwt', { session: false }), Album.getProfilePhotos)
router.get('/coverPhotos', passport.authenticate('jwt', { session: false }), Album.getCoverPhotos)


// Friens
router.get('/friend', passport.authenticate('jwt', { session: false }), Friend.getFriends)
router.post('/friend', passport.authenticate('jwt', { session: false }), Friend.addFriend)
router.delete('/friend', passport.authenticate('jwt', { session: false }), Friend.deleteFriend)


// Posts
router.post('/user/newpost', passport.authenticate('jwt', { session: false }), postImage.single('file'), Post.addPost)
router.get('/user/:id/posts', passport.authenticate('jwt', { session: false }), Post.getUserPosts)
// router.post('/user/addcomment', passport.authenticate('jwt', { session: false }), Post.addComment)


// Search
router.post('/search', passport.authenticate('jwt', { session: false }), Search.searchUsers)

// passport.authenticate('jwt', { session: false })




module.exports = router;
