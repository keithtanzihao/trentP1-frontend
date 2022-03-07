// Allows user to close modal after button click
let modalBox = document.querySelector(".modal-btn");

modalBox.addEventListener("click", (event) => {
  document.querySelector("#modal").classList.remove("active");
  document.querySelector("#modal").classList.add("hidden");
});
