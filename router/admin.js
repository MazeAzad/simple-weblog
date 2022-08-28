 
const express=require("express");
const router=express.Router();
const adminController=require("../controller/adminController");
const{authenticated}=require("../middlewares/auth");
router.get("/user/:username",authenticated,adminController.getUserHomePage);
router.get("/user/:username/logout",authenticated,adminController.logout);         
module.exports=router;