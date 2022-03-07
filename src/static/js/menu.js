// Menu that allows you to hide sidebar tabs
const menuArray = document.querySelectorAll(".menu-item");
const sbarArray = document.querySelectorAll(".sbar-listing");
const navInput = document.querySelector("#nav-input");

for (let menuItem of menuArray) {
  menuItem.addEventListener("click", function () {
    for (let sbarItem of sbarArray) {
      sbarItem.classList.remove("active");
      sbarItem.classList.add("hidden");
    }
    let sbarCurr = document.querySelector(`#sbar${menuItem.id.substring(4)}`);
    sbarCurr.classList.remove("hidden");
    sbarCurr.classList.add("active");

    document.querySelector("#menu").className = "hidden";
    document.querySelector("#nav-list").className = "nav-list-active";
    document.querySelector(".nav").className = "nav nav-active";
    navInput.checked = false;
  });
}

function menuAttachIcon() {
  let menuItemArray = document.querySelectorAll(".menu-item");
  for (let menuItem of menuItemArray) {
    menuItem.addEventListener("mouseover", function() {
      let menuIconImg = document.querySelector("#menu-icon-img");
      let menuItemType = menuItem.id.split("-");
      menuIconImg.src = `./src/static/css/vendors/imgs/menu/${menuItemType[1]}.svg`;
    })
  }
}

menuAttachIcon();