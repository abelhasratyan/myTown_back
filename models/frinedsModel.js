const mongoose = require('mongoose')
const db = require('../lib/db_connect')

const Schema = mongoose.Schema;

const today = new Date();
const dataFormat = today.toISOString()

const friendsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  friend: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
  }]
})

module.exports = Friends = db.model("friends", friendsSchema);
