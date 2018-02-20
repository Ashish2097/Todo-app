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
    delfault: null
  }
});

module.exports = {Todo};
