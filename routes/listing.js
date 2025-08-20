const express=require("express");

const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

const listings=require('../routes/listing.js');
const Listing=require('../models/listing.js');
const {isLoggedIn,isOwner,validateListing}=require("../middleware");

const controllers =require("../controllers/listing.js");
const multer  = require('multer')

const {storage}=require("../cloudConfig.js");
const upload = multer({ storage})






// index route
router.route("/").get( wrapAsync(controllers.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]")
,wrapAsync(controllers.createListing));


// new Route
router.get("/new",isLoggedIn,controllers.renderNewForm);


// show route
router.route("/:id").get(wrapAsync(controllers.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(controllers.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(controllers.deleteListing));
// Create Route



//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(controllers.renderEditForm));


// update route




// Delete Route 



module.exports=router;