require("./config/config");
const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();

const port = process.env.PORT;
console.log(port);
app.use(bodyParser.json());

//adding todo
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

//list of all todos
app.get('/todos',(req, res)=>{
  Todo.find().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  })
});

//finding by id ....route
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
});

//deleting by id ....route
app.delete('/todos/:id',(req, res)=>{
  let id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send("Not a valid id: "+id);
  }
  else{
    Todo.findByIdAndRemove(id).then((todo)=>{
      if(todo === null){
        res.status(404).send("Cant find the todo");
      }
      else{
        res.send("todo deleted :\n"+todo);
      }
    }).catch((e)=>{
      res.status(400).send("error : "+ e);
    })
  }
});

//reset route
app.get('/reset',(req, res)=>{
    Todo.remove({}).then((doc)=>{
      console.log(doc);
      console.log("\n---------------------------\n");
  });
  User.remove({}).then((doc)=>{
    console.log(doc);
  });
  res.send("Data has been reset");
});

//updating
app.patch('/todos/:id',(req, res)=>{
  let id = req.params.id;
  let body = _.pick(req.body,["text","completed"]);
  if(!ObjectID.isValid(id)){
      return res.status(404).send("Not a valid id: "+id);
  }

  if(_.isBoolean(body.completed) && body.completed)
  {
    body.completedat = new Date().getTime();
  }
  else{
    body.completed = false;
    body.completedat = null;
  }
  console.log(body);
  // Todo.findByIdAndUpdate(id,{$set:{"text":"hey"}},{new : true}).then((res)=>{
  //   res.send(res);
  // })
    Todo.findByIdAndUpdate(id, {$set : body },{new : true}).then((todo)=>{
    console.log(todo);
    if(!todo)
    {
      return res.status(404).send("Cant update.");
    }
    res.send(todo);

  }).catch((e)=>{
    res.status(400).send("error:  "+e);
  })

});

//adding User
app.post('/users',(req, res)=>{
  let body = _.pick(req.body,['email','password']);
  let user = new User(body);
  user.save().then(()=>{
    user.generateAuthToken();
    // return res.send(user);
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    return res.status(400).send('Error '+e);
  })
});

app.listen(port,()=>{
  console.log(`Connected to the Server ${port}`);
});
