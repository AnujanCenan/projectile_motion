export function drawCannon(ctx, canvas, barrelImage) {
  const BARREL_WIDTH = canvas.width * 0.164;
  const BARREL_HEIGHT = canvas.height * 0.088;
  barrelImage.onload = () => {
    ctx.drawImage(barrelImage, canvas.width * 0.103, canvas.height * 0.768, BARREL_WIDTH, BARREL_HEIGHT, )
  }

}

export function drawCannonPivot(ctx, canvas, wheelImage) {
  const DIAMETER = canvas.height * 0.08;
  wheelImage.onload = () => {
    ctx.drawImage(wheelImage, canvas.width * 0.1, canvas.height * 0.80, DIAMETER, DIAMETER);
  }

}

export function rotateCannon(ctx, canvas, angle, barrelImage, wheelImage) {
  const RADIUS = canvas.height * 0.04;
  ctx.translate(canvas.width * 0.1 + RADIUS, canvas.height * 0.80 + RADIUS); // First translate the context to the center you wish to rotate around.
  ctx.rotate( -angle * Math.PI/180 );
  drawCannon(ctx, canvas, barrelImage);
  drawCannonPivot(ctx, canvas, wheelImage);
  ctx.translate(-canvas.width * 0.1 - RADIUS, -canvas.height * 0.80 - RADIUS); // First translate the context to the center you wish to rotate around.

}

// export function drawCannon(ctx, canvas, pivot_x, pivot_y, angle) {

// }