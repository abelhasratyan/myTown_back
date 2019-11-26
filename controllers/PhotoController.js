const Album = require('../models/AlbumModel');
const Photo = require('../models/PhotoModel');

exports.CreateAlbum = (req, res, next) => {    
    const albumData = {
        title: req.body.title,
        user: req.user.id
    }
    Album.findOne({
        title: req.body.title,
        user: req.user._id
    }).then(album => {
        if (album) {
            const error = new Error();
            error.message = 'Such Album already exist';
            next(error)
        } else {
            Album.create(albumData)
                .then(album => {
                    res.json({
                        success: true,
                        album
                    })
                })
                .catch(err => {
                    next(err)
                })
        }
    }).catch(err => {
        next(err)
    })
};

exports.getAlbums = (req, res, next) => {
    if (!req.params.id) {
        Album.find({user: req.user._id}).then(albums => {
            res.json({
                success: true,
                albums
            })
        }).catch(err => {
            next(err)
        })
    } else {
        Album.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate('user').populate('images.imageId').then(album => {
            if (album) {
                res.json({
                    success: true,
                    album
                })
            }
        }).catch(err => {
            next(err)
        })
    }
};

exports.getUserAlbums = (req, res, next) => {
    Album.find({user: req.user._id}).then(docs => {
        res.json({
            success: true,
            docs
        })
    }).catch(err => {
        next(err)
    })
};

exports.addPhoto = (req, res, next) => {

    const data = {
        name: req.file.filename,
        link: `${process.env.SERVER_URL}/uploads/images/${req.file.filename}`,
        album: req.body.album,
        user: req.user._id
    };
    Photo.create(data).then(response => {
        Album.findOneAndUpdate({
            title: req.body.album,
            user: req.user._id
        }, {
            $push: {images: {imageId: response._id}}
        }, {new: true}).then(docs => {
            if (docs) {
                res.json({
                    success: true,
                    docs
                })
            }
        }).catch(err => {
            next(err)
        })
    }).catch(err => {
        next(err)
    })
};

exports.getProfilePhotos = (req, res, next) => {
    Photo.find({
        user: req.user._id,
        album: {$ne: 'Cover'}
    }).then(response => {
        res.json({
            success: true,
            response
        })
    }).catch(err => {
        next(err)
    })
};

exports.getCoverPhotos = (req, res, next) => {
    Photo.find({
        user: req.user._id,
        album: 'Cover'
    }).then(response => {
        res.json({
            success: true,
            response
        })
    }).catch(err => {
        next(err)
    })
};