const mongoose = require("mongoose");
const userScema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashing password before saving 
const bcrypt=require("bcrypt");
userScema.pre("save",function(next){
  let user=this;
  bcrypt.hash(user.password,10,(err,hash)=>{
    if(err) return next(err);
    user.password=hash;
    next();
  })

})
const Users = mongoose.model("Users", userScema);

module.exports = Users;
