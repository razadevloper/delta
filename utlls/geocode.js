const axios = require("axios");

const geocodeLocation = async (location) => {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: location, format: "json", limit: 1 },
        headers: { "User-Agent": "wanderlust-app" }
    });

    if (!response.data || response.data.length === 0) {
        throw new Error("No results found for location.");
    }

    const { lat, lon } = response.data[0];

    // ✅ Return as GeoJSON format
    return {
        type: "Point",
        coordinates: [parseFloat(lon), parseFloat(lat)]
    };
};

module.exports = geocodeLocation;
