const Event = require('../models/EventModel');

exports.createEvent = (req, res, next) => {
    let eventData = req.body.data;
    // delete eventData.token;
    console.log('+_+_+_+_+_++++ log in create event req.body.data=>>>', req.body.data);
    console.log('+_+_+_+_+_++++ log in create event EventData=>>>', eventData);
    Event.findOneAndUpdate({ userId: eventData.id }, {
        $push: {
            events: {
                $each: [eventData],
                $position: 0
            }}
    }, {
        new: true
    }).then(result => {
        console.log('in create event log result= >>', result)
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
            console.log("+_+_+_+ log in get event result =>>>", result);
            if ((result === null) || (result === undefined)) {
                res.status(400).json({
                    success: false
                })
            } else {
                console.log('log in sending response get events result.events=>>', result.events);
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