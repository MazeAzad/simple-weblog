const express = require("express");
const app = express();
const path = require("path");

// env file
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config/config.env" });

// connection to data base
const mongoConnect = require("./config/database");
mongoConnect();

// body parser
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express fileupload
const upload=require("express-fileupload");
app.use(upload());
//veiw Engine
app.set("view engine", "ejs");

// ejs express layout
const ejsExpressLayout = require("express-ejs-layouts");
app.use(ejsExpressLayout);
app.set("layout", "./layout/mainLayout");

// express statict
app.use(express.static(path.join(__dirname, "public")));


// storing session 
const MongoStore=require("connect-mongo");
 const mongoose=require("mongoose");

//session 
const session=require("express-session");
app.use(session({
  secret:"secret",
  cookie:{maxAge:4320000000},
  resave:false,
  saveUninitialized:false,
  unset:"destroy",
  store:  MongoStore.create( { mongoUrl:process.env.MONGO_URI,dbName:"blog_db2",autoRemove:"disabled",collectionName:"session" } )
}))
// flash
const flash = require("connect-flash");
app.use(flash());

// passport js 
const passport=require("passport");
 require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// clear chashe
app.use(function(req,res,next){
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

 

// routers


// home route
const homePage = require("./router/homeRoute");
app.use(homePage);
// register route
const registerPage = require("./router/registerRouter");
app.use(registerPage);

// login route
const loginPage = require("./router/loginRouter");

app.use(loginPage);

// user route
const adminRoute=require("./router/admin");
app.use(adminRoute);

const postsRoute=require("./router/posts");
app.use(postsRoute);
// sever run

app.listen(process.env.PORT, () => {
  console.info("app is runnig");
});
