// Navbar menu
let navInput = document.querySelector("#nav-input");

navInput.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.querySelector("#modal").classList.remove("hidden");
    document.querySelector("#ock").classList.add("active");
  } else {
    document.querySelector("#modal").classList.add("hidden");
    document.querySelector("#ock").classList.remove("active");
  }
});


