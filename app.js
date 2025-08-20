if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}



const express =require("express");
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const path=require("path");
const reviewRouter=require("./routes/review.js");
const ExpressError=require("./utils/ExpressError.js");
const listingRouter=require('./routes/listing.js');
const session=require('express-session');
const { cookie } = require("express/lib/response.js");
const flash=require("connect-flash");
const MONGO_url="mongodb://127.0.0.1:27017/wanderlust";

const passport=require("passport");
const LocalStrategy=require("passport-local")
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
const joi=require("joi");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));


main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_url);
}

const sessionOptions={
    secret:"superSecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7 *24*60*1000,
        maxAge:7 *24*60*1000,
        httpOnly:true,
    },
};


app.get("/",(req,res)=>{
    res.send("Hi , I am groot");
});

app.use(session(sessionOptions)); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser = req.user;
    next();
})


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



// Catch-all for unmatched routes
app.all('/{*any}', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!"));
});


// // Error handling middleware
app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs",{message});
    //res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});