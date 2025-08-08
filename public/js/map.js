document.addEventListener("DOMContentLoaded", function () {
  const mapElement = document.getElementById("map");
  const rawCoords = mapElement.dataset.coordinates;
  const city = mapElement.dataset.city;

  const coordinates = JSON.parse(rawCoords); // [lng, lat]

  const map = L.map("map").setView([coordinates[1], coordinates[0]], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    // shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  });

  const marker = L.marker([coordinates[1], coordinates[0]], {icon: redIcon}).addTo(map);
    //   marker.bindPopup(city).openPopup();
  marker.bindTooltip(`<h5> ${city} </h5> Exact location will be provided after booking`, {
    permanent: false,
    direction: "top"
  });
});
