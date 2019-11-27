const User = require('../controllers/UserController');
const Album = require('../controllers/PhotoController');
const Friend = require('../controllers/friendController');
const Post = require('../controllers/PostController');
const Search = require('../controllers/searchController');
const Event = require('../controllers/EventController');

const upload = require('../middlewares/uploadSingleImage');
const AvatarPhoto = require('../middlewares/uploadAvatarPhoto');
const CoverPhoto = require('../middlewares/uploadCoverPhoto');
const postImage = require('../middlewares/uploadPostPhoto');
const checkUser = require('../middlewares/checkUser');
const finds = require('../middlewares/finds');

const passport = require('passport');
const express = require('express');
const router = express.Router();


/* GET home page. */
router.post('/registration', User.registration);
router.post('/login', User.login);

// User
router.get('/user', passport.authenticate('jwt', { session: false }), User.getUser);
router.post('/user', passport.authenticate('jwt', { session: false }), User.getUser);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), User.getUser);
router.post('/updateuser', passport.authenticate('jwt', { session: false }), User.UpdateUserData);

//update user's profile and cover photo
router.post('/user/avatar/update', passport.authenticate('jwt', {session: false}), checkUser.CheckUser, AvatarPhoto.single('file'), User.updateUserProfilePhoto);
router.post('/user/cover/update', passport.authenticate('jwt', {session: false}), checkUser.CheckUser, CoverPhoto.single('file'), User.updateUserCoverPhoto);


//Forgot Password
router.post('/validateuser', User.validateUser);
router.post('/validatenumber', User.validateNumber);
router.post('/changepassword', User.userForgotPassword);


// Album
router.post('/album', passport.authenticate('jwt', { session: false }), Album.CreateAlbum);
router.get('/albums', passport.authenticate('jwt', { session: false }), Album.getAlbums);
router.get('/albums/user', passport.authenticate('jwt', { session: false }), Album.getUserAlbums);
router.get('/albums/:id', passport.authenticate('jwt', { session: false }), Album.getAlbums);


// Photo
router.post('/photo', passport.authenticate('jwt', { session: false }), upload.single('file'), finds.findAlbum, Album.addPhoto);
router.get('/profilePhotos', passport.authenticate('jwt', { session: false }), Album.getProfilePhotos);
router.get('/coverPhotos', passport.authenticate('jwt', { session: false }), Album.getCoverPhotos);


// Friens
router.get('/friend', passport.authenticate('jwt', { session: false }), Friend.getFriends);
router.post('/friend', passport.authenticate('jwt', { session: false }), Friend.addFriend);
router.delete('/friend', passport.authenticate('jwt', { session: false }), Friend.deleteFriend);


// Posts
router.post('/user/newpost', passport.authenticate('jwt', { session: false }), postImage.single('file'), Post.addPost);
router.get('/user/:id/posts', passport.authenticate('jwt', { session: false }), Post.getUserPosts);
router.delete('/user/post/delete/:id', passport.authenticate('jwt', { session: false }), Post.deletePost);
// router.post('/user/addcomment', passport.authenticate('jwt', { session: false }), Post.addComment)


// Search
router.post('/search', passport.authenticate('jwt', { session: false }), Search.searchUsers);

//Events
router.post('/user/event/create', passport.authenticate('jwt', {session: false}), Event.createEvent);
router.get('/user/events/:id', passport.authenticate('jwt', {session: false}), Event.getEvents);
router.post('/user/event/delete', passport.authenticate('jwt', {session: false}), Event.deleteEvent);
router.post('/user/event/update', passport.authenticate('jwt', {session: false}), Event.updateEvent);
//passport.authenticate('jwt', {session: false}),

module.exports = router;
