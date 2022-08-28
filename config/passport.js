const passport=require("passport");
const {Strategy}=require("passport-local");
const bcrypt=require("bcrypt");
const Users=require("../model/users");
passport.use(new Strategy({usernameField:"email"},async(email,password,done)=>{
    try{
        const user= await Users.findOne({email});
        if(!user){
            return done(null,false,{message:"no user with this email"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(isMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"email or password is invalid"});
        }
    }catch(err){
        console.log(err);
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((id,done)=>{
    Users.findById(id,(err,user)=>{
        done(err,user);
    })
});