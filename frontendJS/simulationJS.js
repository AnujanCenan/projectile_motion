import { 
  drawSetting, 
  changeSettingCoords,
  fullProjectileCycle,
  userClicksCannon,
  findNewLaunchAngle,
  changeInitVelocity,
  changeLaunchAngle
} from "./canvasFunctions.js";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "./canvasConstants.js"

var canvas = document.querySelector('canvas');
export var ctx = canvas.getContext("2d");

window.devicePixelRatio = 2;

canvas.style.width = CANVAS_WIDTH + "px";
canvas.style.height = CANVAS_HEIGHT + "px";

console.log(`Naive canvasWidth is ${CANVAS_WIDTH}`);
console.log(`Naive canvasHeight is ${CANVAS_HEIGHT}`);

var scale = window.devicePixelRatio;

canvas.width = Math.floor(CANVAS_WIDTH * scale);
canvas.height = Math.floor(CANVAS_HEIGHT * scale);
ctx.scale(scale, scale);
console.log(`Canvas width = ${canvas.width}`);
console.log(`Canvas height = ${canvas.height}`);

const canvasInfo = document.getElementById("canvas").getBoundingClientRect();



////////////////////////////////////////////////////////////////////////////////
// User behaviour
var userClick_x;
var userClick_y;
var scalarFactorOfCannonLength; // (lambda value of userClicksCannon
var scalarFactorOfCannonWidth; // (mu value of userClicksCannon)

var userDrag_x;
var userDrag_y;


var userCurr_x;
var userCurr_y;

var draggingCannon = false;

////////////////////////////////////////////////////////////////////////////////
// Iniital Drawing:
drawSetting();

// Detecting window resize:
window.addEventListener('resize', (event) => {
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = (window.innerHeight * 4/5) + "px";

  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * 4/5 * scale);
  ctx.scale(scale, scale);
  console.log(`Canvas width = ${canvas.width}`);
  console.log(`Canvas height = ${canvas.height}`);

  changeSettingCoords();
  drawSetting();

})

// Clicking Fire Button:

const fireButton = document.getElementById('fireButton');
fireButton.addEventListener("mousedown", (event) => {
  fireButton.className = 'fireButtonOnClick';
});

fireButton.addEventListener("mouseup", (event) => {
  fireButton.className = 'fireButton';

});
document.getElementById('fireButton').addEventListener("click", (event) => {
  fullProjectileCycle();
});

// Clicking the cannon:

document.getElementById("canvas").addEventListener("mousedown", (event) => {
  userClick_x = event.clientX - canvasInfo.left;
  userClick_y = event.clientY - canvasInfo.top;
  console.log(`Coords of user click = (${userClick_x}, ${userClick_y})`);
  if (userClicksCannon(userClick_x, userClick_y)) {
    console.log('User clicked the cannon');
    draggingCannon = true;
  } else {
    console.log('User did NOT clicked the cannon');
  }
});

// Dragging the cannon: 

document.getElementById("canvas").addEventListener("mousemove", (event) => {
  if (draggingCannon) {
    userDrag_x = event.clientX - canvasInfo.left;
    userDrag_y = event.clientY - canvasInfo.top;

    findNewLaunchAngle(userClick_x, userClick_y, userDrag_x, userDrag_y);
    userClick_x = userDrag_x;
    userClick_y = userDrag_y;
    // function for figuring out the new launch angle.
  }
});

document.getElementById("canvas").addEventListener("mouseup", () => {
  draggingCannon = false;
});

var slider = document.getElementById("velocitySlider");
const sliderOutput = document.getElementById("velocityVal");
sliderOutput.value = slider.value;
slider.oninput = function() {
  sliderOutput.value = slider.value;
  changeInitVelocity(parseInt(slider.value));
}

sliderOutput.oninput = function() {
  changeInitVelocity(parseFloat(sliderOutput.value));
}

const launchAngleText = document.getElementById("launchAngleText");
launchAngleText.oninput = function() {
  if (parseFloat(launchAngleText.value) !== parseFloat(launchAngleText.value)) {
    changeLaunchAngle(0);
  } else {
    changeLaunchAngle(parseFloat(launchAngleText.value));
  }
  
}
