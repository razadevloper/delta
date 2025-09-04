const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utlls/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, isReviewAuthor } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingController.creatListing)
    );


// ADD NEW LISTING AND CREAT NEW LISTING
router.get("/new", isLoggedIn, listingController.renderNewForm);
router.get("/search", wrapAsync(listingController.searchListing));

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    )

router.get(
    "/category/:category",
    wrapAsync(listingController.getListingsByCategory)
);



//EDIT ROUTE
router.get(
    "/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;


// HOME LISTING ROUTE
// router.get("/", wrapAsync(listingController.index));

// SHOW ROUTE
// router.get(
//     "/:id",
//     wrapAsync(listingController.showListing)
// )

// CREATE LISTING
// router.post(
//     "/", isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.creatListing)
// );

//UPDATE ROUTE
// router.put(
//     "/:id", isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
// );

//DELETE ROUTE
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.deleteListing)
// );