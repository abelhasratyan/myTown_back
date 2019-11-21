const Event = require('../models/EventModel');

exports.createEvent = (req, res, next) => {
    console.log('log 1 in Create Event controller ');
    // console.log('+_+_+_+_+ req.body=>>>', req.body);
    let eventData = req.body.data;
    // console.log('before change log evnetData =>>>>>', eventData);
    delete eventData.token;
    console.log('+_+_+_+_+ log for event data=>>>', eventData);
    // console.log('+_+_+_+_+_+_+_+ afther log eventData =>>>', eventData);
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
                event: result
            })
        }
    }).catch(err => {
            next(err)
        });
};