const env = process.env.NODE_ENV || 'dev';
// console.log("env"+ env);
if(env==="dev"){

  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";      //different database
}
else if(env==="test"){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";    //different database
}

// console.log(process.env.);
