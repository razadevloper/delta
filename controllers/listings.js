const { escapeRegExpChars } = require("ejs/lib/utils");
const Listing = require("../model/listing");
const geocodeLocation = require("../utlls/geocode");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        });

    if (!listing) {
        req.flash("error", "Listing Does'nt Exists please Explore More");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing, mapToken: process.env.MAP_TOKEN });
};


module.exports.creatListing = async (req, res) => {
    try {
        const { location, category} = req.body.listing;
        if(category){
            req.body.listing.category = category.trim().toLowerCase();
        }
        const geometry = await geocodeLocation(location); 
        console.log(geometry);
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        newListing.geometry = geometry;
        await newListing.save();
        req.flash("success", "Listing Added Successfully");
        res.redirect("/listings");
    } catch (err) {
        console.error("Error:", err.message);
        req.flash("error", "Location not found.");
        res.redirect("/listings/new");
    }
};


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Does'nt Exists");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if( typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};


module.exports.getListingsByCategory = async (req, res) => {
    const categoryName = req.params.category.toLowerCase();
    let listings = await Listing.find({ category: categoryName });

    if (listings.length === 0) {
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    }
    res.render("listings/index", { allListings: listings });
};


module.exports.searchListing = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query || query.trim() === "") {
            req.flash("error", "Please enter a search term");
            return res.redirect("/listings");
        }

        function escapeRegex(text){
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        let searchQuery = escapeRegex(query);

        let listings = await Listing.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { category: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } }
            ]
        });

        if (listings.length > 0) {
            res.render("listings/index", { allListings: listings });
        } else {
            req.flash("error", "No Data Found");
            res.redirect("/listings");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

