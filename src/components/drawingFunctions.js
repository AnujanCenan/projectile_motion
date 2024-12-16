import Cannons from "../Cannons.json"


export function getCannonInfo(name) {
  try {
    return Cannons[name];
  } catch (e) {
    console.error("Error at getCannonInfo in drawingFunctions.js");
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
 * @param {number} growth_factor - the scaling factor to be applied to width and height
 *  (value between 0 and 1 will shrink the image, value greater than 1 will enlarge
 *  the image)
 */
function drawImageWithRotation(
  ctx, image, pos_x, pos_y, pivot_x, pivot_y, width, height, angle, growth_factor
) {
  image.onload = () => {

    ctx.translate(pos_x + pivot_x * growth_factor, pos_y + pivot_y * growth_factor);
    
    ctx.rotate(angle * Math.PI / 180);

    ctx.drawImage(image, -pivot_x * growth_factor, -pivot_y * growth_factor, width * growth_factor, height * growth_factor);
    
    ctx.rotate(-angle * Math.PI / 180);
    
    ctx.translate(-pos_x - pivot_x * growth_factor, -pos_y - pivot_y * growth_factor)
  }
}

function drawHolster(ctx, canvas, holsterImage) {
  const TOP_LEFT_CORNER = [
    canvas.width * 0.05,
    canvas.height * 0.73
  ]

  const growth_factor = 0.5;

  holsterImage.onload = () => { 
    // 123, 298 is the size of the image in pixels
    ctx.drawImage(holsterImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1], 123 * growth_factor, 298 * growth_factor);
  }
}

function drawCannon(ctx, canvas, cannonImage, angle, cannonInfo) {

  const TOP_LEFT_CORNER = [
    canvas.width * cannonInfo.scalar_top_corner_x,
    canvas.height * cannonInfo.scalar_top_corner_y
  ]

  drawImageWithRotation(ctx, cannonImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1],
    cannonInfo.pivot_x, cannonInfo.pivot_y, cannonInfo.pixel_width, 
    cannonInfo.pixel_height, angle, cannonInfo.growth_factor
  )

  return TOP_LEFT_CORNER;
}

export function drawRotatedCannon(ctx, canvas, angle, cannonImage, holsterImage, cannonInfo) {

  // drawHolster(ctx, canvas, holsterImage);
  drawCannon(ctx, canvas, cannonImage, angle, cannonInfo);
  drawHolster(ctx, canvas, holsterImage)
}

export function drawDefaultCannon(ctx, canvas, cannonImage, holsterImage, cannonInfo) {
  drawRotatedCannon(ctx, canvas, 0, cannonImage, holsterImage, cannonInfo);
}
