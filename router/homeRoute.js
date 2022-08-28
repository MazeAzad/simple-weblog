const express = require("express");
const userController = require("../controller/userController");
const adminController=require("../controller/adminController");
const router = express.Router();
router.get("/", adminController.vistorCheck, userController.getHomePage);
router.get("/blogs", adminController.vistorCheck,userController.getBlogs);
router.get("/post/:postId",adminController.vistorCheck, userController.showPosts);

module.exports = router;
