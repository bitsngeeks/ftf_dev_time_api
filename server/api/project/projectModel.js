var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  },

  client: {type: Schema.Types.ObjectId, ref: 'client',required:true},

  log: [{date:{
      type:Date,
      required: true
        },
        time:{
            type:Number,
            required:true
        }

}]
});

module.exports = mongoose.model('project', ProjectSchema);
