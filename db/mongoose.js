const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then((res)=>{
  console.log("connected");
},(err)=>{
  console.log("Unable to connect : " + err);
});

module.exports = {mongoose};
