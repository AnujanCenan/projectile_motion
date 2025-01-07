import { calculateGrowthFactorCannon } from "./calculateGrowthFactor";
import { findPivotGlobalCoords } from "./findPivotGlobalCoords";


export function findCannonTopLeftGlobalCoords(canvas, USER_ANCHOR_POINT, cannonInfo) {
  const [piv_x, piv_y] = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT);
  return [
    piv_x - cannonInfo.pivot_x * calculateGrowthFactorCannon(cannonInfo),
    piv_y - cannonInfo.pivot_y * calculateGrowthFactorCannon(cannonInfo)
  ];
}

export function topLeftCornerVelocityBar(cannonPosition, canvas) {
  const pos_x = cannonPosition[0];
  const pos_y = cannonPosition[1] + 0.2 * canvas.height;
  return [pos_x, pos_y]
}