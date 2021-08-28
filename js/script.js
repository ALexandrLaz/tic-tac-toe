"use strict"
const allBox = document.querySelector("#allBox");
let move = 4; // Поскольку изначально поле 4 х 4
let arrWin = [];
let winX = 0;
let win0 = 0;
let draw = 0;
winCombin(move)
fieldSet(move);
let playBoard = [];
const player = "X";
const playerAI = "O";

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
  playBoard = playBoard.concat(arrWin)
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
  if (e.target.innerHTML == "") {
    draw++;
    if (prev == "") {
      e.target.innerHTML = "X";
      prev = "X";
    } else if (prev == "X") {
      e.target.innerHTML = "O";
      prev = "O";
    } else if (prev = "O") {
      e.target.innerHTML = "X";
      prev = "X";
    }
    checkWin(prev, move);
  }
}

function checkWin(step, move) {
  arrWin = winCombin(move);
  for (let i = 0; i < arrWin.length; i++) {
    let repeat = 0;
    for (let j = 0; j < arrWin[i].length; j++) {
      if (allBox.children[arrWin[i][j]].innerHTML == step) {
        repeat++;
        if (repeat == +move) {
          document.getElementsByTagName("h3")[1].style.display = "block";
          document.getElementsByTagName("h3")[0].innerHTML = `Победили ${step}`;
          document.querySelector(".modal").style.display = "block";
          step == "X" ? xWin.innerHTML++ : oWin.innerHTML++;
        }
      }
    }
  }
  if (draw == (move ** 2)) {
    document.getElementsByTagName("h3")[0].innerHTML = `Вы сильные противники, у вас ничья!
    Попробуйте еще раз!`;
    document.getElementsByTagName("h3")[1].style.display = "none";
    document.querySelector(".modal").style.display = "block";
  }
}
document.querySelector(".close").addEventListener("click", close);
document.querySelector("#restart").addEventListener("click", close);
document.querySelector("#restart_all").addEventListener("click", () => {
  xWin.innerHTML = 0;
  oWin.innerHTML = 0
  close();
});
function close() {
  document.querySelector(".modal").style.display = "none";
  removeElem(allBox);
  fieldSet(move)
  prev = "";
}


// function draw(prev, e){
//   let canvas = createElem("canvas", "canvasStyle");
//   var ctx = canvas.getContext('2d');
//   if(prev == "O"){
//     ctx.arc(100,65,50,10,Math.PI*2,true);
//   } else if(prev == "X"){
//     ctx.beginPath();
//     ctx.arc(100,65,50,10,Math.PI*2,true);
//   }
//   e.target.append("canvas")
// }

// console.log(draw(10, 1))