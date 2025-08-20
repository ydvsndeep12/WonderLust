const express=require("express");

const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require('../models/review.js');

const Listing=require('../models/listing.js');
const controllers=require("../controllers/reviews.js")

const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js")


// reviews

router.post("/",isLoggedIn,validateReview,wrapAsync (controllers.createReview));


//delete review

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(controllers.deleteReviews))

module.exports=router;