
// El No Sabe Pepelaugh 
export function addAmenityIcon(amenity, parentDiv) {
  console.log(parentDiv);
  let amenKey = Object.keys(amenity);
  let limit = 0;

  for (let word of amenKey) {
    if (limit >= 8) break;
  
    let amen = word;
    word = word.toLowerCase();

    let amenItem = document.createElement("div");
    amenItem.className = `${parentDiv.className}-Item`;
    let amenImg = document.createElement("img");
    let amenSpan = document.createElement("span");
    amenSpan.innerText = amen;

    parentDiv.appendChild(amenItem);
    amenItem.appendChild(amenImg);
    amenItem.appendChild(amenSpan);

    if (word.includes("tv")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/tv.svg"
    } else if (word.includes("linen") || word.includes("gym") || word.includes("fitness")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/linen.svg"
    } else if (word.includes("air cond") || word.includes("window ac")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/aircon.svg"
    } else if (word.includes("bbq") || word.includes("barbecue") || word.includes("outdoor")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bbq.svg"
    } else if (word.includes("baby") || word.includes("child") || word.includes("crib")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/baby.svg"
    } else if (word.includes("backyard") || word.includes("lake") || word.includes("net") || word.includes("outlet") || word.includes("balcony") || word.includes("trash") || word.includes("waterfront")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/backyard.svg"
    } else if (word.includes("baking") || word.includes("cooking") || word.includes("dish") || word.includes("glasses")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/kitchen.svg"
    } else if (word.includes("oven") || word.includes("stove") || word.includes("fri") || word.includes("freezer") || word.includes("kitchen") || word.includes("microwave") || word.includes("washer") || word.includes("rice") || word.includes("toaster")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/oven.svg"
    } else if (word.includes("bathtub")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bath.svg"
    } else if (word.includes("beach")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/beach.svg"
    } else if (word.includes("bidet") || word.includes("toilet")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/toilet.svg"
    } else if (word.includes("bike")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bike.svg"
    } else if (word.includes("bluetooth")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bluetooth.svg"
    } else if (word.includes("game") || word.includes("pool") || word.includes("player")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/card.svg"
    } else if (word.includes("boat")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/boat.svg"
    } else if (word.includes("soap") ||  word.includes("conditioner") || word.includes("shampoo") || word.includes("essential") || word.includes("washer") || word.includes("sauna") || word.includes("shower")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/soap.svg"
    } else if (word.includes("clothing") || word.includes("hangers") || word.includes("laund")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/clothing.svg"
    } else if (word.includes("bread") || word.includes("breakfast")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bread.svg"
    } else if (word.includes("staff") || word.includes("host") || word.includes("house")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/man.svg"
    } else if (word.includes("alarm")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/alarm.svg"
    } else if (word.includes("fan") || word.includes("portable fan")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/fan.svg"
    } else if (word.includes("heat") || word.includes("portable heat") || word.includes("fire") || word.includes("hot") || word.includes("iron")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/heat.svg"
    } else if (word.includes("table") || word.includes("chair") || word.includes("workspace")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/table.svg"
    } else if (word.includes("clean")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/clean.svg"
    } else if (word.includes("coffee") || word.includes("nespresso")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/coffee.svg"
    } else if (word.includes("parking") || word.includes("car") || word.includes("garage")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/parking.svg"
    } else if (word.includes("dryer")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/dryer.svg"
    } else if (word.includes("charger") || word.includes("ethernet") || word.includes("wifi")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/charge.svg"
    } else if (word.includes("pillow")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bed.svg"
    } else if (word.includes("first")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/first.svg"
    } else if (word.includes("key") || word.includes("lock") || word.includes("safe") || word.includes("security")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/key.svg"
    } else if (word.includes("long")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/long.svg"
    } else if (word.includes("luggage")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/bag.svg"
    } else if (word.includes("private") || word.includes("shades") || word.includes("shared") || word.includes("home") || word.includes("skiin") || word.includes("guards") || word.includes("elevator")) {
      amenImg.src = "../css/vendors/imgs/icons/amen/private.svg"
    } else if (word.includes("sound") || word.includes("piano"))  {
      amenImg.src = "../css/vendors/imgs/icons/amen/sound.svg"
    }
    limit++;
  }
}

// export function amenitiesSelector(amenity) {
//   let amenKey = Object.keys(amenity);
//   amenKey = amenKey.filter(function (word) {
//     word = word.toLowerCase();
//     if (
      
//       !(
//         word.includes("tv") ||

//         (word.includes("linen") || word.includes("gym") || word.includes("fitness"))||

//         (word.includes("air cond") || word.includes("window ac"))||
        
//         (word.includes("bbq") || word.includes("barbecue") || word.includes("outdoor"))

//         (word.includes("baby") || word.includes("child") || word.includes("crib")) ||

//         (word.includes("backyard") || word.includes("lake") || word.includes("net") || word.includes("outlet") || word.includes("balcony") || word.includes("trash") || word.includes("waterfront")) ||

//         // Kitchen stuff
//         (word.includes("baking") || word.includes("cooking") || word.includes("dish") || word.includes("glasses")) ||
        
//         (word.includes("oven") || word.includes("stove") || word.includes("fri") || word.includes("freezer") || word.includes("kitchen") || word.includes("microwave") || word.includes("washer") || word.includes("rice") || word.includes("toaster")) ||


//         word.includes("bathtub") ||

//         word.includes("beach") ||

//         // Toilet stuff
//         (word.includes("bidet") || word.includes("toilet")) ||

//         word.includes("bike") ||

//         word.includes("bluetooth") ||

//         // card.svg
//         (word.includes("game") || word.includes("pool") || word.includes("player")) ||

//         word.includes("boat") ||

//         (word.includes("soap") ||  word.includes("conditioner") || word.includes("shampoo") || word.includes("essential") || word.includes("washer") || word.includes("sauna") || word.includes("shower")) ||

//         // bread.svg
//         (word.includes("clothing") || word.includes("hangers") || word.includes("laund")) ||

//         (word.includes("bread") || word.includes("breakfast")) ||

//         (word.includes("staff") || word.includes("host") || word.includes("house")) ||

//         word.includes("alarm") ||

//         (word.includes("fan") || word.includes("portable fan")) ||

//         (word.includes("heat") || word.includes("portable heat") || word.includes("fire") || word.includes("hot") || word.includes("iron")) ||

//         (word.includes("table") || word.includes("chair")) ||
//         word.includes("clean") ||

//         (word.includes("coffee") || word.includes("nespresso")) ||

//         (word.includes("parking") || word.includes("car") || word.includes("garage")) || 

//         word.includes("workspace") ||

//         word.includes("dryer") ||

//         (word.includes("charger") || word.includes("ethernet") || word.includes("wifi")) ||

//         word.includes("pillow") ||

//         word.includes("first") ||

//         (word.includes("key") || word.includes("lock") || word.includes("safe") || word.includes("security")) ||

//         word.includes("long") ||

//         word.includes("luggage") ||

//         (word.includes("private") || word.includes("shades") || word.includes("shared") || word.includes("home") || word.includes("skiin") || word.includes("guards") || word.includes("elevator")) ||

//         (word.includes("sound") || word.includes("piano")) 
//       )
//     ) {
//       return true;
//     }
//     return false;
//   });
//   return amenKey;
// }




