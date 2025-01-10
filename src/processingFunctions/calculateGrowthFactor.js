import { isLandscape } from "./drawingFunctions";

export function calculateGrowthFactorCannon(cannonInfo) {
  // LOGIC: say we want the cannon to be ~1/10 of the canvas width
  // Then get the total width of the canvas
  // get the width of the cannon

  // cannonWidth * growthFactor = 1/10 * canvasWidth
  // growthFactor = ( 1/10 * canvasWidth ) / cannonWidth

  // requires cannon_width != 0

  const FRACTION_OF_SCREEN = 1/3;

  if (isLandscape()) {
    return (FRACTION_OF_SCREEN * window.innerWidth) / cannonInfo.pixel_width
  } else {
    return (FRACTION_OF_SCREEN * 2 * window.innerWidth) / cannonInfo.pixel_width
  }

}

export function calclateGrowthFactorVelocity(canvas) {
  if (isLandscape()) {
    const FRACTION_OF_CANVAS = 2/5;
    return (FRACTION_OF_CANVAS * window.innerWidth) / 817 // 817 is the velocityBar_pixel_width
  } else {
    const FRACTION_OF_CANVAS = 2/5;
    return (FRACTION_OF_CANVAS * canvas.width) / 817 
  }
  
}

export function calculateGrowthFactorHeight(canvas) {
  const FRACTION_OF_CANVAS = 7/10;
  return (FRACTION_OF_CANVAS * canvas.height) / 866 // 866 is the pixel height of the scale (that is actually the ruler (not the cosmetic ends))
}