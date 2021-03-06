var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true
  },

  seller: {
    type: String, 
    required:true
  },

  projects: [{type: Schema.Types.ObjectId, ref: 'project'}]   
  
  
});

module.exports = mongoose.model('client', ClientSchema);
