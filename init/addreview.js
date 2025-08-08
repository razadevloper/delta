
const mongoose = require("mongoose");
const Listing = require("../model/listing");
const Review = require("../model/review");   


mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.error("Connection error:", err);
    });


const addReviewsToListing = async () => {
    try {
        const listing = await Listing.findById("6889bbe7f4ddafc92c438697");

        listing.reviews.push(
            '688d9ee68b945565b8bc1b7b',
            '688d9eff8b945565b8bc1b81',
            '688d9f1f8b945565b8bc1b86'
        );

        await listing.save();
        console.log("Reviews added to the listing successfully!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        mongoose.connection.close();
    }
};

addReviewsToListing();
