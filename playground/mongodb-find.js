const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var db = require('mongodb').Db;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log("Unable To Connect To Server");
  }
  console.log("Connected To Server");
  var database = db.db('TodoApp');
  database.collection('Todos').find({_id:new ObjectID("5a869e03de234e05a98b0cec")}|{done:false}).toArray().then((docs)=>{
    console.log(JSON.stringify(docs, undefined, 2));
  },(err)=>{
    console.log("Unable to find data!!");
  });
  // db.close();

})
