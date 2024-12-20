export function clickedOnCannon(ctx, canvas, mouse_x, mouse_y, cannonInfo, angle, clickedBehindPivot) {

  const [TOP_LEFT_CORNER, v1, v2] = findCannonPointAndPlane(ctx, canvas, cannonInfo, angle);
  mouse_x *= window.devicePixelRatio;
  mouse_y *= window.devicePixelRatio;


  var [lambda, mu] = calculateLambdaAndMu(TOP_LEFT_CORNER, v1[0], v1[1], v2[0], v2[1], mouse_x, mouse_y);

  // special case: if elevation angle is 90 degrees (straight up), then the original
  // math for calculating lambda and mu fails

  if (angle === 90) {
    mu = (mouse_x - TOP_LEFT_CORNER[0]) / 
      ((cannonInfo.pixel_height) * cannonInfo.growth_factor)

    lambda = (TOP_LEFT_CORNER[1] - mouse_y) / 
      ((cannonInfo.pixel_width) * cannonInfo.growth_factor);
  }

  if (lambda < 0 || lambda > 1 || mu < 0 || mu > 1) {
    return false;
  }
  const proposedX = TOP_LEFT_CORNER[0] + lambda * v1[0] + mu * v2[0];
  const proposedY = TOP_LEFT_CORNER[1] + lambda * v1[1] + mu * v2[1];

  ctx.beginPath();
  ctx.arc(proposedX, proposedY, 15, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Transparency Check
  let transparency = false;
  var p = ctx.getImageData(mouse_x, mouse_y, 1, 1).data;
  if (p[0] === 0 && p[1] === 0 && p[2] === 0 && p[3] === 0) transparency = true;

  // Pivot Position Check
  clickedBehindPivot.current = 1;
  if (lambda < cannonInfo.pivot_x / cannonInfo.pixel_width) {
    clickedBehindPivot.current = -1;
  }

 return !transparency;
}

function findCannonPointAndPlane(ctx, canvas, cannonInfo, angle) {
  const W = canvas.width;
  const H = canvas.height;
  
  const growthFactor = cannonInfo.growth_factor;
  
  const PIVOT_X_GLOBAL = W * cannonInfo.scalar_top_corner_x + cannonInfo.pivot_x * growthFactor;
  const PIVOT_Y_GLOBAL = H * cannonInfo.scalar_top_corner_y + cannonInfo.pivot_y * growthFactor;

  
  const angle_rad = angle * Math.PI / 180

  const alpha = Math.atan(cannonInfo.pivot_y / cannonInfo.pivot_x);

  const beta = alpha - angle_rad;
  const b = Math.PI - beta;

  const radius = Math.sqrt(
      (cannonInfo.pivot_x * growthFactor) * (cannonInfo.pivot_x * growthFactor) + 
      (cannonInfo.pivot_y * growthFactor) * (cannonInfo.pivot_y * growthFactor))

  const X_DISPLACEMENT_FROM_PIVOT = radius * Math.cos(b);
  const Y_DISPLACEMENT_FROM_PIVOT = radius * Math.sin(b);
  
  // notice the - sign for the y coordinate; this is because UP is the NEGATIVE DIRECTION
  const TOP_LEFT_CORNER = [
    PIVOT_X_GLOBAL + X_DISPLACEMENT_FROM_PIVOT, 
    PIVOT_Y_GLOBAL - Y_DISPLACEMENT_FROM_PIVOT
  ]

  // notice the - sign for the y coordinate – because vector 1 is always directed
  // either perfectly horizontally or in some UPWARD direction
  const vector1 = [
    (cannonInfo.pixel_width * growthFactor) * Math.cos(angle_rad),
    -(cannonInfo.pixel_width * growthFactor) * Math.sin(angle_rad)
  ]

  const vector2 = [
    (cannonInfo.pixel_height * growthFactor) * Math.cos(Math.PI / 2 - angle_rad),
    (cannonInfo.pixel_height * growthFactor) * Math.sin(Math.PI / 2 - angle_rad)
  ]
  return [TOP_LEFT_CORNER, vector1, vector2]
}

function calculateLambdaAndMu(TOP_LEFT_CORNER, x1, y1, x2, y2, mouse_x, mouse_y) {

  // TODO: move this working out to proper documentation
  
  // if x1, x2, y1 or y2 is 0, there will be a division by 0 error

  // mouse_x = TOP_LEFT_CORNER[0] + lambda * x1 + mu * x2   (1)
  // mouse_y = TOP_LEFT_CORNER[1] + lambda * y1 + mu * y2   (2)

  // mouse_x - TOP_LEFT_CORNER[0] = lambda * x1 + mu * x2   (1) (rearranged)
  // mouse_y - TOP_LEFT_CORNER[1] = lambda * y1 + mu * y2   (2) (rearranged)

  //  y1 * (mouse_x - TOP_LEFT_CORNER[0]) = y1 * (lambda * x1 + mu * x2)    (1) (multiply y1 to both sides)
  //  x1 * (mouse_y - TOP_LEFT_CORNER[1]) = x1 * (lambda * y1 + mu * y2)    (2) (multiply x1 to both sides)

  //  y1 * (mouse_x - TOP_LEFT_CORNER[0]) = y1 * lambda * x1 + y1 * mu * x2;  (1) (expand right hand side)
  //  x1 * (mouse_y - TOP_LEFT_CORNER[1]) = x1 * lambda * y1 + x1 * mu * y2;  (2) (expand right hand side)


  // y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = (y1 * lambda * x1 + y1 * mu * x2) - (x1 * lambda * y1 + x1 * mu * y2)  (3) ( (2) - (1) )
  // y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = (y1 * mu * x2) - (x1 * mu * y2)      (collect like terms on the right hand side)
  // y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = mu * ((y1  * x2) - (x1  * y2))       (factorise out the mu on the right hand side)

  const mu = (y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1])) / ((y1  * x2) - (x1  * y2))    // make mu the subject

  //  (mouse_x - TOP_LEFT_CORNER[0] -  mu * x2) / x1  = lambda      (rearranging (1) to make lambda the subject )

  const lambda =  (mouse_x - TOP_LEFT_CORNER[0] -  mu * x2) / x1;
  return [lambda, mu]
}