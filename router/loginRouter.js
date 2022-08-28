const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const adminController=require("../controller/adminController");
router.get("/login" ,adminController.vistorCheck ,userController.getLoginPage);
router.post("/login",adminController.vistorCheck ,userController.loginHandller,userController.secondLoginHandller);


module.exports = router;
