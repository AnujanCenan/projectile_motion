import { isLandscape } from "./drawingFunctions.tsx";

export function calculateGrowthFactorCannon(
  cannonInfo: {
    pixel_width: number;
    pixel_height: number;
    pivot_x: number;
    pivot_y: number;
  }, 
  canvas: HTMLCanvasElement) {
  // LOGIC: say we want the cannon to be ~1/10 of the canvas width
  // Then get the total width of the canvas
  // get the width of the cannon

  // cannonWidth * growthFactor = 1/10 * canvasWidth
  // growthFactor = ( 1/10 * canvasWidth ) / cannonWidth

  // requires cannon_width != 0

  const FRACTION_OF_SCREEN = 1/3;

  // if (isLandscape()) {
  //   return (FRACTION_OF_SCREEN * window.innerWidth) / cannonInfo.pixel_width
  // } else {
  //   return (1/6 * canvas.width) / cannonInfo.pixel_width
  // }
  return (FRACTION_OF_SCREEN * window.innerWidth) / cannonInfo.pixel_width

}

export function calclateGrowthFactorVelocity(canvas: HTMLCanvasElement) {
  // if (isLandscape()) {
  //   const FRACTION_OF_CANVAS = 2/5;
  //   return (FRACTION_OF_CANVAS * window.innerWidth) / 817 // 817 is the velocityBar_pixel_width
  // } else {
  //   const FRACTION_OF_CANVAS = 1/5;
  //   return (FRACTION_OF_CANVAS * canvas.width) / 817 
  // }

    const FRACTION_OF_CANVAS = 2/5;
    return (FRACTION_OF_CANVAS * window.innerWidth) / 817 // 817 is the velocityBar_pixel_width
}

export function calculateGrowthFactorHeight(canvas: HTMLCanvasElement, GROUND_LEVEL_SCALAR: number = 0.8) { // some of the calls to this function lack the GROUND_LEVEL_SCALAR param
  const FRACTION_OF_CANVAS = GROUND_LEVEL_SCALAR -  0.1
  return (FRACTION_OF_CANVAS * canvas.height) / 866 // 866 is the pixel height of the scale (that is actually the ruler (not the cosmetic ends))
}