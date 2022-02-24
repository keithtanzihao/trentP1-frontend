import * as helpers from "./helpers.js";
import * as amen from "./amenities.js";

export function createListingInfo(data) {
  // Ok shit this isnt good need to refactor later
  let listInfo = document.querySelector(".listing-focus");
  listInfo.textContent = "";

  // Name of listing
  let listHead = document.createElement("h1");
  listHead.innerText = data["name"];
  listInfo.appendChild(listHead);

  // Image of Room (only 1 lul)
  let listImg = document.createElement("img");
  listImg.className = "listing-img";
  listImg.src = data["picture_url"];
  listInfo.appendChild(listImg);

  // Host container
  let hostCtn = document.createElement("div");
  hostCtn.className = "listing-hostCtn";
  let hostHead = document.createElement("h3");
  hostHead.innerText = `${data["property_type"]} hosted by ${data["host_name"]}`;
  hostCtn.appendChild(hostHead);
  let hostImg = document.createElement("img");
  hostImg.src = data["host_picture_url"];
  hostCtn.appendChild(hostImg);

  listInfo.appendChild(hostCtn);

  // Description of listing, listing ctn
  let descCtn = document.createElement("div");
  descCtn.className = "listing-descCtn";
  // Add description
  let listDesc = document.createElement("p");
  let descText = helpers.truncateText(data["description"], 200);
  listDesc.innerHTML = descText;
  descCtn.appendChild(listDesc);

  // If description is truncated
  if (helpers.checkTruncate(descText)) {
    // Button to open more description
    let listDescBtn = document.createElement("button");
    listDescBtn.className = "listing-descBtn";
    listDescBtn.innerText = "See More >";
    descCtn.appendChild(listDescBtn);
    listInfo.appendChild(descCtn);

    // function to show description
    const showDesc = function () {
      document.querySelector("#modal").className = "active";
      document.querySelector(".modal-box-text").innerHTML += data["description"];
      // Remove eventListener once u click "See More >"
      document
        .querySelector(".listing-descBtn")
        .removeEventListener("click", showDesc);
    };

    // function to show description
    document
      .querySelector(".listing-descBtn")
      .addEventListener("click", showDesc);

    // Allows user to open modal if button click
    let modalBox = document.querySelector(".modal-btn");
    console.log(modalBox);

    // Add eventListener to "See More >" once again
    modalBox.addEventListener("click", (event) => {
      document.querySelector("#modal").classList.remove("active");
      document.querySelector("#modal").classList.add("hidden");
      document
        .querySelector(".listing-descBtn")
        .addEventListener("click", showDesc);
    });
  } else {
    listInfo.appendChild(descCtn);
  }

  // Listings number of guess/rooms/bathrooms
  let listSize = document.createElement("div");
  listSize.className = "listing-Size";
  listInfo.appendChild(listSize);

  let sizeHead = document.createElement("h3");
  sizeHead.innerText = "Number of Guest | Rooms | Bathrooms"
  listSize.appendChild(sizeHead);

  let sizeIconCtn = document.createElement("div");
  sizeIconCtn.className = "listing-IconCtn";
  listSize.appendChild(sizeIconCtn);

  let sizeMan = document.createElement("img");
  sizeMan.className = "listing-SizeIcon"
  sizeMan.src = "../css/vendors/imgs/icons/man.svg";
  let sizeManNo = document.createElement("span");
  sizeManNo.innerText = data["accommodates"] || 0;
  sizeIconCtn.appendChild(sizeMan);
  sizeIconCtn.appendChild(sizeManNo);


  let sizeBed = document.createElement("img");
  sizeBed.className = "listing-SizeIcon"
  sizeBed.src = "../css/vendors/imgs/icons/bed.svg";
  let sizeBedNo = document.createElement("span");
  sizeBedNo.innerText = data["beds"] || 0;
  sizeIconCtn.appendChild(sizeBed);
  sizeIconCtn.appendChild(sizeBedNo);


  let sizeBath = document.createElement("img");
  sizeBath.className = "listing-SizeIcon"
  sizeBath.src = "../css/vendors/imgs/icons/bath.svg";
  let sizeBathNo = document.createElement("span");
  sizeBathNo.innerText = data["bathrooms_text"] || 0;
  sizeIconCtn.appendChild(sizeBath);
  sizeIconCtn.appendChild(sizeBathNo);

  
  // What this place offers
  let listAmen = document.createElement("div");
  listAmen.className = "listing-Amen";
  listInfo.appendChild(listAmen);


  let listAmenHead = document.createElement("h3");
  listAmenHead.innerText = "What this place offers";
  listAmen.appendChild(listAmenHead);


  let listAmenCtn = document.createElement("div");
  listAmenCtn.className = "listing-AmenCtn";
  listAmen.appendChild(listAmenCtn);


  let listAmenItem = document.createElement("div");
  let checkAmenities = helpers.jsonAmenitiesBreakDown("amenities", data, {});
  amen.addAmenityIcon(checkAmenities, listAmenCtn);

};
