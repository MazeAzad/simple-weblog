const mongoose=require("mongoose");
const postSchema= new mongoose.Schema({
    postTitle:{
        type:String,
        require:true
    },
    postStatus:{
        type:String,
        enum:["public","private"],
        require:true
    },
    postText:{
        type:String,
        require:true,
    },
    postImage:{
        type:String,
        require:true
    },
    postImagePath:{
        type:String,
        require:true
    },
    postCreate:{
        type:Date,
        default:Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
})

const postModel=mongoose.model("Posts",postSchema);

module.exports=postModel;