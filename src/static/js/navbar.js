// Navbar burgur menu
let navInput = document.querySelector("#nav-input");

navInput.addEventListener("change", (event) => {
  if (event.target.checked) {
    document.querySelector("#menu").className = "active";
    document.querySelector("#nav-list").className = "nav-list-hidden";
    document.querySelector(".nav").className = "nav nav-hidden";
  } else {
    document.querySelector("#menu").className = "hidden";
    document.querySelector("#nav-list").className = "nav-list-active";
    document.querySelector(".nav").className = "nav nav-active";
  }
});




