import Cannons from "../Cannons.json"
import { calclateGrowthFactorVelocity, calculateGrowthFactorHeight, calculateGrowthFactorCannon } from "./calculateGrowthFactor";
import { topLeftCornerArrow, topLeftCornerHeightScale, topLeftCornerVelocityBar } from "./topLeftCorners";

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
function drawImageWithRotation(
  ctx, image, pos_x, pos_y, pivot_x, pivot_y, width, height, angle, growthFactor
) {

    ctx.translate(pos_x + pivot_x * growthFactor, pos_y + pivot_y * growthFactor);
    
    ctx.rotate(angle * Math.PI / 180);

    ctx.drawImage(image, -pivot_x * growthFactor, -pivot_y * growthFactor, width * growthFactor, height * growthFactor);
    ctx.rotate(-angle * Math.PI / 180);
    
    ctx.translate(-pos_x - pivot_x * growthFactor, -pos_y - pivot_y * growthFactor)

}

function drawHolster(ctx, canvas, holsterImage, holsterInfo, USER_ANCHOR_POINT, growthFactor) {
  const TOP_LEFT_CORNER = [
    canvas.width * USER_ANCHOR_POINT[0] - holsterInfo.pivot_x * growthFactor,
    canvas.height * USER_ANCHOR_POINT[1] - holsterInfo.pivot_y * growthFactor
  ]
  
  drawImageWithRotation(ctx, holsterImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1],
    holsterInfo.pivot_x, holsterInfo.pivot_y, holsterInfo.pixel_width, 
    holsterInfo.pixel_height, 0, growthFactor
  )
}

function drawCannon(ctx, canvas, cannonImage, angle, cannonInfo, USER_ANCHOR_POINT, growthFactor) {

  const TOP_LEFT_CORNER = [
    canvas.width * USER_ANCHOR_POINT[0] - cannonInfo.pivot_x * growthFactor,
    canvas.height * USER_ANCHOR_POINT[1] - cannonInfo.pivot_y * growthFactor
  ]

  drawImageWithRotation(ctx, cannonImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1],
    cannonInfo.pivot_x, cannonInfo.pivot_y, cannonInfo.pixel_width, 
    cannonInfo.pixel_height, angle, growthFactor
  )

  return TOP_LEFT_CORNER;
}

export function drawRotatedCannon(ctx, canvas, angle, cannonImage, holsterImage, cannonInfo, holsterInfo, USER_ANCHOR_POINT) {
  const growthFactor = calculateGrowthFactorCannon(cannonInfo)
  drawHolster(ctx, canvas, holsterImage, holsterInfo, USER_ANCHOR_POINT, growthFactor)
  drawCannon(ctx, canvas, cannonImage, angle, cannonInfo, USER_ANCHOR_POINT, growthFactor);
}

export function drawDefaultCannon(ctx, canvas, cannonImage, holsterImage, cannonInfo, holsterInfo, USER_ANCHOR_POINT) {
  const growthFactor = calculateGrowthFactorCannon(cannonInfo);
  holsterImage.onload = () => {
    drawHolster(ctx, canvas, holsterImage, holsterInfo, USER_ANCHOR_POINT, growthFactor)
  }

  cannonImage.onload = () => {
    drawCannon(ctx, canvas, cannonImage, 0, cannonInfo, USER_ANCHOR_POINT, growthFactor)
  }
}

export function drawVelocitySlider(ctx, canvas, velocityBar, velocitySlider, cannonPosition, launchVelocity, MAX_SPEED) {

  const [pos_x, pos_y] = topLeftCornerVelocityBar(cannonPosition, canvas)

  // TODO: dynamic growth factor - similar to the cannon growth factor
  const growthFactor = calclateGrowthFactorVelocity(canvas);
  drawImageWithRotation(ctx, velocityBar, pos_x, pos_y, 0, 0, 817, 25, 0, growthFactor)

  const sliderPosY = pos_y - 51/4 * growthFactor;

  const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
  const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;

  drawImageWithRotation(ctx, velocitySlider, sliderPosX, sliderPosY, 0, 0, 50, 51, 0, growthFactor)


}

export function drawDefaultVelocitySlider(ctx, canvas, velocityBar, velocitySlider, cannonPosition, MAX_SPEED, launchVelocity) {
  const [pos_x, pos_y] = topLeftCornerVelocityBar(cannonPosition, canvas)

  const growthFactor = calclateGrowthFactorVelocity(canvas);

  velocityBar.onload = () => {
    drawImageWithRotation(ctx, velocityBar, pos_x, pos_y, 0, 0, 817, 25, 0, growthFactor)
    const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;
    const sliderPosY = pos_y - 51/4 * growthFactor;
  
    velocitySlider.onload = () => {
      drawImageWithRotation(ctx, velocitySlider, sliderPosX, sliderPosY, 0, 0, 50, 51, 0, growthFactor)
    }
  }

  // TODO: This code is repeated in drawVelocitySlider – could improve code quality

}

export function drawHeightScale(ctx, canvas, heightScale, heightArrow, cannonPosition, height_scalar) {
  const [pos_x, pos_y] = topLeftCornerHeightScale(cannonPosition, canvas);
  const growthFactor = calculateGrowthFactorHeight(canvas);
  drawImageWithRotation(ctx, heightScale, pos_x, pos_y, 0, 0, 158, 917, 0, growthFactor);

  const [arrowPosX, arrowPosY] = topLeftCornerArrow(cannonPosition, canvas, height_scalar);
  drawImageWithRotation(ctx, heightArrow, arrowPosX, arrowPosY, 0, 0, 103, 63, 0, growthFactor);
}

export function drawDefaultHeightScale(ctx, canvas, heightScale, heightArrow, cannonPosition, height_scalar) {
  const [pos_x, pos_y] = topLeftCornerHeightScale(cannonPosition, canvas);
  const growthFactor = calculateGrowthFactorHeight(canvas);
  
  heightScale.onload = () => {
    drawImageWithRotation(ctx, heightScale, pos_x, pos_y, 0, 0, 158, 917, 0, growthFactor);
    // TODO: add this code to the top left corner file
    const [arrowPosX, arrowPosY] = topLeftCornerArrow(cannonPosition, canvas, height_scalar);
    drawImageWithRotation(ctx, heightArrow, arrowPosX, arrowPosY, 0, 0, 103, 63, 0, growthFactor);
  }


  


}

export function drawCircle(ctx, x, y, r, fillColour, strokeColour) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = fillColour;
  ctx.strokeColour = strokeColour;
  ctx.stroke();
  ctx.fill();
}
