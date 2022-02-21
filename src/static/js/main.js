// Navbar menu
let navInput = document.querySelector("#nav-input");

navInput.addEventListener("change", (event) => {
  console.log("testing");
  if (event.target.checked) {
    document.querySelector(".modal").classList.remove("hidden");
  } else {
    document.querySelector(".modal").classList.add("hidden");
  }
});

// Allows user to open modal if button click
// let modalBox = document.querySelector("#modal-cb");
// console.log(modalBox);

// modalBox.addEventListener("click", (event) => {
//   // if (event.target.checked) {
//   //   console.log("yes");
//   //   document.querySelector("#modal").classList.remove("active");
//   //   document.querySelector("#modal").classList.add("hidden");
//   // }
//   // console.log("yes");
//   alert("testing button here");
//   document.querySelector("#modal").classList.remove("active");
//   document.querySelector("#modal").classList.add("hidden");
// });

console.log(navInput);
