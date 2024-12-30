import { findCannonTopLeftGlobalCoords } from "../processingFunctions/findPivotGlobalCoords";

export function getVelocityBarPosition(canvas, USER_ANCHOR_POINT, cannonInfo) {
  const cannonTopCorner = findCannonTopLeftGlobalCoords(canvas, USER_ANCHOR_POINT, cannonInfo);
  return [cannonTopCorner[0], cannonTopCorner[1] + canvas.height * 0.15]
}