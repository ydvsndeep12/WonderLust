const express=require("express");

const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const controllers=require("../controllers/user.js")

router.route("/signup").get(controllers.renderSignupForm)
.post(wrapAsync(controllers.signUp));




//signin

router.route("/login").get(controllers.renderSigninForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
controllers.Singin);



// logout 

router.get("/logout",controllers.LogOut)


module.exports=router;