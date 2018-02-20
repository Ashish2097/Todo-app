const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp').then((res)=>{
  console.log("connected");
},(err)=>{
  console.log("Unable to connect : " + err);
});

module.exports = {mongoose};
