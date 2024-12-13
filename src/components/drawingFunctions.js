// Let "height" of ground be 180 px
// So y pos of the bottom of the cannon's wheel is canvas.height - the image height - 180
// x position we can always make 0.08 * canvas.width

export function drawCannon(ctx, canvas, barrelImage) {
  barrelImage.onload = () => {
    ctx.drawImage(barrelImage, canvas.width * 0.08, canvas.height - 1494 * 0.2 - 350, 3296 * 0.2, 1494 * 0.2)
  }
}

// export function drawCannonPivot(ctx, canvas, wheelImage) {
//   const DIAMETER = canvas.height * 0.08;
//   wheelImage.onload = () => {
//     ctx.drawImage(wheelImage, canvas.width * 0.1, canvas.height * 0.80, DIAMETER, DIAMETER);
//   }

// }

export function rotateCannon(ctx, canvas, angle, cannonImage) {
  const TOP_LEFT_CORNER = [
    canvas.width * 0.08, 
    canvas.height - 1494 * 0.2 - 350
  ]

  console.log(TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1]);

  const PIVOT_POS = [
    3263 * 0.2, 387 * 0.2 // taken from the image
  ] 

  ctx.translate(TOP_LEFT_CORNER[0] + PIVOT_POS[0], TOP_LEFT_CORNER[1] + PIVOT_POS[1]); // First translate the context to the center you wish to rotate around.

  ctx.rotate( -angle * Math.PI/180);
  drawCannon(ctx, canvas, cannonImage);
  // drawCannonPivot(ctx, canvas, wheelImage);
  ctx.translate(-TOP_LEFT_CORNER[0] - PIVOT_POS[0], -TOP_LEFT_CORNER[1] - PIVOT_POS[1]); // First translate the context to the center you wish to rotate around.

}