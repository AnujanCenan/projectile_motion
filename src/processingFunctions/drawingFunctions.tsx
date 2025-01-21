import Cannons from "../Cannons.json"

export function getCannonInfo(name: "v2") {
  return Cannons[name];
}

export function getHolsterInfo(name: "holster_v1") {
  return Cannons[name];
}

export function getVelocitySliderInfo(name: "velocity_slider") {
  return Cannons[name];
}

/**
 * @param {CanvasRenderingContext2D} ctx - the context for the canvas
 * @param {HTMLImageElement} image - the image you wish to draw
 * @param {number} pos_x - the x (pixel) coordinate of the top left corner of the image
 * @param {number} pos_y - the y (pixel) coordinate of the top left corner of the image
 * @param {number} pivot_x - the x (pixel) coorindate of the pivot in the ORIGINAL IMAGE
 * @param {number} pivot_y - the y (pixel) coorindate of the pivot in the ORIGINAL IMAGE
 * @param {number} width - the pixel width of the ORIGINAL IMAGE
 * @param {number} height - the pixel height of the ORIGINAL IMAGE
 * @param {number} angle - the desired angle of rotation (clockwise is the positive direction)
 * @param {number} growthFactor - the scaling factor to be applied to width and height
 *  (value between 0 and 1 will shrink the image, value greater than 1 will enlarge
 *  the image)
 */
export function drawImageWithRotation(
  ctx: CanvasRenderingContext2D, 
  image: HTMLImageElement, 
  pos_x: number, 
  pos_y: number, 
  pivot_x: number, 
  pivot_y: number, 
  width: number, 
  height: number, 
  angle: number, 
  growthFactor: number
) {
    
    ctx.translate(pos_x + pivot_x * growthFactor, pos_y + pivot_y * growthFactor);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -pivot_x * growthFactor, -pivot_y * growthFactor, width * growthFactor, height * growthFactor);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.translate(-pos_x - pivot_x * growthFactor, -pos_y - pivot_y * growthFactor)
}

export function drawImageNoRotation(
  ctx: CanvasRenderingContext2D, 
  image: HTMLImageElement, 
  pos_x: number, 
  pos_y: number,  
  width: number, 
  height: number, 
  growthFactor: number
) {
  drawImageWithRotation(ctx, image, pos_x, pos_y, 0, 0, width, height, 0, growthFactor);
}

export function drawCircle(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  r: number, 
  fillColour: string, 
  strokeColour: string
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = fillColour;
  ctx.strokeStyle = strokeColour;
  ctx.stroke();
  ctx.fill();
}

export function isLandscape() {
  return window.innerWidth > window.innerHeight;
}
