const container = document.querySelector(".container");
let width = container.offsetWidth - (2 * parseInt(getComputedStyle(container).borderWidth));

var buttons = document.querySelectorAll(".btn");
let colorMode = document.getElementById('colorMode');
let eraserMode = document.getElementById('eraser');
let rainbowMode = document.getElementById('rainbowMode');
let clear = document.getElementById('clear');
let toggle = document.getElementById('toggle');
const download = document.getElementById('download');
const value = document.querySelector("#value");
const input = document.querySelector("#myRange");
let colorVal = document.querySelector('#colorPicker').value;
let isRainbowMode = false;

function handleClick(event) {                 // removes and selects button
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] !== event.target) { 
      buttons[i].classList.remove("active");
    }
  }
  event.target.classList.add("active");
  if (event.target.id === "colorMode") {
    colorVal = document.querySelector('#colorPicker').value;
    isRainbowMode = false;
  } else if (event.target.id === "rainbowMode"){
    isRainbowMode = true;
  } else if (event.target.id === "eraser") {
    colorVal = "white";
    isRainbowMode = false;
  }
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleClick);
}

function activateFirstButton() {    //Defaults to colorMode
  buttons[0].classList.add("active");
}
activateFirstButton();

document.querySelector("#colorPicker").onchange = e => {
  if (buttons[0].classList.contains("active")) {
    colorVal = e.target.value;
    isRainbowMode = false;
  } }

function generateGrid(col, row){
  container.innerHTML = "";
  let isClicked = false; // added variable to track if mouse button is clicked
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const div = document.createElement("div");
      div.className = "grid-item";
      if (!toggle.classList.contains('active')) {
        div.style.border = "0.2px inset Gainsboro"
      }
      div.style.width = `${width/row}px`;
      div.style.height = `${width/col}px`;
      div.style.boxSizing = "border-box";
      div.style.backgroundColor = "white"
      div.addEventListener('mousedown', event => {
        isClicked = true;
        const targetDiv = event.target;
        if (isRainbowMode) {
          targetDiv.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        } else {
          targetDiv.style.backgroundColor = colorVal;
          }
        });
        div.addEventListener('mouseover', event => {
          if (isClicked) { // only change color if mouse button is clicked
            const targetDiv = event.target;
          if (isRainbowMode) {
            targetDiv.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          } else {
            targetDiv.style.backgroundColor = colorVal;
            }
          }
          });
          div.addEventListener('mouseup', event => {
            isClicked = false; // reset variable when mouse button is released
          });
          container.appendChild(div);
        }
      const br = document.createElement("div");
      br.style.flexBasis = "100%";
      br.style.height = "0px";
      container.appendChild(br);
    } 
  }
  
let col = input.value;
let row = input.value;
value.textContent = `${input.value} x ${input.value}`;
input.addEventListener("input", event => {            //changes grid size and resets grid
  value.textContent = `${event.target.value} x ${event.target.value}`
  col = event.target.value;
  row = event.target.value;
  generateGrid(col, row);
})

clear.addEventListener('click', () => {
  generateGrid(col, row);
})

function handleToggle(event) {
  const gridItems = document.querySelectorAll('.grid-item');
  if (toggle === event.target && !toggle.classList.contains('active')) {
    toggle.classList.add("active");
    gridItems.forEach(item => item.style.border = 'none');
  } else if (toggle === event.target && toggle.classList.contains('active')) {
    toggle.classList.remove("active");
    gridItems.forEach(item => item.style.border = '0.2px inset Gainsboro');
  }
}

toggle.addEventListener('click', handleToggle);

generateGrid(col, row);




  