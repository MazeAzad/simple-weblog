
// home page 
const posts=require("../model/posts");
const mongoose=require("mongoose");
exports.getHomePage = async(req, res) => {
  try{
    postStatus="public";
    const postsArray= await posts.find({postStatus});
    const selectedPosts=[];
    for(let i=0;i<=5;++i){
      const post=postsArray[i];
      selectedPosts.push(post);
    }
     
    res.render("home",{selectedPosts});
    
  }catch(err){
    console.log(err);
  }
    
  
}

// register page
exports.getRegisterPage = (req, res) => {
  const errors=[];
  res.render("register",{errors});
};
const User = require("../model/users");
const registerValidation = require("../formValidation/registerValidation");
const passport = require("passport");

exports.registerHanddling =(req, res) => {
  let { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = registerValidation(
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  );
  if(errors.length>0){
    return res.render("register",{errors});
  }else{
    User.create({firstName,lastName,email,password})
    req.flash("success","register was successful");
    return res.redirect("/login");
    
  }
};

// login page 
exports.loginHandller= 
  passport.authenticate('local',{
    failureRedirect:"/login",
    failureMessage:true,
    failureFlash:true,
    successFlash:true
  
  });
 
 exports.secondLoginHandller=(req,res)=>{
    const userObject={
      firstName:req.user.firstName,
      lastName:req.user.lastName
    }
   
    res.redirect(`/user/${userObject.firstName}_${userObject.lastName}`);
      
   }

 
exports.getLoginPage = (req, res) => {
  res.render("login",{
    message:req.flash("success"),
    error:req.flash("error")
  });
   
};

exports.getBlogs=async(req,res)=>{
  try{
    const postDb=require("../model/posts");
    const posts= await postDb.find({postStatus:"public"});
    
    res.render("blogs",{layout:"./layout/mainLayout", posts});
  }catch(err){
    console.log(err);
  }

}

exports.showPosts=async(req,res)=>{
  try{
    const postDb=require("../model/posts");
    const postId=req.params.postId;
    const post= await postDb.findById(postId);
    const userId=post.user;
    const userDb=require("../model/users");
    const user= await userDb.findById(userId);
    const fullname=`${user.firstName} ${user.lastName}`;
    res.render("showPost",{layout:"./layout/mainLayout",post,fullname});
  }catch(err){
    console.log(err);
  }
}
