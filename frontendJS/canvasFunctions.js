import { 
  ROTATION_POINT_RADIUS,
  CANNON_BORDER_THICKNESS,
  CANNON_HEIGHT,
  CANNON_HEIGHT_W_BORDERS,
  CANNON_LENGTH,
  CANNON_LENGTH_W_BORDERS,
  CANNON_BALL_RADIUS,
  CANNON_PIVOT_X,
  GROUND_COLOUR,
  SKY_COLOUR,
  ROTATION_POINT_COLOUR,
  CANNON_COLOUR,
} from "./canvasConstants.js";

import { ctx } from "./simulationJS.js";

var GROUND_Y_COORD = window.innerHeight * 3/4 * (7/8);
var METRES_TO_PX = (window.innerWidth * 1 - CANNON_PIVOT_X) / 100;

////////////////////////////////////////////////////////////////////////////////

// starts at 60 and will change depending on user input:

var currLaunchAngle = 30; // (degs)
var init_speed = 15 * METRES_TO_PX;
var cannonCoords;

/////////////////////////////////////////////////////////////////////////////////
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
var annotationsOn = true;

////////////////////////////////////////////////////////////////////////////////

export function changeSettingCoords() {
  GROUND_Y_COORD = window.innerHeight * 3/4 * (7/8);
  METRES_TO_PX = (window.innerWidth * 1 - CANNON_PIVOT_X) / 100;
  drawSetting();
  console.log(cannonCoords);
}

////////////////////////////////////////////////////////////////////////////////
// Drawing the environemnt

/**
 * Draws the main objects of the setting - grass, sky and cannon.
 * @returns {Object} - the three coordinates that are returned in drawCannon.
 */
export function drawSetting() {
  ctx.lineWidth = CANNON_BORDER_THICKNESS;
  // drawing grass
  ctx.beginPath();
  ctx.rect(0, GROUND_Y_COORD, canvas.width, canvas.height - GROUND_Y_COORD);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = GROUND_COLOUR;
  ctx.fill();
  ctx.closePath();

  // drawing sky
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, GROUND_Y_COORD);
  ctx.stroke();
  ctx.fillStyle = SKY_COLOUR;
  ctx.fill();
  ctx.closePath();

  // Example cannon - change the first argument to change the angle (degrees),
  // keep the other two parameters fixed.
  cannonCoords = 
    drawCannon(currLaunchAngle, CANNON_PIVOT_X, GROUND_Y_COORD);

  // drawing point of rotation - draw it after the cannon so that it appears in
  // front of the cannon
  ctx.beginPath();
  ctx.arc(CANNON_PIVOT_X, GROUND_Y_COORD, ROTATION_POINT_RADIUS, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fillStyle = ROTATION_POINT_COLOUR;
  ctx.fill();
  ctx.closePath();
}


/**
 * Draws the barrel and pivot of the cannon. 
 * @param {number} angle - launch angle
 * @param {number} x_start - the x-coordinate of the bottom-most corner of the 
 * cannon barrel
 * @param {number} y_start  - the x-coordinate of the bottom-most corner of the 
 * cannon barrel
 * @returns {Object} with the following key-value pairs:
 * - frontCoord_1: Coordinate (x1, y1)
 * - frontCoord_2: Coordinate (x2, y2)
 * - backCoord_1: Coordinate (x3, y3)
 * Note that (x_start, y_start) is the same coordinate as the centre of the pivot
 * Diagram of cannon barrel:
      (x2, y2) _____ (x1, y1)
              /    / 
             /    /    
            /    /   
           /    /
           -----
      (x3, y3)   (x_start, y_start)
*/
const drawCannon = (angle, x_start, y_start) => {

  if (angle > 90) {
    angle = 90;
    currLaunchAngle = angle;
  } else if (angle < 0) {
    angle = 0;
    currLaunchAngle = angle;
  }
  const angleRadians = degreesToRadians(angle);

  ctx.beginPath();
  ctx.moveTo(x_start, y_start);
  
  const x1 = x_start + CANNON_LENGTH * Math.cos(angleRadians);
  const y1 = y_start - CANNON_LENGTH * Math.sin(angleRadians);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  const x2 = x1 - CANNON_HEIGHT * Math.sin(angleRadians);
  const y2 = y1 - CANNON_HEIGHT * Math.cos(angleRadians);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  const x3 = x2 - CANNON_LENGTH * Math.cos(angleRadians);
  const y3 = y2 + CANNON_LENGTH * Math.sin(angleRadians);
  ctx.lineTo(x3, y3);
  ctx.stroke();

  ctx.lineTo(x_start, y_start);
  ctx.stroke();
  ctx.fillStyle = CANNON_COLOUR;    
  ctx.fill();
  ctx.closePath();

  // The math involved here is explained by 'FindingOuterCornersOfCannons' in 
  // MathematicalArguments.
  const outerCannonCoords =  {
    startCoord: [
      x_start + CANNON_BORDER_THICKNESS/2 * (Math.sin(angleRadians) - Math.cos(angleRadians)),
      y_start + CANNON_BORDER_THICKNESS/2 * (Math.sin(angleRadians) + Math.cos(angleRadians))
    ],
    frontCoord_1: [
      x1 + CANNON_BORDER_THICKNESS/2 * (Math.sin(angleRadians) + Math.cos(angleRadians)),
      y1 + CANNON_BORDER_THICKNESS/2 * (- Math.sin(angleRadians) + Math.cos(angleRadians))
    ],
    frontCoord_2: [
      x2 + CANNON_BORDER_THICKNESS/2 * (- Math.sin(angleRadians) + Math.cos(angleRadians)), 
      y2 + CANNON_BORDER_THICKNESS/2 * (- Math.sin(angleRadians) - Math.cos(angleRadians))
    ],
    backCoord_1: [
      x3 + CANNON_BORDER_THICKNESS/2 * (- Math.sin(angleRadians) - Math.cos(angleRadians)),
      y3 + CANNON_BORDER_THICKNESS/2 * (Math.sin(angleRadians) - Math.cos(angleRadians))
    ],
  }

  if (annotationsOn) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(CANNON_PIVOT_X, GROUND_Y_COORD, CANNON_LENGTH_W_BORDERS / 2, -angleRadians, 0);
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`${Math.round(angle * 100) / 100}\u00B0`, CANNON_PIVOT_X + 50, GROUND_Y_COORD - 5)
    ctx.lineWidth = CANNON_BORDER_THICKNESS;

  }
  return outerCannonCoords;
}

/**
 * Converting an angle in degrees into an angle in radians
 * @param {number} angle angle (in degrees) to convert into radians
 * @returns {number} the angle in radians
 */
const degreesToRadians = (angle) => {
    return angle * Math.PI / 180;
}
////////////////////////////////////////////////////////////////////////////////
// Firing a projectile
function initialiseProjectile(cannonCoords) {
  const x1 = cannonCoords.frontCoord_1[0];
  const y1 = cannonCoords.frontCoord_1[1];

  const x2 = cannonCoords.frontCoord_2[0];
  const y2 = cannonCoords.frontCoord_2[1];

  const mid_x = (x1 + x2) / 2;
  const mid_y = (y1 + y2) / 2;

  ctx.beginPath();
  ctx.moveTo(mid_x, mid_y);
  ctx.arc(mid_x, mid_y, CANNON_BALL_RADIUS, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  return {
    ball_centre_x: mid_x,
    ball_center_y: mid_y
  }
}


// could find initial height above the ground using length of cannon and launch angle
// and then end the trajectory when the required negative displacement is reached.
// on fire button click:

export function fullProjectileCycle() {
  drawSetting();
  const ball_centre = initialiseProjectile(cannonCoords);

  var t = 0;
  var x_start = ball_centre.ball_centre_x;;
  var x = x_start;
  var y_start = ball_centre.ball_center_y;
  var y = y_start;
  
  // hard coded for now:
  var init_angle = currLaunchAngle;
  var accel = 9.8 * METRES_TO_PX;
  
  var keepTracking = true;

  function trackProjectile() {

    if (!keepTracking) return;

    ctx.clearRect(0, 0, canvas.widthh, canvas.height);
    drawSetting();

    const angleRads = degreesToRadians(init_angle);

    if (y - (init_speed * Math.sin(angleRads) * t) + (1/2 * accel * t**2) < GROUND_Y_COORD) {    
      x = x_start + init_speed * Math.cos(angleRads) * t;                             // (1)
      y = 
        y_start - (init_speed * Math.sin(angleRads) * t) + (1/2 * accel * t**2);    // (2)
      t += 0.1;

      // redrawing the cannon ball in a new position
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, CANNON_BALL_RADIUS, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.closePath(); 

    } else {

      // Finding position of cannonball when it hits y = GROUND_Y_COORD.
      // solve for t by using equation (2) and then substitute the result 
      // into equation (1) to find the corresponding x coordinate.
      const a = 1/2 * accel
      const b = -init_speed * Math.sin(angleRads);
      const c = y_start - GROUND_Y_COORD;

      const tf = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
      x = x_start + init_speed * Math.cos(angleRads) * tf;  

      // drawing the final ball
      ctx.beginPath();
      ctx.moveTo(x, GROUND_Y_COORD);
      ctx.arc(x, GROUND_Y_COORD, CANNON_BALL_RADIUS, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath(); 
      keepTracking = false;
    }

    requestAnimationFrame(trackProjectile);
  }

  trackProjectile();
}

////////////////////////////////////////////////////////////////////////////////
// Changing launch angle

// the math behind this function can be found on the repo and wiki
export function userClicksCannon(userClick_x, userClick_y) {
  drawSetting();
  const x0 = cannonCoords.startCoord[0];
  const y0 = cannonCoords.startCoord[1];

  const x1 = cannonCoords.frontCoord_1[0];
  const y1 = cannonCoords.frontCoord_1[1];

  const x3 = cannonCoords.backCoord_1[0];
  const y3 = cannonCoords.backCoord_1[1];

  const C1 = userClick_x - x0;
  const X1 = x1 - x0;
  const X2 = x3 - x0;

  const C2 = userClick_y - y0;
  const Y1 = y1 - y0;
  const Y2 = y3 - y0;

  const mu = (C1 * Y1 - C2 * X1) / (X2 * Y1 - X1 * Y2);


  let lambda;
  if (X1 !== 0) {
    lambda = (C1 - X2 * mu) / X1;
  } else {
    lambda = (C2 - Y2 * mu) / Y1;
  }
  
  if (mu >= 0 && mu <= 1 && lambda >= 0 && lambda <= 1) {
    scalarFactorOfCannonLength = lambda;
    scalarFactorOfCannonWidth = mu; 
    return true;
  }

  return false;
}


export function findNewLaunchAngle(userClick_x, userClick_y, userDrag_x, userDrag_y) {
  drawSetting();
  const A = {
    x: cannonCoords.startCoord[0],
    y: cannonCoords.startCoord[1]
  };
  const C = {
    x: userDrag_x,
    y: userDrag_y
  }
  const AC = {
    x: C.x - A.x,
    y: C.y - A.y
  };

  const magAC = Math.sqrt(AC.x ** 2 + AC.y ** 2);
  const alpha = Math.asin((scalarFactorOfCannonWidth * (CANNON_HEIGHT_W_BORDERS)) / magAC);

  const magAE = magAC * Math.cos(alpha);
  const beta = Math.atan(Math.abs(AC.y) / Math.abs(AC.x));

  const e1 = magAE * Math.cos(beta - alpha) + A.x;
  const e2 = magAE * Math.sin(beta - alpha) + A.y;

  const AE = {
    x: e1 - A.x,
    y: e2 - A.y
  }
  const D = {
    x: cannonCoords.frontCoord_1[0],
    y: cannonCoords.frontCoord_1[1]
  }
  const AD = {
    x: D.x - A.x,
    y: D.y - A.y
  }

  const magAD = Math.sqrt(AD.x ** 2 + AD.y ** 2)
  let thetaInRadians = Math.acos((AE.x * AD.x + AE.y * AD.y) / (magAE * magAD));
  // This resulting fraction would sometimes be 1.000000..002 because of how 
  // similar the top and bottom the fraction is. This as an input value for Math.acos()
  // causes a return of a NaN value.

  // For now, if this NaN return behaviour occurs, I will assume the input of 
  // the acos was close to 1, so I will let thetaInRadians = 0 since 
  // acos(1) === 0;

  // a way of checking if a value is NaN
  if (thetaInRadians !== thetaInRadians) {
    thetaInRadians = 0;
  }
  // this divding by 100 is an 'engineering' solution, not a mathematical one.
  // Take it out and see how the thing behaves.
  const theta = radiansToDegrees(thetaInRadians) / 30;

  // this if-else block could be improved for usability
  if (userDrag_x === userClick_x && userDrag_y === userClick_y) {
    // do nothing 
  } else if ((currLaunchAngle < 45 && userDrag_y < userClick_y)
      || currLaunchAngle >= 45 && userDrag_x < userClick_x) {
    currLaunchAngle += theta;
  } else {
    currLaunchAngle -= theta;
  }
  ctx.clearRect(0, 0, canvas.widthh, canvas.height);
  drawSetting();
  return cannonCoords;
}

/**
 * Converts an angle that is in degrees into the equivalent angle in raidans.
 * @param {number} angle the angle in radians.
 * @returns {number} the angle in degrees
 */
const radiansToDegrees = (angle) => {
  return angle * 180 / Math.PI;
}

export const changeInitVelocity = (v) => {
  init_speed = v * METRES_TO_PX;
}

export const changeLaunchAngle = (a) => {
  currLaunchAngle = a;
  drawSetting();
}

