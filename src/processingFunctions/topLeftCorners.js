import { calculateGrowthFactorCannon } from "./calculateGrowthFactor";
import { findPivotGlobalCoords } from "./findPivotGlobalCoords";


export function findCannonTopLeftGlobalCoords(canvas, USER_ANCHOR_POINT, cannonInfo) {
  const [piv_x, piv_y] = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT);
  return [
    piv_x - cannonInfo.pivot_x * calculateGrowthFactorCannon(canvas, cannonInfo),
    piv_y - cannonInfo.pivot_y * calculateGrowthFactorCannon(canvas, cannonInfo)
  ];
}

export function topLeftConerVelocityBar(cannonPosition, canvas) {
  const pos_x = cannonPosition[0];
  const pos_y = 0.80 * canvas.height + (298 - 60);
  // 0.80 * canvas.height is the y coordinate of the global pivot
  // 298 is the height of the holster, 60 is the y coordinate of the pivot on the holster

  return [pos_x, pos_y]
}