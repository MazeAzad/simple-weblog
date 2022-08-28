exports.logout=async(req,res,next)=>{
    try{
       
      
      const loginUser=require("../model/userLogControll");
      const userId=req.user.id;
      await loginUser.findOneAndUpdate({user:userId},{loginStatus:"off"});
      await loginUser.findOneAndUpdate({user:userId},{logout:new Date()});
       

      req.logout(function(err){
        if(err){ return next(err)}
      });
      
      res.redirect("/login"); 
    }catch(err){
      console.log(err);
    }
  
  }


exports.getUserHomePage=async(req,res)=>{
    try{
     
      const username=req.params.username;
       
      const userLogin=require("../model/userLogControll");
      
        if(req.user!==undefined)
        { 
          const userId=req.user.id;
          const loginDoc= await userLogin.findOne({user:userId});
          if(loginDoc){
            await loginDoc.updateOne({loginStatus:"on",entrance:new Date()});
            
          }else{
                 userLogin.create({
                 loginStatus:"on",
                 user:userId,
                 entrance:new Date()
           })
          }
        
          
          linkObject={
            post:`/user/${username}/post`,
            create:`/user/${username}/create`,
            logout:`/user/${username}/logout`
          }
          
          const fullnameArray=username.split("_");
          const fullname=fullnameArray.join(" ");
          const postDB=require("../model/posts");
          const userID=req.user.id;
          const posts = await postDB.find({user:userID});
        
          
          res.render("user-home-page",{layout:"./layout/usersLayout",linkObject,fullname,username,posts});
        }
   
  }catch(err){
    console.log(err);
  }
  
  }
  
  
  // create post sectoin
  exports.getDashboard=(req,res)=>{
     
    const userId=req.user.id;
    
    const username=req.params.username;
    linkObject={
      post:`/user/${username}/post`,
      create:`/user/${username}/create`,
      logout:`/user/${username}/logout`
    }
    res.render("create-post",{layout:"./layout/usersLayout",linkObject});
  }
   
  
   
  const uuid=require("uuid").v4;
  const path=require("path");
  const appRoot=require("app-root-path");
  const fs =require("fs");
  exports.uploadImage= (req,res)=>
  {   
     
      const originaFileName=req.files.uploadImage.name;
      const fileNameArray=originaFileName.split(".");
      const fileExtension=fileNameArray[1];
      const newFileName=`${uuid()}.${fileExtension}`;
      req.files.uploadImage.name=newFileName;
      
      const filePath=path.join(appRoot.path,"public/uploads",`${newFileName}`);
      req.files.uploadImage.mv(filePath);
      const newFilePath1=`http://localhost:3000/uploads/${newFileName}`;
      const username=req.params.username; 
      req.body={...req.body,postImage:newFilePath1,postImagePath:filePath,user:req.user.id};
      const postDb=require("../model/posts")
      postDb.create(req.body);
      res.redirect(`/user/${username}`);
  
  } 
  
  // user post section 
  exports.getUserPosts=async(req,res)=>{
    try{
      const userID=req.user.id;
      const postDB=require("../model/posts");
      const username=`${req.user.firstName}_${req.user.lastName}`;
      linkObject={
        post:`/user/${username}/post`,
        create:`/user/${username}/create`,
        logout:`/user/${username}/logout`
      }
      const posts= await postDB.find({user:userID});
      res.render("user-post",{layout:"./layout/usersLayout",posts,username,linkObject});
    }catch(err){
      console.log(err);
    }
   }
   
  // deleting a post 
  exports.delete=async(req,res)=>{
    try{
     const postDB=require("../model/posts");
     const postId=req.params.postId;
      
      await postDB.deleteOne({_id:postId});
      const username=`${req.user.firstName}_${req.user.lastName}`;
      res.redirect(`/user/${username}/post`);
    }catch(err){
      console.log(err);
    }
  }
  // updating a post 
  exports.update=async(req,res)=>{
    try
    {
      const postDB=require("../model/posts");
      const postId=req.params.postId;
      const filter={_id:postId};
      const username=`${req.user.firstName}_${req.user.lastName}`;
  
      linkObject={
        post:`/user/${username}/post`,
        create:`/user/${username}/create`,
        logout:`/user/${username}/logout`,
        update:`/update/${postId}`
      }
      const post= await postDB.findById(filter);
      res.render("update-post",{layout:"./layout/usersLayout",linkObject,post});
    }catch(err){
      console.log(err);
    }
  }
  
  exports.updatePost=async(req,res)=>{
    try{
     
      const postId=req.params.postId;
      const postDB=require('../model/posts');
      const filter={_id:postId};
      console.log(filter);
      if(req.files===null){
        await postDB.findByIdAndUpdate(filter,req.body);
        const username=`${req.user.firstName}_${req.user.lastName}`;
        res.redirect(`/user/${username}/post`);
      }else{
      let body=req.body;
       fs.unlinkSync(body.lastImage);
      delete body.lastImage;
       
      const originaFileName=req.files.uploadImage.name;
      const fileNameArray=originaFileName.split(".");
      const fileExtension=fileNameArray[1];
      const newFileName=`${uuid()}.${fileExtension}`;
      req.files.uploadImage.name=newFileName;
      
      const filePath=path.join(appRoot.path,"public/uploads",`${newFileName}`);
      req.files.uploadImage.mv(filePath);
      const newFilePath1=`http://localhost:3000/uploads/${newFileName}`;
      const username=`${req.user.firstName}_${req.user.lastName}`;
      console.log(username);
   
       
       
      const newBody={...body,postImage:newFilePath1,postImagePath:filePath};
      await postDB.findByIdAndUpdate(filter,newBody);
      res.redirect(`/user/${username}/post`);
     
      }
  
    }catch(err){
      console.log(err);
    }
  }
  
  // showing the post 
  exports.showPosts=async(req,res)=>{
    try
    {
        
      const postDb=require("../model/posts");
      const postId=req.params.postId;
      const post= await postDb.findById(postId);
      const username=req.params.username;
      const nameArray=username.split("_");
      const fullname=`${nameArray[0]} ${nameArray[1]}`;
      res.render("userShowPost",{layout:"./layout/usersLayout",post,fullname});
    }catch(err){
      console.log(err);
    }
   
  
  }

exports.CheckLogin=async(req,res,next)=>{
    try{
        const userLoginDb=require("../model/userLogControll");
        const userId=req.user.id;
        const loginCheck= await userLoginDb.findOne({user:userId});
        if(loginCheck){
            if(loginCheck.loginStatus==="on"){
                next();
            }
            else{
                res.redirect("/login");
            }
        
        }else{
            res.redirect("/login");
        }
    }catch(err){
        console.log(err);
    }

}
exports.vistorCheck=(req,res,next)=>{
  if(req.user){
    const username=`${req.user.firstName}_${req.user.lastName}`;
    res.redirect(`/user/${username}`);
  }else{
    next();
  }
}