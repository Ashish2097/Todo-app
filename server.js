const bodyParser = require('body-parser');
const express = require('express');

const {ObjectID} = require('mongodb');
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

app.get('/todos/:id',(req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send("Not a valid id");
  };
  Todo.findById(id).then((todo)=>{
    if(todo == null)
      res.status(404).send("No data with this id");
    else
      res.send("-------\n"+todo);
  },(error)=>{
    res.send(error);
  });
})

app.get('/reset',(req, res)=>{
    Todo.remove({}).then((doc)=>{
      console.log(doc);
  });
  res.send("Data has been reset");
});

app.listen(3000,()=>{
  console.log("Connected to the Server (3000)");
});
