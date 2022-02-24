export function truncateText(text, textLimit) {
  if (textLimit > text.length) return text;
  while (text.charAt(textLimit) != " ") textLimit++;
  return text.substring(0, textLimit) + "...";
}

export function checkTruncate(text) {
  return text.substring(text.length - 3, text.length) === "..." ? true : false;
}

// Get room_type from dataset and put in object
export function jsonColumnBreakDown(property, data, storeObj, colorArray) {
  let propertyType = data[property];
  if (!(data[property] in storeObj)) {
    storeObj[data[property]] = colorArray.pop();
  }
  return storeObj[data[property]];
}

export function jsonAmenitiesBreakDown(property, data, storeObj) {
  let propertyType = data[property].split("\", \"");

  for (let l of propertyType) {
    let amenity = l.replace(/[^a-zA-Z ]/g, "");
    (!(amenity in storeObj)) ? storeObj[amenity] = 1 : storeObj[amenity] += 1;
  }
  var size = Object.keys(storeObj).length;
  return storeObj;
}

// export function amenitiesSelector(amenity) {
//   let amenKey = Object.keys(amenity);
//   let arrayKey = [];

//   for (let key of amenKey) {
//     if ( !(key.includes("tv") || key.includes("linen")) ) {
//       arrayKey.push(key);
//       delete amenity[key];
//     } 
//   }
//   return arrayKey;
// }

