import { findPivotGlobalCoords } from "./findPivotGlobalCoords";

export function calculateConversionRate(canvas, USER_ANCHOR_POINT, MAX_HORIZONTAL_RANGE) {
  const availableSpace = (canvas.width - findPivotGlobalCoords(canvas, USER_ANCHOR_POINT)[0]) * 9/10;
  const conversionRate = availableSpace / MAX_HORIZONTAL_RANGE;
  return conversionRate
}