export const CANVAS_WIDTH = window.innerWidth * 1;
export const CANVAS_HEIGHT = window.innerHeight * 4/5;

export const ROTATION_POINT_RADIUS = 20;
export const CANNON_BORDER_THICKNESS = 5;

// Length : Height = 4 : 1 
export const CANNON_HEIGHT = ROTATION_POINT_RADIUS; 
export const CANNON_HEIGHT_W_BORDERS = CANNON_HEIGHT + CANNON_BORDER_THICKNESS;
export const CANNON_LENGTH = CANNON_HEIGHT * 4;
export const CANNON_LENGTH_W_BORDERS = CANNON_LENGTH + CANNON_BORDER_THICKNESS

export const CANNON_BALL_RADIUS = CANNON_HEIGHT / 2;
export const CANNON_PIVOT_X = ROTATION_POINT_RADIUS + 50;

export const GROUND_Y_COORD = window.innerHeight * 3/4 * (7/8);

export const METRES_TO_PX = (window.innerWidth * 1 - CANNON_PIVOT_X) / 100;

// Colours
export const GROUND_COLOUR = '#00ad14'
export const SKY_COLOUR = '#00aaff'
export const ROTATION_POINT_COLOUR = '#6b423f'
export const CANNON_COLOUR = '#333333'