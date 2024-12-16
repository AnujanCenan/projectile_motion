export function clickedOnCannon(ctx, canvas, mouse_x, mouse_y, cannonInfo, angle) {

  const [TOP_LEFT_CORNER, v1, v2] = findCannonPointAndPlane(ctx, canvas, cannonInfo, angle);
  
  mouse_x *= window.devicePixelRatio;
  mouse_y *= window.devicePixelRatio;

  console.log(`mouse coords = ${mouse_x}, ${mouse_y}`);
  console.log(`TOP LEFT CORNER COORDS = ${TOP_LEFT_CORNER[0]}, ${TOP_LEFT_CORNER[1]}`);


  let x1 = v1[0];
  let y1 = v1[1];
  let x2 = v2[0];
  let y2 = v2[1];

  if (x1 === 0) x1 = 0.01
  if (y1 === 0) y1 = 0.01
  if (x2 === 0) x2 = 0.01
  if (y2 === 0) y2 = 0.01





  // if x1, x2, y1 or y2 is 0, there will be a division by 0 error
  

  // const mu = ((y1 / x1) * (mouse_x - TOP_LEFT_CORNER[0]) - (mouse_y - TOP_LEFT_CORNER[1])) * (x1 / (x2 * y1 * y2));
  // const lambda = ((mouse_x - TOP_LEFT_CORNER[0]) - x2 * mu) / x1;






//  y1 * (mouse_x - TOP_LEFT_CORNER[0]) = y1 * (lambda * x1 + mu * x2);
//  x1 * (mouse_y - TOP_LEFT_CORNER[1]) = x1 * (lambda * y1 + mu * y2);

//  y1 * (mouse_x - TOP_LEFT_CORNER[0]) = y1 * lambda * x1 + y1 * mu * x2;
//  x1 * (mouse_y - TOP_LEFT_CORNER[1]) = x1 * lambda * y1 + x1 * mu * y2;


// y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = (y1 * lambda * x1 + y1 * mu * x2) - (x1 * lambda * y1 + x1 * mu * y2)
// y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = (y1 * mu * x2) - (x1 * mu * y2)
// y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1]) = mu * ((y1  * x2) - (x1  * y2))

const mu = (y1 * (mouse_x - TOP_LEFT_CORNER[0]) - x1 * (mouse_y - TOP_LEFT_CORNER[1])) / ((y1  * x2) - (x1  * y2))    // look for when there are no solutions in the system – shouldnt happen

//  (mouse_x - TOP_LEFT_CORNER[0] -  mu * x2) / x1  = lambda ;

const lambda =  (mouse_x - TOP_LEFT_CORNER[0] -  mu * x2) / x1;

const proposedX = TOP_LEFT_CORNER[0] + lambda * x1 + mu * x2;
const proposedY = TOP_LEFT_CORNER[1] + lambda * y1 + mu * y2;

console.log(`lambda, mu = ${lambda}, ${mu}`);


console.log(`proposed Coords are ${proposedX}, ${proposedY}`)

  ctx.beginPath();
  ctx.arc(proposedX, proposedY, 2, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.stroke();



  console.log(`pixel height of cannon is ${cannonInfo.pixel_height}`)
  console.log(`pixel width of cannon is ${cannonInfo.pixel_width}`)

  console.log(`fraction of height of cannon is ${cannonInfo.pixel_height * mu}`)


  const pixel_num = (cannonInfo.pixel_height * mu * cannonInfo.pixel_width) + lambda * cannonInfo.pixel_width;
  console.log(Math.round(pixel_num))


    // if we didnt even click on the cannon Image
    //      return false

    // if the pixel, mapped to the original image is transparent
    //      return false

    // return true

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

  ctx.beginPath();
  ctx.arc(TOP_LEFT_CORNER[0], TOP_LEFT_CORNER[1], 10, 0, 2 * Math.PI);
  ctx.stroke();

  // notice the - sign for the y coordinate – because vector 1 is always directed
  // either perfectly horizontally or in some UPWARD direction
  const vector1 = [
    (cannonInfo.pixel_width * growthFactor) * Math.cos(angle_rad),
    -(cannonInfo.pixel_width * growthFactor) * Math.sin(angle_rad)
  ]

  console.log(`Vector 1 = ${vector1[0]}, ${vector1[1]}`);

  ctx.beginPath();
  ctx.arc(TOP_LEFT_CORNER[0] + vector1[0], TOP_LEFT_CORNER[1] + vector1[1], 10, 0, 2 * Math.PI);
  ctx.strokeStyle = "blue";
  ctx.stroke();

  const vector2 = [
    (cannonInfo.pixel_height * growthFactor) * Math.cos(Math.PI / 2 - angle_rad),
    (cannonInfo.pixel_height * growthFactor) * Math.sin(Math.PI / 2 - angle_rad)
  ]

  console.log(`Vector 2 = ${vector2[0]}, ${vector2[1]}`);

  ctx.beginPath();
  ctx.arc(TOP_LEFT_CORNER[0] + vector2[0], TOP_LEFT_CORNER[1] + vector2[1], 10, 0, 2 * Math.PI);
  ctx.stroke();


  ctx.beginPath();
  ctx.arc(TOP_LEFT_CORNER[0] + vector1[0] + vector2[0], TOP_LEFT_CORNER[1] - vector1[1] + vector2[1], 10, 0, 2 * Math.PI);
  ctx.stroke();

  return [TOP_LEFT_CORNER, vector1, vector2]
  
}