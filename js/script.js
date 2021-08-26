"use strict"
let allBox = document.querySelector("#allBox");
allBox.addEventListener("click", tictactoe);

let arrWin = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12]
]

let prev = "";
function tictactoe(e) {
  console.log(e.target);
  if (prev == "" && e.target.innerHTML == "" || prev == "Нолики") {
    e.target.innerHTML = "X";
    prev = "Крестики";

  } else if (prev == "Крестики" && e.target.innerHTML == "") {
    e.target.innerHTML = "O";
    prev = "Нолики";
  }
  checkWin(prev);
}

function checkWin(step) {
  for(let i = 0; i < arrWin.length; i++){
    let repeat = 0;
    for(let j = 0; j < arrWin[i].length; j++){
      if(allBox.children[arrWin[i][j]].innerHTML == step){
        repeat++;
        if(repeat == 4){
          document.getElementsByTagName("h3")[0].innerHTML = `The winner is ${step}`;
          document.getElementsByClassName("modal")[0].style.display = "block";
        }
        //вызываем модальное окно
      }
    }
  }
}