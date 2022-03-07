import * as helpers from "./helpers.js";
import * as info from "./info.js";
import { searchLocation, getRoute, displayInstructions } from "./search.js";

async function main() {
  function initMap() {
    let attributionText =
      '<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>';

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
    return map;
  }

  function init() {
    let map = initMap();
    let polyline;

    let startLayer = L.layerGroup();
    let searchLayer = L.layerGroup();
    startLayer.addTo(map);
    searchLayer.addTo(map);

    window.addEventListener("DOMContentLoaded", async function () {
      const listingResponse = await axios.get("./src/static/data/listings.json");
      const reviewResponse = await axios.get("./src/static/data/reviews.json");

      let storeRoomTypeDesign = {};
      let roomTypeDesignArray = [
        {
          color: "#F51720",
          iconColor: "./src/static/css/vendors/imgs/icons/hotel.svg",
          icon: "./src/static/css/vendors/imgs/icons/hotelIcon.svg",
        },
        {
          color: "#FC642D",
          iconColor: "./src/static/css/vendors/imgs/icons/share.svg",
          icon: "./src/static/css/vendors/imgs/icons/shareIcon.svg",
        },
        {
          color: "#00A699",
          iconColor: "./src/static/css/vendors/imgs/icons/entire.svg",
          icon: "./src/static/css/vendors/imgs/icons/entireIcon.svg",
        },
        {
          color: "#767676",
          iconColor: "./src/static/css/vendors/imgs/icons/privateR.svg",
          icon: "./src/static/css/vendors/imgs/icons/privateRIcon.svg",
        },
      ];

      for (let listing of listingResponse.data) {
        let lat = parseFloat(listing["latitude"]);
        let lng = parseFloat(listing["longitude"]);

        let indivListingRoomType = helpers.jsonColumnBreakDown(
          "room_type",
          listing,
          storeRoomTypeDesign,
          roomTypeDesignArray,
          map
        );

        let propertyIcon = L.icon({
          iconUrl: indivListingRoomType.option.icon,
          iconSize: [35, 35],
        });

        let circleMarker = L.marker(L.latLng(lat, lng), { icon: propertyIcon });

        circleMarker.bindPopup(
          `<b><a href=${listing.listing_url}>${listing.name}</a><b><br><span>${listing.latitude} ${listing.longitude}</span>`
        );
        // Zoom camera to marker
        circleMarker.on("click", function (event) {
          map.fitBounds([event.latlng]);
        });

        // Set value of search starting position tag to latitude,longitude
        circleMarker.addEventListener("click", function () {
          info.createListingInfo(listing, reviewResponse.data);
          document.querySelector("#search-start").value = listing.name;
        });

        // Add marker to layer group && add that to map
        indivListingRoomType.clusterGroup.addLayer(circleMarker);
        indivListingRoomType.clusterGroup.addTo(map);
      }

      // Adding overlay to toggle on || off
      let overlays = {};
      for (let roomType of Object.keys(storeRoomTypeDesign)) {
        overlays[storeRoomTypeDesign[roomType].propertyType] =
          storeRoomTypeDesign[roomType].clusterGroup;
      }
      L.control.layers({}, overlays).addTo(map);

      // Add displayLocation
      displayLocation();
      // Add eventlisteners to validate input
      validateInputs(listingResponse);
    });

    // Overly clunky but gets the job done i guess.
    function displayLocation() {
      let searchStartTimer, searchEndTimer;
      let searchStart = document.querySelector("#search-start");
      let searchResultCtn = document.querySelector("#search-results-ctn");
      let searchResultHead = document.querySelector("#search-results-head");

      // Reset error messages
      let errorStartSpan = document.querySelector("#search-start-error");
      let errorEndSpan = document.querySelector("#search-end-error");

      searchStart.addEventListener("input", function () {
        clearTimeout(searchStartTimer);
        searchStartTimer = setTimeout(async function () {
          searchResultCtn.innerHTML = "";
          errorStartSpan.innerText = "";
          startLayer.clearLayers();
          searchLayer.clearLayers();
          if (polyline !== undefined) {
            map.removeLayer(polyline);
          }
          searchResultHead.innerText = "";
        });
      });

      let searchEnd = document.querySelector("#search-end");
      searchEnd.innerText = "false";

      searchEnd.addEventListener("input", function () {
        clearTimeout(searchEndTimer);
        searchEndTimer = setTimeout(async function () {
          searchResultCtn.innerHTML = "";
          errorEndSpan.innerText = "";
          startLayer.clearLayers();
          searchLayer.clearLayers();
          if (polyline !== undefined) {
            map.removeLayer(polyline);
          }

          if (searchEnd.value.length === 0) {
            searchResultHead.innerText = "";
          } else {
            searchResultHead.innerText = "Search Results";
          }

          let center = map.getBounds().getCenter();
          let searchLocationArray = await searchLocation(
            `${center.lat},${center.lng}`,
            searchEnd.value
          );

          for (let indivLocation of searchLocationArray.results) {
            let latLng = [
              indivLocation.place.geocodes.main.latitude,
              indivLocation.place.geocodes.main.longitude,
            ];

            let marker = createIcon(
              searchLayer,
              latLng,
              "./src/static/css/vendors/imgs/icons/destination.svg",
              `<h5>${indivLocation.text.primary}</h5>`
            );

            let resultElement = document.createElement("li");
            resultElement.className = "search-results-item";

            let resultPrimary = document.createElement("h4");
            let resultSecondary = document.createElement("span");
            resultPrimary.innerText = indivLocation.text.primary;
            resultSecondary.innerText = indivLocation.text.secondary;
            resultElement.appendChild(resultPrimary);
            resultElement.appendChild(resultSecondary);

            resultElement.addEventListener("click", async function () {
              map.flyTo(latLng, 16);
              marker.openPopup();
              searchResultHead.innerText = "";

              searchEnd.value = indivLocation.place.name;
              searchResultCtn.innerHTML = "";
            });
            searchResultCtn.appendChild(resultElement);
          }
        }, 500);
      });
    }

    function validateInputs(listingResponse) {
      document
        .querySelector("#search-btn")
        .addEventListener("click", async function () {
          let listingNotProvided = true;
          let listingNotFound = true;
          let destinationNotProvided = true;
          let destinationNotFound = true;

          let listingLatLng = "",
            destinationLatLng = "";

          // Have not added a search function for listing data
          let startSearchVal = document.querySelector("#search-start").value;
          if (startSearchVal.length > 0) {
            listingNotProvided = false;
          }
          for (let listing of listingResponse.data) {
            if (listing.name === startSearchVal) {
              listingLatLng = `${listing.latitude},${listing.longitude}`;
              listingNotFound = false;
            }
          }

          let endSearchVal = document.querySelector("#search-end").value;
          if (endSearchVal.length > 0) {
            destinationNotProvided = false;

            let center = map.getBounds().getCenter();
            let searchLocationArray = await searchLocation(
              `${center.lat},${center.lng}`,
              endSearchVal
            );

            for (let indivLocation of searchLocationArray.results) {
              if (indivLocation.place.name === endSearchVal) {
                destinationLatLng = `${indivLocation.place.geocodes.main.latitude},${indivLocation.place.geocodes.main.longitude}`;
                destinationNotFound = false;
              }
            }
          }

          if (
            listingNotProvided ||
            listingNotFound ||
            destinationNotProvided ||
            destinationNotFound
          ) {
            let errorStartSpan = document.querySelector("#search-start-error");
            if (listingNotProvided) {
              errorStartSpan.innerText = "Please provide name of a listing";
            } else if (listingNotFound) {
              errorStartSpan.innerText =
                "Listing not found. Enter another query";
            }

            let errorEndSpan = document.querySelector("#search-end-error");
            if (destinationNotProvided) {
              errorEndSpan.innerText = "Please provide name of destination";
            } else if (destinationNotFound) {
              errorEndSpan.innerText =
                "Destination not found. Enter another query";
            }
          } else {
            let routeResponse = await getRoute(
              listingLatLng,
              destinationLatLng
            );
            displayInstructions(routeResponse, startLayer);
            polyline = L.Polyline.fromEncoded(routeResponse.route_geometry, {
              weight: 6,
            });
            polyline.addTo(map);
          }
        });
    }
  }
  init();
}
main();

export function createIcon(layer, latLng, iconPath, msg) {
  let locationIcon = L.icon({
    iconUrl: iconPath,
    iconSize: [50, 50],
    popupAnchor: [0, -20],
  });

  let marker = L.marker(latLng, { icon: locationIcon });
  marker.bindPopup(`<h5>${msg}</h5>`);
  marker.addTo(layer);
  return marker;
}
