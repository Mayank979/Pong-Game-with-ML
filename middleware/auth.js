const User = require("../models/user");

let authenticate = async function (req, res, next) {
  if(req.session.user){
    try{
      let token = req.session.token;
      const user = await User.findByToken(token);
      req.user = user;
      next();
    } catch(err) {
      console.log(err);
    }
  } else {
    res.send("Login first");
  }


};

module.exports = authenticate
