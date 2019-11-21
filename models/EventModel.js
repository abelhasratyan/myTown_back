const mongoose = require('mongoose')
const db = require('../lib/db_connect')

const Schema = mongoose.Schema;

const today = new Date();
const dataFormat = today.toISOString()

const EventSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    events: [{
        created: {
            type: Date,
            default: dataFormat
        },
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 60,
        },
        //*********** Descuse ******
        // tags: {
        //     required: true,
        // },
        description: {
            required: true,
            type: String,
            trim: true,
            minlength: 15,
            maxlength: 500,
        },
        categories: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        place_name: {
            type: String,
            required: true
        },
        data_start: {
            type: String,
            required: true
        },
        data_end: {
            type: String,
            required: true
        },
        //events: {
        //  required: true,
        // }
        fie: {
            name: String,
            path: String
        }
        // add rest fields
    }]

});

module.exports = Posts = db.model('events', EventSchema);
