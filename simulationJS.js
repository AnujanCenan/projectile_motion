import { drawSetting, fullProjectileCycle } from "./canvasFunctions.js";

var canvas = document.querySelector('canvas');
export var ctx = canvas.getContext("2d");

window.devicePixelRatio = 2;

export const canvasWidth = window.innerWidth * 3/4;
export const canvasHeight = window.innerHeight * 3/4;
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

console.log(`Naive canvasWidth is ${canvasWidth}`);
console.log(`Naive canvasHeight is ${canvasHeight}`);

var scale = window.devicePixelRatio;

canvas.width = Math.floor(canvasWidth * scale);
canvas.height = Math.floor(canvasHeight * scale);
ctx.scale(scale, scale);
console.log(`Canvas width = ${canvas.width}`);
console.log(`Canvas height = ${canvas.height}`);


////////////////////////////////////////////////////////////////////////////////

drawSetting();

const fireButton = document.getElementById('fireButton');
// const buttonWidth = 120;
// const buttonHeight = 100;
fireButton.addEventListener("mousedown", (event) => {
  fireButton.className = 'fireButtonOnClick';
});

fireButton.addEventListener("mouseup", (event) => {
  fireButton.className = 'fireButton';

});
document.getElementById('fireButton').addEventListener("click", (event) => {
  fullProjectileCycle();
});
