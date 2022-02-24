// Navbar menu
let navInput = document.querySelector("#nav-input");

navInput.addEventListener("change", (event) => {
  console.log("testing");
  if (event.target.checked) {
    document.querySelector("#modal").classList.remove("hidden");
  } else {
    document.querySelector("#modal").classList.add("hidden");
  }
});

// Allows user to open modal if button click
let modalBox = document.querySelector(".modal-btn");
console.log(modalBox);

modalBox.addEventListener("click", (event) => {
  document.querySelector("#modal").classList.remove("active");
  document.querySelector("#modal").classList.add("hidden");
});
