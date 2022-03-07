// Allows user to close modal after button click
let modalBox = document.querySelector(".modal-btn");
console.log(modalBox);

modalBox.addEventListener("click", (event) => {
  document.querySelector("#modal").classList.remove("active");
  document.querySelector("#modal").classList.add("hidden");
});
