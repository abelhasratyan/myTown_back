const Event = require('../models/EventModel');

exports.createEvent = (req, res, next) => {
    let eventData = req.body.data;
    delete eventData.token;
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
    Event.findOne({ userId: Id
    }).then(result => {
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
    }).catch(err => {
        next(err)
    });
};

exports.deleteEvent = (req, res, next) => {
    let Id = req.body.userId;
    let eventId = req.body.eventId;
    Event.findOneAndUpdate({ userId: Id }, {
        $pull: { 'events': { _id: eventId }}
    }, {
        new: true
    }).then(result => {
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
    }).catch(err => {
        next(err);
    });
};

exports.updateEvent = async (req, res, next) => {
    const currentUserId = req.body.id;
    console.log('+_+_+_+ log for req =>>', req.body);
    const eventId = req.body.event_id;
    let eventData = {
        title: req.body.title,
        tag: req.body.tag,
        description: req.body.description,
        categories: req.body.categories,
        country: req.body.country,
        city: req.body.city,
        place_name: req.body.place_name,
        data_start: req.body.data_start,
        data_end: req.body.data_end,
    };
    Event.findOneAndUpdate({ userId: currentUserId, 'events._id': eventId }, {
        $set: { 'events.$': eventData }
    }, {
        new : true
    }).then(result => {
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