const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let UserSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


UserSchema.methods.generateAuthToken = async function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});
  await user.save();
  return token;
}

UserSchema.methods.removeToken = async function(token){
  let user = this;
   await user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  })
}

UserSchema.statics.findByToken = async function(token) {
  let User = this;
  let decoded;
  try{
    decoded = jwt.verify(token, "abc123");
    const user = await User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
    return user;
  } catch(err) {
    console.log(err);
  }
}

UserSchema.statics.findCredentials = function (username, password) {
  var User = this;

  return User.findOne({username: username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }
        else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre("save", function (next) {
  let user = this;

  if(user.isModified("password")){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports  = mongoose.model("User", UserSchema);
