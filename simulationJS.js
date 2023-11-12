// Big shout out to Chris Courses 
// https://www.youtube.com/watch?v=EO6OkltgudE&t=213s

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * 3/4;
canvas.height = window.innerHeight * 3/4;
var ctx = canvas.getContext("2d"); // passing a ton of methods through ctx; it's a magic paintbrush

const canvasInfo = document.getElementById("canvas").getBoundingClientRect();

console.log(`CanvasWidth = ${canvas.width}`);
console.log(`CanvasHeight = ${canvas.height}`);


// https://www.youtube.com/watch?v=dyzAyDByfvY&t=57s : Potentially a (relatively hardcode-y) way of fixing the resolution issues.

////////////////////////////////////////////////////////////////////////////////

// CONSTANTS

// this value basically sets everything else:
const ROTATION_POINT_RADIUS = 20;

const CANNON_HEIGHT = ROTATION_POINT_RADIUS; 
const CANNON_LENGTH = CANNON_HEIGHT * 4;
    // Length : Height = 4 : 1 
const CANNON_BORDER_THICKNESS = 10;

const CANNON_BALL_RADIUS = CANNON_HEIGHT / 2;

const CANNON_PIVOT_X = ROTATION_POINT_RADIUS + 50;
const GROUND_Y_COORD = canvas.height * (7/8);
const GROUND_COLOUR = '#00ad14'
const SKY_COLOUR = '#00aaff'
const ROTATION_POINT_COLOUR = '#6b423f'
const CANNON_COLOUR = '#333333'

////////////////////////////////////////////////////////////////////////////////

// starts at 60 and will change depending on user input:
var currLaunchAngle = 30; // (degs)
var cannonCoords;

/////////////////////////////////////////////////////////////////////////////////
// boolean values
var draggingCannon = false;



////////////////////////////////////////////////////////////////////////////////

/**
 * Converting an angle in degrees into an angle in radians
 * @param {number} angle angle (in degrees) to convert into radians
 * @returns {number} the angle in radians
 */
const degreesToRadians = (angle) => {
    return angle * Math.PI / 180;
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

  if (angle > 90 || angle < 0) {
    throw new Error(`Invalid input angle. Angle should be between 0 and 90 degs.`);
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

  // the additional trigonometry in the return objectis to find the coordinates 
  // of the outer corners of the cannon. The coordinates found so far are for the
  // inner (non-black) body's corners.
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
 * Draws the main objects of the setting - grass, sky and cannon.
 * @returns {Object} - the three coordinates that are returned in drawCannon.
 */
function drawSetting() {
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

  // drawing point of rotation - draw it after the cannon so that it appears in
  // front of the cannon
  ctx.beginPath();
  ctx.arc(CANNON_PIVOT_X, GROUND_Y_COORD, ROTATION_POINT_RADIUS, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.fillStyle = ROTATION_POINT_COLOUR;
  ctx.fill();
  ctx.closePath();

  // Example cannon - change the first argument to change the angle (degrees),
  // keep the other two parameters fixed.
  const cannonCoords = 
    drawCannon(currLaunchAngle, CANNON_PIVOT_X, GROUND_Y_COORD);



  return cannonCoords
}

cannonCoords = drawSetting();

/**
 * Draws the initial cannon ball. Takes the midpoint of the mouth of the cannon
 * barrel to be the centre of the cannon ball.
 * @param {Object} cannonCoords - the three coordinates (x1, y1), (x2, y2) and
 * (x3, y3) as per the diagram in the drawCannon documentation.
 * @returns {Object} with the following key-value pairs: 
 * - ball_centre_x: the x-coordinate of the centre of the cannon ball in its 
 * initial position
 * - ball_centre_y: the y-coordinate of the centre of the cannon ball in its 
 * initial position
 */
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

function fullProjectileCycle() {
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

// the math behind this function can be found on the repo and wiki
function userClicksCannon(cannonCoords, user_x, user_y) {
  // NOTE: These coordinates refer to the corners of the filled in part of the 
  // cannon, NOT the surrounding border. More intense is required for finding 
  // the corners of the cannon border.
  const x0 = cannonCoords.startCoord[0];
  const y0 = cannonCoords.startCoord[1];

  const x1 = cannonCoords.frontCoord_1[0];
  const y1 = cannonCoords.frontCoord_1[1];

  const x3 = cannonCoords.backCoord_1[0];
  const y3 = cannonCoords.backCoord_1[1];

  const C1 = user_x - x0;
  const X1 = x1 - x0;
  const X2 = x3 - x0;

  const C2 = user_y - y0;
  const Y1 = y1 - y0;
  const Y2 = y3 - y0;

  const mu = (C1 * Y1 - C2 * X1) / (X2 * Y1 - X1 * Y2);
  const lambda = (C1 - X2 * mu) / X1;

  if (mu >= 0 && mu <= 1 && lambda >= 0 && lambda <= 1) {
    return true;
  }

  return false;

}



// What to do if the user clicks on the canvas:
document.getElementById("canvas").addEventListener("mousedown", (event) => {
  if (userClicksCannon(cannonCoords, event.clientX - canvasInfo.left, event.clientY  - canvasInfo.top)) {
    console.log('User clicked the cannon');
    draggingCannon = true;
    
  } else {
    console.log('User did NOT clicked the cannon');
  }
});


// What to do when the user starts dragging 
document.getElementById("canvas").addEventListener("mousemove", (event) => {
  if (draggingCannon) {
    console.log(event.clientX - canvasInfo.left);
    console.log(event.clientY - canvasInfo.top);
  }
})


// What to do when the user unclicks the canvas
document.getElementById("canvas").addEventListener("mouseup", () => {
  draggingCannon = false;
})









