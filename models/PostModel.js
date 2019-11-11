const mongoose = require('mongoose')
const db = require('../lib/db_connect')

const Schema = mongoose.Schema;

const today = new Date();
const dataFormat = today.toISOString()

const PostSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true

    },
    posts: [{
      text: {
        type: String,
        minlength: 0,
        maxlength: 260
      },
      created: {
        type: Date,
        default: dataFormat
      }
      // to do image
      // to do comment like and share
    }]
  })
  
  module.exports = Posts = db.model('posts', PostSchema);