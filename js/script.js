"use strict"
const allBox = document.querySelector("#allBox");
let move = 4; // Поскольку изначально поле 4 х 4
let arrWin = [];
winCombin(move)
fieldSet(move);

function winCombin(move) {
  let win = [];
  let index = 0;
  for (let i = 0; i < move; i++) { // цикл строки
    let arr = [];
    for (let j = 0; j < move; j++) {
      arr.push(index);
      index++;
    }
    win.push(arr);
    arr = [];
  }
  let step2 = []; // цикл столбы
  for (let i = 0; i < win.length; i++) {
    let arr = [];
    for (let j = 0; j < win[i].length; j++) {
      arr.push(win[j][i]);
    }
    step2.push(arr);
    arr = [];
  }
  let step3 = []; // цикл главная
  for (let i = 0; i < win.length; i++) {
    for (let j = i; j < win[i].length; j++) {
      if (j == i) {
        step3.push(win[i][j]);
      }
    }
  }
  let step4 = [].concat(win).reverse(); // цикл побочная
  let step5 = [];
  for (let i = 0; i < step4.length; i++) {
    for (let j = i; j < step4[i].length; j++) {
      if (j == i) {
        step5.push(step4[i][j]);
      }
    }
  }
  win = win.concat(step2);
  win.push(step3, step5.reverse());
  arrWin = win;
  return win
}

document.querySelectorAll("button.field").forEach(item => item.addEventListener("click", e => {
  removeElem(allBox);
  fieldSet(e.target.value);
  move = e.target.value;
}))

//Функция изменения размера поля в зависимости от игры
function fieldSet(fieldParam) {
  allBox.style.setProperty('--main-field-width', `${50 * fieldParam}px`)
  main_head.style.setProperty('--main-head-height', `${50 * fieldParam}px`)
  for (let i = 0; i < fieldParam ** 2; i++) {
    allBox.append(createElem("div", "oneBox", "click", tictactoe));
  }
}

function createElem(name, className, event, fn) {
  let element = document.createElement(name);
  if (className != undefined) {
    element.className = className;
  }
  if (event != undefined && fn != undefined) {
    element.addEventListener(event, fn);
  }
  return element;
}

function removeElem(parent) {
  for (let i = 0; i < parent.children.length; i++) {
    parent.removeChild(parent.children[i]);
    i--;
  }
}

let prev = "";
function tictactoe(e) {
  if (prev == "" && e.target.innerHTML == "") {
    e.target.innerHTML = "X";
    prev = "X";
  } else if (prev == "X" && e.target.innerHTML == "") {
    e.target.innerHTML = "O";
    prev = "O";
  } else if (prev = "O" && e.target.innerHTML == "") {
    e.target.innerHTML = "X";
    prev = "X";
  }
  checkWin(prev, move);
}

function checkWin(step, move) {
  arrWin = winCombin(move);
  for (let i = 0; i < arrWin.length; i++) {
    let repeat = 0;
    for (let j = 0; j < arrWin[i].length; j++) {
      if (allBox.children[arrWin[i][j]].innerHTML == step) {
        repeat++;
        if (repeat == +move) {
          document.getElementsByTagName("h3")[0].innerHTML = `The winner is ${step}`;
          document.querySelector(".modal").style.display = "block";
        }
      }
    }
  }
}
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
  removeElem(allBox);
  fieldSet(move)
  prev = "";
})
