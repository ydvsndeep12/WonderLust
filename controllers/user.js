const User=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
 res.render("./users/signup");
}

module.exports.signUp=async (req,res)=>{
   
   
try{
 let {username,email,password}=req.body; 

   const newUser=new User({email,username});

    const registeredUser=await User.register(newUser,password);

    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
      if(err){
         return next(err);
        }
    req.flash("success","Welcome to WanderLust!!");

    return res.redirect("/listings");
    });

   }
   catch(e){
   req.flash("error",e.message);
   res.redirect("/signup");
   }
}

module.exports.renderSigninForm=(req,res)=>{
 res.render("./users/login.ejs");
}

module.exports.Singin= async(req,res)=>{
 req.flash("success","User login Successfully!")

 let redirectUrl=res.locals.redirectUrl || "/listings"
 res.redirect(redirectUrl);
}

module.exports.LogOut=(req,res ,next)=>{


req.logout((err)=>{
  
  if(err){
  return next(err);
  }
  
 req.flash("success","you are logged Out!");
 res.redirect("/listings");
})
}