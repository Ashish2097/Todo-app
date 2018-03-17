let {User} = require('./../models/user.js');

let authenticate=(req, res, next)=>{
  let token = req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user)
    {
      return Promise.reject("User with this token is NULL.");
    }
    if(typeof user.tokens.token === "undefined")
    {
      return Promise.reject("This user doesnt have any token, give him/her one.");
    }
    console.log(user.tokens);

    req.user = user;
    req.token = token;
    next();       //to move forward from middle-ware to next func.
  }).catch((e)=>{
    res.status(401).send("Authenticate : " + e);
  });
};

module.exports = {authenticate};
