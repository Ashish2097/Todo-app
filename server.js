const bodyParser = require('body-parser');
const express = require('express');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {user} = require('./models/user');

let app = express();
app.use(bodyParser.json());
app.post('/todos',(req, res)=>{
  let todo1 = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedat: req.body.completed
  });

  todo1.save().then((result)=>{
    res.send("successfully added data to table\n"+result);
  },(error)=>{
    res.status(400).send(error);
  });
});

var cache =[];
app.get('/todos',(req, res)=>{
  Todo.find().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  })
})

let user1 = new user({
  email : "ashish"
});

user1.save();
app.get('/reset',(req, res)=>{
    Todo.remove({}).then((doc)=>{
      console.log(doc);
  });
  res.send("Data has been reset");
});

app.listen(3000,()=>{
  console.log("Connected to the Server (3000)");
});
