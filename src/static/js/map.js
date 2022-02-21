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

// Get room_type from dataset and put in object
function jsonColumnBreakDown(property, data, storeObj, colorArray) {
  let propertyType = data[property];
  if (!(data[property] in storeObj)) {
    storeObj[data[property]] = colorArray.pop();
  }
  return storeObj[data[property]];
}

function truncateText(text, textLimit) {
  if (textLimit > text.length) return text;
  while (text.charAt(textLimit) != " ") textLimit++;
  return text.substring(0, textLimit) + "...";
}

function checkTruncate(text) {
  return text.substring(text.length - 3, text.length) === "..." ? true : false;
}

// Opens modal over map to see more description
// function moreDescription() {

// }

window.addEventListener("DOMContentLoaded", async function () {
  let respListing = await axios.get("../data/listings.json");

  // Need to refactor in future

  // Array to store room_type colors / assign color to each room_type for checkRooms object
  let colorArray = ["#F51720", "#FC642D", "#00A699", "#767676"];
  let checkRooms = {};

  for (let t of respListing.data) {
    let lat = parseFloat(t["latitude"]);
    let lng = parseFloat(t["longitude"]);
    let tColor = jsonColumnBreakDown("room_type", t, checkRooms, colorArray);

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

    circleMarker.addEventListener("click", function () {
      // Ok shit this isnt good need to refactor later
      let listInfo = document.querySelector(".listing-focus");
      listInfo.textContent = "";

      // Name of listing
      let listHead = document.createElement("h1");
      listHead.innerText = t["name"];
      listInfo.appendChild(listHead);

      // Image of Room (only 1 lul)
      let listImg = document.createElement("img");
      listImg.className = "listing-img";
      listImg.src = t["picture_url"];
      listInfo.appendChild(listImg);

      // Host container
      let hostCtn = document.createElement("div");
      hostCtn.className = "listing-hostCtn";
      let hostHead = document.createElement("h3");
      hostHead.innerText = `${t["property_type"]} hosted by ${t["host_name"]}`;
      hostCtn.appendChild(hostHead);
      let hostImg = document.createElement("img");
      hostImg.src = t["host_picture_url"];
      hostCtn.appendChild(hostImg);

      listInfo.appendChild(hostCtn);

      // Description of listing, listing ctn
      let descCtn = document.createElement("div");
      descCtn.className = "listing-descCtn";
      // Add description
      let listDesc = document.createElement("p");
      let descText = truncateText(t["description"], 200);
      listDesc.innerHTML = descText;
      descCtn.appendChild(listDesc);

      // If description is truncated
      if (checkTruncate(descText)) {
        // Button to open more description
        let listDescBtn = document.createElement("button");
        listDescBtn.innerText = "See More >";
        descCtn.appendChild(listDescBtn);
        listInfo.appendChild(descCtn);

        document
          .querySelector(".listing-descCtn > button")
          .addEventListener("click", function (event) {
            document.querySelector(".modal").className = "modal active";
            document.querySelector(".modal-box").innerHTML += t["description"];
          });
      } else {
        listInfo.appendChild(descCtn);
      }
    });
  }
  console.log("window loaded");
  // Allows user to open modal if button click
  let modalBox = document.querySelector(".modal-cb");
  console.log(modalBox);

  modalBox.addEventListener("click", (event) => {
    // if (event.target.checked) {
    //   console.log("yes");
    //   document.querySelector("#modal").classList.remove("active");
    //   document.querySelector("#modal").classList.add("hidden");
    // }
    alert("testing here");
  //   document.querySelector(".modal").classList.remove("active");
  //   document.querySelector(".modal").classList.add("hidden");
  });
});
