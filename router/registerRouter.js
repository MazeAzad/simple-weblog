const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const adminController=require("../controller/adminController")
router.get("/register"  ,adminController.vistorCheck ,userController.getRegisterPage);
router.post("/register",adminController.vistorCheck ,userController.registerHanddling);
module.exports = router;
