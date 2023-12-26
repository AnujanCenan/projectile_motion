import { drawSetting } from "./canvasFunctions.js";
import { GROUND_Y_COORD, GROUND_COLOUR } from "./canvasConstants.js";
var canvas = document.querySelector('canvas');
export var ctx = canvas.getContext("2d");

window.devicePixelRatio = 2;

const canvasWidth = window.innerWidth * 3/4;
const canvasHeight = window.innerHeight * 3/4;
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

var scale = window.devicePixelRatio;

canvas.width = Math.floor(canvasWidth * scale);
canvas.height = Math.floor(canvasHeight * scale);
ctx.scale(scale, scale);

// Colours 


////////////////////////////////////////////////////////////////////////////////

ctx.lineWidth = 3;
ctx.beginPath();
ctx.rect(0, GROUND_Y_COORD, canvas.width, canvas.height - GROUND_Y_COORD);
ctx.strokeStyle = 'black';
ctx.stroke();
ctx.fillStyle = GROUND_COLOUR;
ctx.fill();
ctx.closePath();


// drawSetting();

