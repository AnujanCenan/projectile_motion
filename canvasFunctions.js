import { 
  ROTATION_POINT_RADIUS,
  CANNON_BORDER_THICKNESS,
  CANNON_HEIGHT,
  CANNON_HEIGHT_W_BORDERS,
  CANNON_LENGTH,
  CANNON_LENGTH_W_BORDERS,
  CANNON_BALL_RADIUS,
  CANNON_PIVOT_X,
  GROUND_Y_COORD,
  GROUND_COLOUR,
  SKY_COLOUR,
  ROTATION_POINT_COLOUR,
  CANNON_COLOUR
} from "./canvasConstants.js";

import { ctx, canvasWidth, canvasHeight } from "./simulationJS.js";


////////////////////////////////////////////////////////////////////////////////

// starts at 60 and will change depending on user input:

var currLaunchAngle = 60; // (degs)
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

////////////////////////////////////////////////////////////////////////////////

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
  const cannonCoords = 
    drawCannon(currLaunchAngle, CANNON_PIVOT_X, GROUND_Y_COORD);

  // drawing point of rotation - draw it after the cannon so that it appears in
  // front of the cannon
  ctx.beginPath();
  ctx.arc(CANNON_PIVOT_X, GROUND_Y_COORD, ROTATION_POINT_RADIUS, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fillStyle = ROTATION_POINT_COLOUR;
  ctx.fill();
  ctx.closePath();

  return cannonCoords
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
  return {
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

// const cannonCoords = drawSetting();
// On fire button click:
// const ball_centre = initialiseProjectile(cannonCoords);

// could find initial height above the ground using length of cannon and launch angle
// and then end the trajectory when the required negative displacement is reached.
// on fire button click:

export function fullProjectileCycle() {
  const cannonCoords = drawSetting();
  const ball_centre = initialiseProjectile(cannonCoords);

  var t = 0;
  var x_start = ball_centre.ball_centre_x;;
  var x = x_start;
  var y_start = ball_centre.ball_center_y;
  var y = y_start;
  
  // hard coded for now:
  var init_angle = currLaunchAngle;
  var accel = 80;
  var init_speed = 200;
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
  const cannonCoords = drawSetting();
  console.log(cannonCoords);
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

  console.log(`mu = ${mu}`);
  // bug: when in the upright position, lambda is coming as Nan and Infinity :(
  // This is because in the upright position, X1 is 0 so there was some illegal 
  // dividing-by-zero shennagians occuring. But now I have this if-else check
  // so that I don't divide by zero.

  console.log(`X1 = ${X1}`);
  let lambda;
  if (X1 !== 0) {
    lambda = (C1 - X2 * mu) / X1;
  } else {
    lambda = (C2 - Y2 * mu) / Y1;
  }
  console.log(`lambda = ${lambda}`);

  
  if (mu >= 0 && mu <= 1 && lambda >= 0 && lambda <= 1) {
    scalarFactorOfCannonLength = lambda;
    scalarFactorOfCannonWidth = mu; 
    return true;
  }

  return false;
}

/**
 * Converts an angle that is in degrees into the equivalent angle in raidans.
 * @param {number} angle the angle in radians.
 * @returns {number} the angle in degrees
 */
const radiansToDegrees = (angle) => {
  return angle * 180 / Math.PI;
}

