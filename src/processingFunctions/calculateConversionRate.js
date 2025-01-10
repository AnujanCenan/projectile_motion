import { findPivotGlobalCoords } from "./findPivotGlobalCoords";

/**
 * The rate that when MULTIPLIED by a METRE DISTANCE, gives a PIXEL DISTANCE
 * @param {*} canvas 
 * @param {number[]} USER_ANCHOR_POINT
 * @param {number} MAX_HORIZONTAL_RANGE - in metres, the distance between the pivot 
 * and the far edge
 * @returns 
 */
export function calculateConversionRate(canvas, USER_ANCHOR_POINT, MAX_HORIZONTAL_RANGE) {
  const availableSpace = (canvas.width - findPivotGlobalCoords(canvas, USER_ANCHOR_POINT)[0]) * 9/10;
  const conversionRate = availableSpace / MAX_HORIZONTAL_RANGE;
  return conversionRate
}

