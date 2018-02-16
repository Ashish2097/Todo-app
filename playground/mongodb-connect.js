const MongoClient = require('mongodb').MongoClient;
var db = require('mongodb').Db;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
  if(err){
    return console.log("Unable To Connect To Server");
  }
  console.log("Connected To Server");
  var database = db.db('TodoApp');
  database.collection('Todos').insertOne({
    text: "entering values using nodejs first time",
    done: false
  },(error, res)=>{
    if(error){
        return console.log('unable to add data');
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  })

  database.collection('Todos').insertOne({
    text: "This is Ashish Duklan",
    city: "Srinagar",
    phno: "8171860873"
  },(err, res)=>{
    if(err)
    {
      return console.log(err);
    }
    console.log(JSON.stringify(res.ops,undefined, 6));
  })
  db.close();

})
