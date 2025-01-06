import { calclateGrowthFactorVelocity, calculateGrowthFactorCannon } from "./calculateGrowthFactor";
import { findPivotGlobalCoords } from "./findPivotGlobalCoords";

////////////////////////////////////// Clicked on Cannon //////////////////////////////////////////////

export function clickedOnCannon(
  ctx, canvas, mouse_x, mouse_y, cannonInfo, angle, clickedBehindPivot,
  USER_ANCHOR_POINT
) {

  mouse_x *= window.devicePixelRatio;
  mouse_y *= window.devicePixelRatio;

  const [TOP_LEFT_CORNER, v1, v2] = findCannonPointAndPlane(canvas, cannonInfo, angle, USER_ANCHOR_POINT);
  var lambda, mu;
  if (angle === 90) {
    [lambda, mu] = clickedOnUprightCannon(
        mouse_x, mouse_y, TOP_LEFT_CORNER,
        cannonInfo.pixel_width, 
        calculateGrowthFactorCannon(canvas, cannonInfo)
      )
  } else {
    [lambda, mu] = calculateLambdaAndMu(
        TOP_LEFT_CORNER, v1[0], v1[1], v2[0], v2[1], 
        mouse_x, mouse_y
      );
  }

  console.log(lambda, mu)

  if (!evaluateLambdaAndMu(lambda, mu)) {
    console.log('didnt click')
    return false;
  }
  console.log('evaluated well')

  const proposedX = TOP_LEFT_CORNER[0] + lambda * v1[0] + mu * v2[0];
  const proposedY = TOP_LEFT_CORNER[1] + lambda * v1[1] + mu * v2[1];


  // Transparency Check
  let transparency = false;
  var p = ctx.getImageData(mouse_x, mouse_y, 1, 1).data;
  if (p[0] === 0 && p[1] === 0 && p[2] === 0 && p[3] === 0) transparency = true;

  // Pivot Position Check
  clickedBehindPivot.current = 1;
  if (lambda < cannonInfo.pivot_x / cannonInfo.pixel_width) {
    clickedBehindPivot.current = -1;
  }

  if (!transparency) {
    ctx.beginPath();
    ctx.arc(proposedX, proposedY, 15, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }
  return !transparency;
}

function findCannonPointAndPlane(canvas, cannonInfo, angle, USER_ANCHOR_POINT) {
  
  const growthFactor = calculateGrowthFactorCannon(canvas, cannonInfo)
  
  const [PIVOT_X_GLOBAL, PIVOT_Y_GLOBAL] = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT)
  
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

function clickedOnUprightCannon(mouse_x, mouse_y, TOP_LEFT_CORNER,
  pixel_width, growthFactor) {

  const mu = (mouse_x - TOP_LEFT_CORNER[0]) / 
    ((pixel_width) * growthFactor);

  const lambda = (TOP_LEFT_CORNER[1] - mouse_y) / 
    ((pixel_width) * growthFactor);

  return [lambda, mu]
}

///////////////////////////////// Clicked on Velocity Slider //////////////////////////////////////////////
export function clickedOnVelocitySlider(mouse_x, mouse_y, speed, velocityBarWidth, velocityBarHeight, sliderWidth, sliderHeight, TOP_LEFT_BAR, MAX_SPEED, growthFactor) {
  mouse_x *= window.devicePixelRatio;
  mouse_y *= window.devicePixelRatio;
  
  const centreX = TOP_LEFT_BAR[0] + (speed / MAX_SPEED) * velocityBarWidth * growthFactor;
  const centreY = TOP_LEFT_BAR[1] + (velocityBarHeight * growthFactor) / 2;
  const TOP_LEFT_SLIDER = [centreX - (sliderWidth * growthFactor) / 2, centreY - (sliderHeight * growthFactor) / 2];

  const [lambda, mu] = calculateLambdaAndMu(TOP_LEFT_SLIDER, sliderWidth * growthFactor, 0, 0, sliderHeight * growthFactor, mouse_x, mouse_y);

  return evaluateLambdaAndMu(lambda, mu)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function evaluateLambdaAndMu(lambda, mu) {
  if (lambda < 0 || lambda > 1 || mu < 0 || mu > 1) {
    return false;
  } else {
    return true;
  }

  // return !(lambda < 0 || lambda > 1 || mu < 0 || mu > 1) 
}

function drawCircle(ctx, x, y, r, colour) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = colour;
  ctx.fill();
}