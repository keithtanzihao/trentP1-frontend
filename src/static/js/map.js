// import { amenitiesSelector } from "./amenities.js";
import * as helpers from "./helpers.js";
import * as info from "./info.js";

// Obtain access_token later
let access_token = "";
let attributionText =
  '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>';

// Dodgy as shit but yea for now
// let response = await axios.get("../data/listings.json");

// Reference from https://www.onemap.gov.sg/docs/maps/
let center = L.bounds([1.56073, 104.11475], [1.16, 103.502]).getCenter();
let map = L.map("map").setView([center.x, center.y], 13);

let basemap = L.tileLayer(
  "https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png",
  {
    detectRetina: true,
    maxZoom: 18,
    minZoom: 12,
    preferCanvas: true,
  }
);

map.setMaxBounds([
  [1.56073, 104.1147],
  [1.16, 103.502],
]);
basemap.addTo(map);

// Need to refactor in future
window.addEventListener("DOMContentLoaded", async function () {
  let respListing = await axios.get("../data/listings.json");
  
  // Array to store room_type colors / assign color to each room_type for checkRooms object
  let colorArray = ["#F51720", "#FC642D", "#00A699", "#767676"];
  let checkRooms = {};
  let checkAmenities = {};

  for (let t of respListing.data) {
    let lat = parseFloat(t["latitude"]);
    let lng = parseFloat(t["longitude"]);
    let tColor = helpers.jsonColumnBreakDown("room_type", t, checkRooms, colorArray);

    let options = {
      className: t.id,
      radius: 50,
      color: tColor,
    };
    let circleMarker = L.circle(L.latLng(lat, lng), options);

    circleMarker.addTo(map);
    circleMarker.bindPopup(`<b><a href=${t.listing_url}>${t.name}</a><b>`);
    circleMarker.on("click", function (event) {
      map.fitBounds([event.latlng]);
    });

    circleMarker.addEventListener("click", function() {
      info.createListingInfo(t);
    });
  }
});
