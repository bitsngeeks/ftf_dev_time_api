var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackerSchema = new Schema({
  taskname: {
    type: String,
    required: true
  },
  project: {type: Schema.Types.ObjectId, ref: 'project', required: true},
  
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},

  time: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('tracker', TrackerSchema);
