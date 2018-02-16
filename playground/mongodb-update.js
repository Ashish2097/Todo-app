const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error, database)=>{
  if(error){
    return console.log("Unable To Connect To The Server");
  }
  console.log("Connected To The Server");
  var db = database.db('TodoApp');
  db.collection("Todos").findOneAndUpdate(
    {
      done: true
    },
    {
      $set:{
        text : "This is edited Ashish Duklan"
      },
      $inc:{
        phno : 1
      }
    },
    {
      returnOriginal : false
    }
  ).then((res)=>{
    console.log(res);
  })
})
