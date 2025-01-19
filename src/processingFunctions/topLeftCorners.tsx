import { calculateGrowthFactorCannon, calculateGrowthFactorHeight } from "./calculateGrowthFactor.tsx";
import { findPivotGlobalCoords } from "./findPivotGlobalCoords.tsx";


// gets the top left corner when cannon is at rotational position 0 degrees
export function findCannonTopLeftGlobalCoords(canvas: any, USER_ANCHOR_POINT: number[], cannonInfo: any) {
  const [piv_x, piv_y] = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT);
  return [
    piv_x - cannonInfo.pivot_x * calculateGrowthFactorCannon(cannonInfo, canvas),
    piv_y - cannonInfo.pivot_y * calculateGrowthFactorCannon(cannonInfo, canvas)
  ];
}

export function topLeftCornerVelocityBar(cannonPosition: number[], canvas: any) {
  const pos_x = cannonPosition[0];
  const pos_y = cannonPosition[1] + 0.18 * canvas.height;
  return [pos_x, pos_y]
}

export function topLeftCornerHeightScale(cannonPosition: number[], canvas: any) {
  const growthFactor = calculateGrowthFactorHeight(canvas);

  const pos_x = cannonPosition[0] - 158 * growthFactor - 20; // 158 is the width of the height metre image
  const pos_y = 0.1 * canvas.height - 23 * growthFactor; // 23 pixels is the number of pixels that the actual start of the 
  return [pos_x, pos_y]
}

export function topLeftCornerArrow(cannonPosition: number[], canvas: any, height_scalar: number) {
  const growthFactor = calculateGrowthFactorHeight(canvas);

  const scale_pos_x = topLeftCornerHeightScale(cannonPosition, canvas)[0]
  const arrowPosX = scale_pos_x + (100) * growthFactor - 103 * growthFactor;
  const arrowPosY = height_scalar * canvas.height - (63 / 2) * growthFactor;

  return [arrowPosX, arrowPosY];
}