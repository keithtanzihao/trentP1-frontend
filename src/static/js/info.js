import * as helpers from "./helpers.js";
import * as amen from "./amenities.js";

// Ok why the heck did i do this when i could just write all the html
// elements into sidebar.... bruh

export function createListingInfo(data, reviewResData) {
  let listInfo = document.querySelector(".listing-focus");
  listInfo.textContent = "";

  // div for listing head and img
  let headCtn = document.createElement("div");
  headCtn.className = "listing-head";
  listInfo.append(headCtn);

  // Name of listing
  let listHead = document.createElement("h1");
  listHead.innerText = data["name"];
  headCtn.appendChild(listHead);

  // Image of Room (only 1 lul)
  let listImg = document.createElement("img");
  listImg.src = data["picture_url"];
  headCtn.appendChild(listImg);

  // Host container
  let hostCtn = document.createElement("div");
  hostCtn.className = "listing-host-ctn";
  let hostHead = document.createElement("h3");
  hostHead.innerText = `${data["property_type"]} hosted by ${data["host_name"]}`;
  hostCtn.appendChild(hostHead);
  let hostImg = document.createElement("img");
  hostImg.src = data["host_picture_url"];
  hostCtn.appendChild(hostImg);

  listInfo.appendChild(hostCtn);

  // Description of listing, listing ctn
  let descCtn = document.createElement("div");
  descCtn.className = "listing-desc-ctn";
  // Add description
  let listDesc = document.createElement("p");
  let descText = helpers.truncateText(data["description"], 200);
  listDesc.innerHTML = descText;
  descCtn.appendChild(listDesc);

  // Allows user to open modal if button click
  let modalBox = document.querySelector(".modal-btn");

  // If description is truncated
  if (helpers.checkTruncate(descText)) {
    // Button to open more description
    let listDescBtn = document.createElement("button");
    listDescBtn.className = "listing-desc-btn";
    listDescBtn.innerText = "See More >";
    descCtn.appendChild(listDescBtn);
    listInfo.appendChild(descCtn);

    // function to show description

    const showDesc = function () {
      console.log(data["description"]);

      document.querySelector(".modal-box-head > h1").innerText =
        "About this space";
      document.querySelector("#modal").className = "active";
      document.querySelector(".modal-box-text").innerHTML +=
        data["description"];
      // Remove eventListener once u click "See More >"
      document
        .querySelector(".listing-desc-btn")
        .removeEventListener("click", showDesc);
    };

    // function to show description
    document
      .querySelector(".listing-desc-btn")
      .addEventListener("click", showDesc);

    // Add eventListener to "See More >" once again
    modalBox.addEventListener("click", (event) => {
      document.querySelector("#modal").classList.remove("active");
      document.querySelector("#modal").classList.add("hidden");
      document.querySelector(".modal-box-head > h1").innerText = "";
      document.querySelector(".modal-box-text").innerHTML = "";

      document
        .querySelector(".listing-desc-btn")
        .addEventListener("click", showDesc);
    });
  } else {
    listInfo.appendChild(descCtn);
  }

  // Listings number of guess/rooms/bathrooms
  let listSize = document.createElement("div");
  listSize.className = "listing-size";
  listInfo.appendChild(listSize);

  let sizeHead = document.createElement("h3");
  sizeHead.innerText = "Number of Guest | Rooms | Bathrooms";
  listSize.appendChild(sizeHead);

  let sizeIconCtn = document.createElement("div");
  sizeIconCtn.className = "listing-icon-ctn";
  listSize.appendChild(sizeIconCtn);

  let sizeMan = document.createElement("img");
  sizeMan.className = "listing-size-icon";
  sizeMan.src = "../static/css/vendors/imgs/icons/man.svg";
  let sizeManNo = document.createElement("span");
  sizeManNo.innerText = data["accommodates"] || 0;
  sizeIconCtn.appendChild(sizeMan);
  sizeIconCtn.appendChild(sizeManNo);

  let sizeBed = document.createElement("img");
  sizeBed.className = "listing-size-icon";
  sizeBed.src = "../static/css/vendors/imgs/icons/bed.svg";
  let sizeBedNo = document.createElement("span");
  sizeBedNo.innerText = data["beds"] || 0;
  sizeIconCtn.appendChild(sizeBed);
  sizeIconCtn.appendChild(sizeBedNo);

  let sizeBath = document.createElement("img");
  sizeBath.className = "listing-size-icon";
  sizeBath.src = "../static/css/vendors/imgs/icons/bath.svg";
  let sizeBathNo = document.createElement("span");
  sizeBathNo.innerText = data["bathrooms_text"] || 0;
  sizeIconCtn.appendChild(sizeBath);
  sizeIconCtn.appendChild(sizeBathNo);

  // What this place offers
  let listAmen = document.createElement("div");
  listAmen.className = "listing-amenities";
  listInfo.appendChild(listAmen);

  let listAmenHead = document.createElement("h3");
  listAmenHead.innerText = "What this place offers";
  listAmen.appendChild(listAmenHead);

  let listAmenCtn = document.createElement("div");
  listAmenCtn.className = "listing-amenities-ctn";
  listAmen.appendChild(listAmenCtn);

  let checkAmenities = helpers.jsonAmenitiesBreakDown("amenities", data, {});
  amen.addAmenityIcon(checkAmenities, listAmenCtn, "", true);

  if (Object.keys(checkAmenities).length > 8) {
    // Button to open more description
    let listAmenBtn = document.createElement("button");
    listAmenBtn.className = "listing-amenities-btn";

    listAmenBtn.innerText = "See More >";
    listAmen.appendChild(listAmenBtn);
    listInfo.appendChild(listAmen);

    // function to show description
    const showAmen = function () {
      document.querySelector("#modal").className = "active";
      document.querySelector(".modal-box-head > h1").innerText =
        "All Amenities";
      document.querySelector("#modal").className = "active";
      amen.addAmenityIcon(
        checkAmenities,
        document.querySelector(".modal-box-text"),
        "modal-box-amen",
        false
      );

      // Remove eventListener once u click "See More >"
      document
        .querySelector(".listing-amenities-btn")
        .removeEventListener("click", showAmen);
    };

    // function to show description
    document
      .querySelector(".listing-amenities-btn")
      .addEventListener("click", showAmen);

    // Add eventListener to "See More >" once again
    modalBox.addEventListener("click", (event) => {
      document.querySelector("#modal").classList.remove("active");
      document.querySelector("#modal").classList.add("hidden");
      document.querySelector(".modal-box-head > h1").innerText = "";
      document.querySelector(".modal-box-text").innerHTML = "";

      document
        .querySelector(".listing-amenities-btn")
        .addEventListener("click", showAmen);
    });
  }

  // Adding reviews
  let listReviews = document.createElement("div");
  listReviews.className = "listing-reviews";
  listInfo.appendChild(listReviews);

  let listReviewHeadCtn = document.createElement("div");
  listReviewHeadCtn.className = "listing-reviews-head";
  listReviews.appendChild(listReviewHeadCtn);
  let listReviewImg = document.createElement("img");
  listReviewHeadCtn.appendChild(listReviewImg);
  let listReviewHead = document.createElement("h3");
  listReviewHeadCtn.appendChild(listReviewHead);

  let listReviewsCtn = document.createElement("div");
  listReviewsCtn.className = "listing-reviews-ctn";
  listReviews.appendChild(listReviewsCtn);

  if (data["number_of_reviews"] === "0") {
    listReviewHead.innerText = "No reviews (yet)";
    listReviewImg.src = "../static/css/vendors/imgs/icons/starNon.svg";
  } else {
    listReviewHead.innerText = `${data["review_scores_rating"]} | ${data["number_of_reviews"]} reviews`;
    listReviewImg.src = "../static/css/vendors/imgs/icons/starRed.svg";

    for (let prop of Object.keys(data)) {
      if (
        prop.substring(0, 14) === "review_scores_" &&
        prop.substring(14) !== "rating"
      ) {
        let listReviewItem = document.createElement("div");
        listReviewItem.className = "listing-reviews-item";
        listReviewsCtn.appendChild(listReviewItem);

        let listReviewTitle = document.createElement("span");
        listReviewItem.appendChild(listReviewTitle);
        listReviewTitle.innerText = `${prop
          .charAt(14)
          .toUpperCase()}${prop.substring(15)}`;

        let listScoreCtn = document.createElement("div");
        listScoreCtn.className = "listing-score-ctn";
        listReviewItem.appendChild(listScoreCtn);

        let listBarCtn = document.createElement("div");
        listBarCtn.className = "listing-bar-ctn";
        listScoreCtn.appendChild(listBarCtn);

        let listBarValue = document.createElement("div");
        listBarValue.className = "listing-bar-val";
        listBarValue.style = `--score: ${data[prop]}`;
        listBarCtn.appendChild(listBarValue);

        let listReviewScore = document.createElement("span");
        listScoreCtn.appendChild(listReviewScore);
        listReviewScore.innerText = `${data[prop]}`;
      }
    }

    let listingReviewBtn = document.createElement("button");
    listingReviewBtn.className = "listing-review-btn";

    listingReviewBtn.innerText = "See Reviews >";
    listReviews.appendChild(listingReviewBtn);

    const showReviews = async function () {
      document.querySelector("#modal").className = "active";
      document.querySelector(".modal-box-head > h1").innerText = "All Reviews";

      // Array.prototype.filter()
      const listOfReviews = reviewResData.filter(
        (review) => review["listing_id"] === data["id"]
      );

      for (let review of listOfReviews) {
        let reviewItem = document.createElement("div");
        reviewItem.className = "modal-box-text-item modal-box-review";

        let reviewHead = document.createElement("h4");
        reviewItem.appendChild(reviewHead);

        let reviewCom = document.createElement("p");
        reviewItem.appendChild(reviewCom);

        document.querySelector(".modal-box-text").appendChild(reviewItem);

        reviewHead.innerText = review["reviewer_name"];
        reviewCom.innerText = review["comments"];

        document
          .querySelector(".listing-review-btn")
          .removeEventListener("click", showReviews);
      }
    };

    // function to show description
    document
      .querySelector(".listing-review-btn")
      .addEventListener("click", showReviews);

    // Add eventListener to "See More >" once again
    modalBox.addEventListener("click", (event) => {
      document.querySelector("#modal").classList.remove("active");
      document.querySelector("#modal").classList.add("hidden");
      document.querySelector(".modal-box-head > h1").innerText = "";
      document.querySelector(".modal-box-text").innerHTML = "";

      document
        .querySelector(".listing-review-btn")
        .addEventListener("click", showReviews);
    });
  }
  return data;
}
