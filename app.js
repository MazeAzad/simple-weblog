// PUT ALL IMPORTS TO TOP OF FILE
const express = require("express");
const MongoStore=require("connect-mongo");
const mongoose=require("mongoose");
const dotEnv = require("dotenv");
const app = express();
const path = require("path");
const ejsExpressLayout = require("express-ejs-layouts");
const session=require("express-session");
const flash = require("connect-flash");
const passport=require("passport");
const upload=require("express-fileupload");
require("./config/passport");
// env file
dotEnv.config({ path: "./config/config.env" });
// import routing
const homePage = require("./router/homeRoute");
const registerPage = require("./router/registerRouter");
const loginPage = require("./router/loginRouter");
const adminRoute=require("./router/admin");
const postsRoute=require("./router/posts");

// connection to data base
const mongoConnect = require("./config/database");
mongoConnect();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express fileupload
app.use(upload());
//veiw Engine
app.set("view engine", "ejs");

// ejs express layout
app.use(ejsExpressLayout);
app.set("layout", "./layout/mainLayout");

// express statict
app.use(express.static(path.join(__dirname, "public")));

//session 
app.use(session({
  secret:"secret",
  cookie:{maxAge:4320000000},
  resave:false,
  saveUninitialized:false,
  unset:"destroy",
  store:  MongoStore.create( { mongoUrl:process.env.MONGO_URI,dbName:"blog_db2",autoRemove:"disabled",collectionName:"session" } )
}))
// flash
app.use(flash());

// passport js 
app.use(passport.initialize());
app.use(passport.session());

// clear chashe
app.use(function(req,res,next){
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})

// routers
app.use(homePage);
app.use(registerPage);
app.use(loginPage);
app.use(adminRoute);
app.use(postsRoute);
// sever run

app.listen(process.env.PORT, () => {
  console.info("app is runnig");
});
