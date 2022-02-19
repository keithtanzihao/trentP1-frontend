// Obtain access_token later
let access_token = "";
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

function jsonColumnBreakDown(property, data, storeObj, colorArray) {
  let propertyType = data[property];
  if (!(data[property] in storeObj)) {
    storeObj[data[property]] = colorArray.pop();
  }
  return storeObj[data[property]];
}

window.addEventListener("DOMContentLoaded", async function () {
  let response = await axios.get("../data/listings.json");

  // Need to refactor in future
  let colorArray = ["#F51720", "#FC642D", "#00A699", "#767676"];
  let checkRooms = {};

  for (let t of response.data) {
    let lat = parseFloat(t["latitude"]);
    let lng = parseFloat(t["longitude"]);

    tColor = jsonColumnBreakDown("room_type", t, checkRooms, colorArray);

    let options = {
      radius: 10,
      color: tColor,
    };
    L.circle(L.latLng(lat, lng), options).addTo(map);
  }
  console.log(checkRooms);
});
