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

exports.updateEvent = (req, res, next) => {

}