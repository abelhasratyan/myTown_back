const Event = require('../models/EventModel');

exports.createEvent = (req, res, next) => {
    let eventData = req.body.data;
    delete eventData.token;
    console.log('+_+_+_+_+_+_+ eventData =>>>', eventData);
    Event.findOneAndUpdate({ userId: eventData.id }, {
        $push: {
            events: {
                $each: [eventData],
                $position: 0
            }}
    }, {
        new: true
    }).then(result => {
        if ((result === null) || (result === undefined)) {
            res.json({
                success: false
            })
        } else {
            console.log('+_+_+_+_+_++++ result =>>>>', result);
            res.json({
                success: true
            })
        }
    }).catch(err => {
            next(err)
        });
};

exports.getEvents = (req, res, next) => {
    const Id = req.params.id;
    Event.findOne({ userId: Id})
        .then(result => {
            if ((result === null) || (result === undefined)) {
                res.status(400).json({
                    success: false
                })
            } else {
                res.status(200).json({
                    success: true,
                    result: result.events
                })
            }
        })
        .catch(err => {
            next(err)
        });
};

exports.deleteEvent = (req, res, next) => {
    let Id = req.body.userId;
    let eventId = req.body.eventId;
    Event.findOneAndUpdate({ userId: Id }, {
        $pull: { 'events': { _id: eventId }}
    }, { new: true })
    .then(result => {
        if ((result === null)|| (result === undefined)) {
            res.status(400).json({
                success: false,
                msg: 'Can\'t find event'
            })
        } else {
            res.json({
                success: true,
                result: result.events
            });
        }
    })
    .catch(err => {
        next(err);
    });
};

exports.updateEvent = async (req, res, next) => {
    const currentUserId = req.body.userId;
    const eventId = req.body.eventId;
    let eventData = {
        title: req.body.event.title,
        tag: req.body.event.tag,
        description: req.body.event.description,
        categories: req.body.event.categories,
        country: req.body.event.country,
        city: req.body.event.city,
        place_name: req.body.event.place_name,
        data_start: req.body.event.data_start,
        data_end: req.body.event.data_end,
    };
    Event.findOneAndUpdate({ userId: currentUserId, 'events._id': eventId }, {
        $set: { 'events.$': eventData }
    }, { new : true}).then(result => {
        if ((result === null) || (result === undefined)) {
            res.status(400).json({
                success: false,
                msg: 'Can\'t find event'
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