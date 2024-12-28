const boxgrid = document.querySelectorAll('.grid-box');
const sizebtn = document.querySelector('.size-btn');
const rowinput = document.querySelector('.row');
const colinput = document.querySelector('.col');
const container = document.querySelector('.container-grid');
const final = document.querySelector('.maze-btn');
const reset = document.querySelector('.reset');
const sound = new Audio('click.wav');
const error = new Audio('error.mp3');

let row = 0;
let col = 0;
let array =
  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let dp =
  [[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
sizebtn.addEventListener('click', () => {
  if (row != 0 && col != 0 || rowinput.value == '' || colinput.value == '') {
    error.play();
    return;
  }
  row = parseInt(rowinput.value);
  col = parseInt(colinput.value);
  if (row < 2 || col < 2 || row > 10 || col > 10 || typeof (row) != 'number' || typeof (col) != 'number') {
    error.play();
    alert("Input is out of range!");
    rowinput.value = '';
    colinput.value = '';
    return;
  }
  document.querySelector('.end').remove();
  create();
})
function create() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let element = document.createElement('div');
      element.className = `l${i}-${j}l`;
      element.className += " grid-box";
      element.addEventListener('click', () => {
        let color = window.getComputedStyle(element);
        color = color.backgroundColor;
        let name = element.className;
        let x = name[1];
        let y = name[3];
        if (color == 'rgb(243, 243, 243)') {
          element.style.backgroundColor = 'rgb(48, 56, 65)';
          array[x][y] = 0;
        }
        else {
          element.style.backgroundColor = 'rgb(243, 243, 243)';
          array[x][y] = 1;
        }
        sound.play();
      })
      container.appendChild(element);
    }
  }
  container.style.gridTemplateColumns = `repeat(${col}, minmax(auto, 100px))`;
  container.style.gridTemplateRows = `repeat(${row}, minmax(auto, 100px))`;
}
final.addEventListener('click', () => {
  if (row == 0 || col == 0) {
    error.play();
    alert('Input size of maze!');
    return;
  }
  // console.log(array);
  solve(0, 0);
});
function solve(a, b) {
  if (a < 0 || b < 0 || a > row - 1 || b > col - 1 || array[a][b] != 1 || dp[a][b] == 1) {
    return false;
  }
  if (a == row - 1 && b == col - 1) {
    document.querySelector(`.l${a}-${b}l`).style.backgroundColor = 'green';
    return true;
  }
  dp[a][b] = 1;
  if (solve(a - 1, b) || solve(a + 1, b) || solve(a, b - 1) || solve(a, b + 1)) {
    document.querySelector(`.l${a}-${b}l`).style.backgroundColor = 'green';
    dp[a][b] = 0;
    return true;
  }
  dp[a][b] = 0;
  return false;
}
reset.addEventListener('click', () => {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      document.querySelector(`.l${i}-${j}l`).remove();
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      array[i][j] = 1;
    }
  }
  row = 0;
  col = 0;
  container.style.gridTemplateColumns = '';
  container.style.gridTemplateRows = '';
  rowinput.value = '';
  colinput.value = '';
  let temp = document.createElement('div');
  temp.className = 'end';
  temp.innerText = 'Made by Sagar Gujarathi❤️';
  document.querySelector('.container').appendChild(temp);
})

