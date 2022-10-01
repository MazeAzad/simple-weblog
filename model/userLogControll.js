const mongoose=require("mongoose");

const userLoginSchema= new mongoose.Schema({
    loginStatus:{
        type:String,
        enum:["on","off"],
        require:true
    },
    user:{
        ref:"Users",
        type: mongoose.Schema.Types.ObjectId
    },
    entrance :{
        type: Date,
        default:Date.now
    },
    userCount:{
        type:Number,
        default:1
    },
    logout:{
        type:Date,
        default:"",
    }

})

const userLoginModel =mongoose.model("UserLogin",userLoginSchema);

module.exports=userLoginModel;