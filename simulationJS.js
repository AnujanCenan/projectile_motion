// Big shout out to Chris Courses 
// https://www.youtube.com/watch?v=EO6OkltgudE&t=213s

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth * 3/4;
canvas.height = window.innerHeight * 1/2;
var ctx = canvas.getContext("2d"); // passing a ton of methods through ctx; it's a magic paintbrush

const GROUND_Y_COORD = canvas.height * (7/8);
const GROUND_COLOUR = '#00ad14'
const SKY_COLOUR = '#00aaff'
const ROTATION_POINT_COLOUR = '#6b423f'

const ROTATION_POINT_RADIUS = 10;

const CANNON_LENGTH = 40;
const CANNON_HEIGHT = 10;



// converting degrees to radians for math purposes
const degreesToRadians = (angle) => {
    return angle * Math.PI / 180;
}


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


// drawing the cannon
// depending on the angle requested, the cannon barrel should be pointing in 
// a specific direction



const drawCannon = (angle, x_start, y_start) => {
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

    return {
        frontCoord_1: [x1, y1],
        frontCoord_2: [x2, y2],
    }
}

const cannonFrontCoords = drawCannon(45, 25, GROUND_Y_COORD);

// drawing point of rotation
ctx.beginPath();
ctx.arc(25, GROUND_Y_COORD, ROTATION_POINT_RADIUS, 0, Math.PI * 2, false);
ctx.stroke();
ctx.fillStyle = ROTATION_POINT_COLOUR;
ctx.fill();
ctx.closePath();










