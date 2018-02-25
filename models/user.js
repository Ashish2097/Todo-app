const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = mongoose.Schema({
  email:{
    type: String,
    minlength: 1,
    require: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'is not a valid email'
    }
  },
  password:{
    type: String,
    require: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type: String,
      require: true
    },
    token:{
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function(){
  let user = _.pick(this,["_id","email"]);
  return user;
};

UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id, access},"secretkey").toString();
  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  });

}

let User = mongoose.model("User",UserSchema);

module.exports = {User};
