const mongoose = require('mongoose');

let Todo = mongoose.model('todos',{ //case insensitive
  text:{
    type: String,
    require: true,
    minlength: 1,
    trim: true
  },
  completed:{
    type: Boolean,
    default: false,
  },
  completedat:{
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId, 
    require: true,
  }
});

module.exports = {Todo};
