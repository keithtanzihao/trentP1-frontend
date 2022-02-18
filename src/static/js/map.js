let attributionText =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>';

let access_token =
  "pk.eyJ1Ijoia2VpdGh0aGV0YW4iLCJhIjoiY2t6aHM4d3YyMGZhajJvcGExMHpuY3IyeCJ9.Fu1vfDSJW62iLCKg5a-WVg";

let L = require('leaflet');
let singapore = [1.3521, 103.8198];
let map = L.map('map').setView(singapore, 11.5);

let renderedMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution: attributionText,
    id: "mapbox/streets-v11",
    accessToken: access_token,
  }
).addTo(map);


