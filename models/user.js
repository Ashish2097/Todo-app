const mongoose = require('mongoose');

let user = mongoose.model("User",{
  email:{
      type: String
      // validator: (em)=>{
      //   var emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      //   return emailRegex.test(em.text);
      // }
      ,
      require: true,
      trim: true
    }
});

module.exports = {user};
