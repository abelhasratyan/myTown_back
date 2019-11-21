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
                success: true,
                event: result.events
            })
        }
    }).catch(err => {
            next(err)
        });
};