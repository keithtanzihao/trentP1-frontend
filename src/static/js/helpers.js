// Truncate listing description
export function truncateText(text, textLimit) {
  if (textLimit > text.length) {
    return text;
  }
  while (text.charAt(textLimit) != " ") {
    textLimit++;
  }
  return text.substring(0, textLimit) + "...";
}

// Check if listing description is has been truncated 
export function checkTruncate(text) {
  return text.substring(text.length - 3, text.length) === "..." ? true : false;
}

// Get store design colors, icons of each room type in respective object
export function jsonColumnBreakDown(
  roomType,
  listing,
  storeRoomTypeDesign,
  roomTypeDesignArray,
  map
) {
  let propertyType = listing[roomType];

  if (!(listing[roomType] in storeRoomTypeDesign)) {
    let colorObject = roomTypeDesignArray.pop();

    // Create markerClusterGroup for each room_type
    storeRoomTypeDesign[listing[roomType]] = {
      propertyType: propertyType,
      option: colorObject,
      group: L.layerGroup(),
      clusterGroup: L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          let clusterCount = cluster.getAllChildMarkers().length;
          return L.divIcon({
            html: `
            <div class="cluster-icon">
                <div class="cluster-img" style="background-color: ${colorObject.color}">${clusterCount}</div>
            </div>
            `,
          });
        },
      }),
    };
    storeRoomTypeDesign[listing[roomType]].clusterGroup.addTo(map);
  }
  return storeRoomTypeDesign[listing[roomType]];
}

// Store all amenities of each listing into an object
export function jsonAmenitiesBreakDown(
  roomType,
  listing,
  storeListingAmenities
) {
  let propertyType = listing[roomType].split('", "');

  for (let l of propertyType) {
    let amenity = l.replace(/[^a-zA-Z ]/g, "");
    !(amenity in storeListingAmenities)
      ? (storeListingAmenities[amenity] = 1)
      : (storeListingAmenities[amenity] += 1);
  }
  return storeListingAmenities;
}
