import { calculateGrowthFactorCannon } from "./calculateGrowthFactor";

export function findPivotGlobalCoords(canvas, USER_ANCHOR_POINT) {
  const pivX = canvas.width * USER_ANCHOR_POINT[0]

  const pivY = canvas.height * USER_ANCHOR_POINT[1]

  return [pivX, pivY]
}

export function findCannonTopLeftGlobalCoords(canvas, USER_ANCHOR_POINT, cannonInfo) {
  console.log(`USER ANCHOR POINT = ${USER_ANCHOR_POINT}`)
  console.log(`Cannon Info = ${cannonInfo}`)
  const [piv_x, piv_y] = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT);
  console.log(`generated pivot = ${piv_x}, ${piv_y}`);
  console.log(`generated coords = ${piv_x - cannonInfo.pivot_x * calculateGrowthFactorCannon(canvas, cannonInfo)}, ${piv_y - cannonInfo.pivot_y * calculateGrowthFactorCannon(canvas, cannonInfo)}`)
  return [
    piv_x - cannonInfo.pivot_x * calculateGrowthFactorCannon(canvas, cannonInfo),
    piv_y - cannonInfo.pivot_y * calculateGrowthFactorCannon(canvas, cannonInfo)
  ];
}