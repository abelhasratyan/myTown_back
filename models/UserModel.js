const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const types = require('../constants/roles');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const today = new Date();
const dataFormat = today.toISOString();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60,
    },
    email: {
        type: String,
        email: true,
        unique: true,
        required: true,
    },
    birthday: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: `${process.env.SERVER_URL}/default/default_avatar.png`,
    },
    coverPhoto: {
        type: String,
        default: `${process.env.SERVER_URL}/default/default_cover.jpg`,
    },
    role: {
        type: String,
        enum: Object.values(types),
        default: types.USER,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: dataFormat
    }
});
userSchema.plugin(uniqueValidator);

module.exports = Users = db.model("users", userSchema);
