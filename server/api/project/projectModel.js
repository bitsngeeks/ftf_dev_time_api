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
  assigned: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },

  rate:{
    type: Number,
    required: true
  },

  log: [{date:{
      type:Date,
      required: true
        },
        time:{
            type:Number,
            required:true
        },
        user:{type: Schema.Types.ObjectId, ref: 'user',required:true}

}]
});

module.exports = mongoose.model('project', ProjectSchema);
