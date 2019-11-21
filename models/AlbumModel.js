const mongoose = require('mongoose');
const db = require('../lib/db_connect');

const Schema = mongoose.Schema;

const today = new Date();
const dataFormat = today.toISOString();

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60,
    },
    images: [{
        imageId: {
            type: String,
            ref: 'photos'
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    backImage: {
        type: String,
        default: `${process.env.SERVER_URL}/default/background.jpg`
    },
    created: {
        type: Date,
        default: dataFormat
    }
})

module.exports = Albums = db.model("albums", albumSchema);
