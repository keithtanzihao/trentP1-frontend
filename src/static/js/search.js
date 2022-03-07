import { createIcon } from "./map.js";

const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3pgoLOau6CF7wL39xF1rHkYgkIpI4jnG+BfZeeHuMa1k=";

export async function searchLocation(latLng, query) {
  let response = await axios.get(API_BASE_URL + "/autocomplete", {
    params: {
      ll: latLng,
      v: "20220301",
      query: query,
      radius: 10000,
      limit: 50,
      types: "place",
    },
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}

export async function getOneMapToken() {
  // Only solution i have in regards to generating token in client-side app
  let options = {
    url: "https://developers.onemap.sg/privateapi/auth/post/getToken",
    data: {
      email: "manfredzq@gmail.com",
      password: "nm3JtccpDA",
    },
    async: "true",
  };
  // Cheeky method to get post jquery post results.
  return $.post(options);
}

export async function getRoute(startLatLng, endLatLng) {
  let result = await getOneMapToken();
  console.log(new Date().toLocaleTimeString());
  console.log(new Date().toLocaleDateString());

  let options = {
    url: "https://developers.onemap.sg/privateapi/routingsvc/route",
    data: {
      start: startLatLng,
      end: endLatLng,
      routeType: "drive",
      token: result.access_token,
    },
    async: "true",
  };
  return $.get(options);
}

export function displayInstructions(routeInfo, startLayer) {
  let searchResultHead = document.querySelector("#search-results-head");
  searchResultHead.innerText = "Route Instructions";
  let startLocation = document.querySelector("#search-start").value;

  let instructNo = 1;
  for (let instruct of routeInfo.route_instructions) {
    if (instructNo === 1) {
      let latLngArr = instruct[3].split(",");
      createIcon(
        startLayer,
        [parseFloat(latLngArr[0]), parseFloat(latLngArr[1])],
        "./src/static/css/vendors/imgs/icons/start.svg",
        startLocation
      );
    }

    let routeInstruct = document.createElement("li");
    routeInstruct.className = "route-instruct";
    routeInstruct.innerText = `${instructNo}) ${instruct[9]}`;
    instructNo++;
    document.querySelector("#search-results-ctn").append(routeInstruct);
  }
}

