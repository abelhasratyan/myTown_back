const Album = require('../models/AlbumModel')

exports.findAlbum = (req, res, next) => {
    Album.findOne({
        user: req.user._id,
        title: req.body.album
    }).then(docs => {
        if (docs) {
            next()
        } else {
            res.json({
                success: false,
                message: "Such Album doesn't exist"
            })
        }
    }).catch(err => {
        next(err)
    })
}
