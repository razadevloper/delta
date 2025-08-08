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
        const { location } = req.body.listing;

        // yeh line geocoding ke liye hai:
        const geometry = await geocodeLocation(location);  // yeh tumhare utils se data laata hai
        console.log(geometry);

        // ab tumhare existing code me geometry assign kar do:
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        newListing.geometry = geometry;  // yeh line add karo

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