import Cannons from "../Cannons.json"
import { calculateGrowthFactorHeight } from "./calculateGrowthFactor";
import { topLeftCornerArrow, topLeftCornerHeightScale } from "./topLeftCorners";

export function getCannonInfo(name) {
  try {
    return Cannons[name];
  } catch (e) {
    console.error("Error at getCannonInfo in drawingFunctions.js");
    console.error(e.message);
  }
}

export function getHolsterInfo(name) {
  try {
    return Cannons[name];
  } catch (e) {
    console.error("Error at getHolsterInfo in drawingFunctions.js");
    console.error(e.message);
  }
}

export function getVelocitySliderInfo(name) {
  try {
    return Cannons[name];
  } catch (e) {
    console.error("Error at getVelocitySliderInfo in drawingFunctions.js");
    console.error(e.message);
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx - the context for the canvas
 * @param {ImageElement} image - the image you wish to draw
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
  ctx, image, pos_x, pos_y, pivot_x, pivot_y, width, height, angle, growthFactor
) {

    ctx.translate(pos_x + pivot_x * growthFactor, pos_y + pivot_y * growthFactor);
    
    ctx.rotate(angle * Math.PI / 180);

    ctx.drawImage(image, -pivot_x * growthFactor, -pivot_y * growthFactor, width * growthFactor, height * growthFactor);
    ctx.rotate(-angle * Math.PI / 180);
    
    ctx.translate(-pos_x - pivot_x * growthFactor, -pos_y - pivot_y * growthFactor)

}

export function drawCircle(ctx, x, y, r, fillColour, strokeColour) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = fillColour;
  ctx.strokeColour = strokeColour;
  ctx.stroke();
  ctx.fill();
}

export function isLandscape() {
  return window.innerWidth > window.innerHeight;
}
