let {User} = require('./../models/user.js');

let authenticate=(req, res, next)=>{
  let token = req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user)
    {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();       //to move forward from middle-ware to next func.
  },(error)=>{
    res.status(401).send(error);
  });
};

module.exports = {authenticate};
