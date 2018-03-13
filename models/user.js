const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

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
  let token = jwt.sign({user, access},"secretkey").toString();
  user.tokens.push({access,token});
  return user.save().then(()=>{
    return token;
  });
};

UserSchema.statics.findByToken = function(token){   //statics --> non constructor method.....have to be called seperately
  let user = this;
  let decode;
  let id;
  try{
    decode = jwt.verify(token,'secretkey');
    console.log(decode);
    id = decode.user._id;
  }catch(e2){
    return Promise.reject("2. error in find by token /models/user.js = " + e2);
  }

  return User.findById(id);

};

UserSchema.pre('save', function (next){   //setting action to save event
  let user = this;
  if(user.isModified('password')){      //checking if the password property is modified/added or not
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash;           //replacing password with its hash before saving
        next();
      });
    });
  }else{

  }
});
let User = mongoose.model("User",UserSchema);

module.exports = {User};
