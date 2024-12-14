import Cannons from "../Cannons.json"


export function getCannonInfo(name) {
  try {
    const cannonInfo = Cannons[name];
    return [
      cannonInfo.pixel_width, 
      cannonInfo.pixel_height, 
      cannonInfo.scalar_top_corner_x, 
      cannonInfo.scalar_top_corner_y,
      cannonInfo.pivot_x,
      cannonInfo.pivot_y,
      cannonInfo.shrinking_factor
    ]
  } catch (e) {
    console.error("Error at getCannonInfo in drawingFunctions.js");
    console.error(e.message);
  }

}

function drawImageWithRotation(
  ctx, image, pos_x, pos_y, pivot_x, pivot_y, width, height, angle, shrinking_factor
) {
  image.onload = () => {
    ctx.translate(pos_x + pivot_x, pos_y + pivot_y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -pivot_x, -pivot_y, width * shrinking_factor, height * shrinking_factor);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.translate(-pos_x - pivot_x, -pos_y - pivot_y)

  }
}

function drawHolster(ctx, canvas, holsterImage) {
  const TOP_LEFT_CORNER = [
    canvas.width * 0.05,
    canvas.height * 0.73
  ]

  holsterImage.onload = () => { 
    // 123, 298 is the size of the image in pixels
    ctx.drawImage(holsterImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1], 123 * 0.5, 298 * 0.5);
  }
}

function drawCannon(
  ctx, canvas, cannonImage, angle,
  pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, 
  pivot_x, pivot_y, shrinking_factor
) {

  const TOP_LEFT_CORNER = [
    canvas.width * scalar_top_corner_x,
    canvas.height * scalar_top_corner_y
  ]

  drawImageWithRotation(ctx, cannonImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1],
    pivot_x, pivot_y, pixel_width, pixel_height, angle, shrinking_factor)

  return TOP_LEFT_CORNER;
}

export function drawRotatedCannon(
  ctx, canvas, angle, cannonImage, holsterImage, 
  pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, 
  pivot_x, pivot_y, shrinking_factor
) {
  drawHolster(ctx, canvas, holsterImage);
  console.log("IN the drawing funciton")
  console.log(pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, pivot_x, pivot_y);

  drawCannon(
    ctx, canvas, cannonImage, angle, 
    pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, 
    pivot_x, pivot_y, shrinking_factor
  );
}

export function drawDefaultCannon(
  ctx, canvas, cannonImage, holsterImage,
  pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, 
  pivot_x, pivot_y, shrinking_factor
) {
  
  drawRotatedCannon(
    ctx, canvas, 0, cannonImage, holsterImage,
    pixel_width, pixel_height, scalar_top_corner_x, scalar_top_corner_y, 
    pivot_x, pivot_y, shrinking_factor
  );
}
