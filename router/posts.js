const express=require("express");
const router=express.Router();
const {authenticated}=require("../middlewares/auth");
const adminController=require("../controller/adminController");


router.get("/delete/:postId",authenticated,adminController.CheckLogin,adminController.delete);
router.get("/update/:postId",authenticated,adminController.CheckLogin,adminController.update);
router.post("/update/:postId",authenticated,adminController.CheckLogin,adminController.updatePost);
router.get("/user/:username/post",authenticated,adminController.CheckLogin,adminController.getUserPosts);

router.get("/user/:username/create",authenticated,adminController.CheckLogin,adminController.getDashboard);

router.post("/user/:username/create",authenticated,adminController.uploadImage);

router.get("/user/:username/post/:postId",authenticated,adminController.CheckLogin,adminController.showPosts);

module.exports=router;