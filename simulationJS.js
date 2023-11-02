// Big shout out to Chris Courses 
// https://www.youtube.com/watch?v=EO6OkltgudE&t=213s

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * 3/4;
canvas.height = window.innerHeight * 1/2;
var ctx = canvas.getContext("2d"); // passing a ton of methods through ctx; it's a magic paintbrush

console.log(canvas.width); // the speed, distance and accel values will depend on this value i think

const GROUND_Y_COORD = canvas.height * (7/8);
const GROUND_COLOUR = '#00ad14'
const SKY_COLOUR = '#00aaff'
const ROTATION_POINT_COLOUR = '#6b423f'

const ROTATION_POINT_RADIUS = 10;

const CANNON_LENGTH = 40;
const CANNON_HEIGHT = 10;

const CANNON_BALL_RADIUS = 5;



// converting degrees to radians for math purposes
const degreesToRadians = (angle) => {
    return angle * Math.PI / 180;
}

// drawing the cannon
// depending on the angle requested, the cannon barrel should be pointing in 
// a specific direction

/* 
(x2, y2)  _____ (x1, y1)
         /    / 
        /    /    
       /    /   
      /    /
      -----
(x3, y3)   (x_start, y_start)
*/

// This functino will return the coordinates (x1, y1) and (x2, y2) for future 
// reference so that I know where I should position a cannon ball.
const drawCannon = (angle, x_start, y_start) => {

    if (angle > 90 || angle < 0) {
        console.log(`Invalid input angle. Angle should be between 0 and 90 degs.`);
        return {
            frontCoord_1: [-1, -1],
            frontCoord_2: [-1, -1],
        }
    }
    const angleRadians = degreesToRadians(angle);

    ctx.beginPath();
    ctx.moveTo(x_start, y_start);
    
    const x1 = x_start + CANNON_LENGTH * Math.cos(angleRadians);
    const y1 = y_start - CANNON_LENGTH * Math.sin(angleRadians);
    ctx.lineTo(x1, y1);

    const x2 = x1 - CANNON_HEIGHT * Math.sin(angleRadians);
    const y2 = y1 - CANNON_HEIGHT * Math.cos(angleRadians);
    ctx.lineTo(x2, y2);

    const x3 = x2 - CANNON_LENGTH * Math.cos(angleRadians);
    const y3 = y2 + CANNON_LENGTH * Math.sin(angleRadians);
    ctx.lineTo(x3, y3);

    ctx.lineTo(x_start, y_start);

    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    return {
        frontCoord_1: [x1, y1],
        frontCoord_2: [x2, y2],
    }
}

function drawSetting() {

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

    // Example cannon - change the first argument to change the angle,
    // keep the other two parameters fixed.
    const cannonFrontCoords = drawCannon(60, 25, GROUND_Y_COORD);

    ctx.beginPath();
    ctx.arc(25, GROUND_Y_COORD, ROTATION_POINT_RADIUS, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fillStyle = ROTATION_POINT_COLOUR;
    ctx.fill();
    ctx.closePath();

    return cannonFrontCoords
}



// drawing point of rotation - draw it after the cannon so that it appears in
// front of the cannon


function fireProjectile(cannonFrontCoords) {
    const x1 = cannonFrontCoords.frontCoord_1[0];
    const y1 = cannonFrontCoords.frontCoord_1[1];

    const x2 = cannonFrontCoords.frontCoord_2[0];
    const y2 = cannonFrontCoords.frontCoord_2[1];

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

const cannonFrontCoords= drawSetting();
// On fire button click:
const ball_centre = fireProjectile(cannonFrontCoords);

// could find initial height above the ground using length of cannon and launch angle
// and then end the trajectory when the required negative displacement is reached.
// on fire button click:
var t = 0;
var x_start = ball_centre.ball_centre_x;;
var x = x_start;
var y_start = ball_centre.ball_center_y;
var y = y_start;


var init_angle = 60;
var accel = 0.1;
var init_speed = 5;

var startTime = Date.now();


function trackProjectile() {

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawSetting();
    requestAnimationFrame(trackProjectile);
    // console.log(y);
    // console.log(GROUND_Y_COORD);
    if (y >= GROUND_Y_COORD) {
        console.log('Completed journey');
        
    }
    console.log(t)
    
    const angleRads = degreesToRadians(init_angle);
    console.log(angleRads);
    console.log(Math.cos(angleRads))
    console.log(init_speed);
    console.log(init_speed * Math.cos(angleRads))

  
    // if (y - (init_speed * Math.sin(angleRads) * t) + (1/2 * accel * t**2) < GROUND_Y_COORD) {

        x = x_start + init_speed * Math.cos(angleRads) * t;
        y = y_start - (init_speed * Math.sin(angleRads) * t) + (1/2 * accel * t**2);
        t += 5;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, CANNON_BALL_RADIUS, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath(); 
    // }
    
    
}


trackProjectile();











