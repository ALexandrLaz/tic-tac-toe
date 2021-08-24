"use strict"
let table = document.querySelector("table");
table.addEventListener("click", tictactoe);

let prev = "";
function tictactoe(e) {
  console.log(e.target);
  if (prev == "" && e.target.innerHTML == "") {
    e.target.innerHTML = "X";
    prev = "X";
    step(e.target);
  } else if (prev == "X" && e.target.innerHTML == "") {
    e.target.innerHTML = "O";
    prev = "O";
    step(e.target);
  } else if (prev == "O" && e.target.innerHTML == "") {
    e.target.innerHTML = "X";
    prev = "X";
    step(e.target);
  }
}

let tr = document.querySelectorAll("tr");
for (let i = 1; i < tr.length; i++) {
  tr[i].classList.toggle("removeStyle");
}
function step(eObj) {
  console.log(eObj.parentNode.children[0].innerHTML, eObj.cellIndex)
}