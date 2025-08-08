const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlls/wrapAsync.js");
const ExpressError = require("../utlls/ExpressError.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const { reviewValidate, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")
router.post("/",
    isLoggedIn,
    reviewValidate,
    wrapAsync(reviewController.creatReview)

);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;