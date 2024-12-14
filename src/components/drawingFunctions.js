function drawImageWithRotation(
  ctx, image, pos_x, pos_y, pivot_x, pivot_y, width, height, angle
) {
  image.onload = () => {
    ctx.translate(pos_x + pivot_x, pos_y + pivot_y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(image, -pivot_x, -pivot_y, width, height);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.translate(-pos_x - pivot_x, -pos_y - pivot_y)

  }
}

export function drawHolster(ctx, canvas, holsterImage) {
  const TOP_LEFT_CORNER = [
    canvas.width * 0.05,
    canvas.height * 0.73
  ]

  holsterImage.onload = () => { 
    // 123, 298 is the size of the image in pixels
    ctx.drawImage(holsterImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1], 123, 298);
  }
}

export function drawCannon(ctx, canvas, cannonImage, angle) {

  const TOP_LEFT_CORNER = [
    canvas.width * 0.02,
    canvas.height * 0.65
  ]

  const PIVOT_POS = [
    227, 118 // taken from the image
  ] 

  drawImageWithRotation(ctx, cannonImage, TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1],
    PIVOT_POS[0], PIVOT_POS[1], 849, 251, angle)

  return TOP_LEFT_CORNER;
}

export function drawRotatedCannon(ctx, canvas, angle, cannonImage, holsterImage) {
  drawHolster(ctx, canvas, holsterImage);
  drawCannon(ctx, canvas, cannonImage, angle);
}

export function drawDefaultCannon(ctx, canvas, cannonImage, holsterImage) {
  drawRotatedCannon(ctx, canvas, 0, cannonImage, holsterImage);
}
