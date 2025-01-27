import { GROUND_LEVEL_SCALAR } from "../globalConstants/groundLevelScalar";

export class CanvasPositionAndSizes {
  #canvas;
  #foregroundInfo;
  #cannonInfo;
  #velocitySliderInfo;
  #holsterInfo;
  #heightBarInfo;
  #targetInfo;
  #MAX_HORIZONTAL_RANGE;

  constructor(
    canvas: HTMLCanvasElement, 
    foregorundInfo: ForegroundInfo,
    cannonInfo: CannonInfo,
    holsterInfo: HolsterInfo, 
    velocitySlider: VelocitySliderInfo,
    heightBarInfo: HeightBarInfo,
    targetInfo: TargetInfo,
    MAX_HORIZONTAL_RANGE: number) 
  {
    this.#canvas = canvas;
    this.#foregroundInfo = foregorundInfo;
    this.#cannonInfo = cannonInfo;
    this.#holsterInfo = holsterInfo;
    this.#velocitySliderInfo = velocitySlider;
    this.#heightBarInfo = heightBarInfo;

    this.#targetInfo = targetInfo;
    this.#MAX_HORIZONTAL_RANGE = MAX_HORIZONTAL_RANGE;
  }


  ////////////////////////////////// Getters ///////////////////////////////////
  getCanvas() {
    return this.#canvas;
  }

  getCtx() {
    return this.#canvas.getContext('2d');
  }

  getCannonInfo() {
    return this.#cannonInfo;
  }

  getHolsterInfo() {
    return this.#holsterInfo;
  }

  getVelocitySliderInfo() {
    return this.#velocitySliderInfo;
  }

  getTargetInfo() {
    return this.#targetInfo;
  }

  getMaxHorizontalRage() {
    return this.#MAX_HORIZONTAL_RANGE;
  }

  //////////////////////////////////////////////////////////////////////////////
  //// PIVOT
  getPivotPosition(USER_ANCHOR_POINT: number[]) {
    const pivX = window.innerWidth * USER_ANCHOR_POINT[0] * window.devicePixelRatio;

    const pivY = this.#canvas.height * USER_ANCHOR_POINT[1]
  
    return [pivX, pivY]
  }

  /// TOP LEFT CORNERS

  getCannonOriginalPosition(USER_ANCHOR_POINT: number[]) {
    const [piv_x, piv_y] = this.getPivotPosition(USER_ANCHOR_POINT);
    return [
      piv_x - this.#cannonInfo.pivot_x * this.getGrowthFactorCannon(),
      piv_y - this.#cannonInfo.pivot_y * this.getGrowthFactorCannon()
    ];  
  }

  getHolsterPosition(USER_ANCHOR_POINT: number[]) {
    const [piv_x, piv_y] = this.getPivotPosition(USER_ANCHOR_POINT);
    const growthFactor = this.getGrowthFactorCannon();
    return [
      piv_x - growthFactor * this.#holsterInfo.pivot_x,
      piv_y - growthFactor * this.#holsterInfo.pivot_y
    ]
  }

  getVelocityBarPosition(USER_ANCHOR_POINT: number[]) {
    const holster_y = this.getHolsterPosition(USER_ANCHOR_POINT)[1];
    const cannon_x = this.getCannonOriginalPosition(USER_ANCHOR_POINT)[0];
    const growthFactor = this.getGrowthFactorCannon();

    const gapBetweenHolsterAndVelBar = 20;
    return [
      cannon_x, 
      holster_y + this.#holsterInfo.pixel_height * growthFactor + gapBetweenHolsterAndVelBar
    ];
  }

  getHeightArrowPosition(USER_ANCHOR_POINT: number[]) {
    const growthFactor = this.getGrowthFactorHeight();

    const scale_pos_x = this.getHeightScalePosition(USER_ANCHOR_POINT)[0]
    const arrowPosX = scale_pos_x + (this.#heightBarInfo.x_coord_arrow_tip_touch) * growthFactor 
      - this.#heightBarInfo.arrow_pixel_width * growthFactor;

    const arrowPosY = USER_ANCHOR_POINT[1] * this.#canvas.height 
      - (this.#heightBarInfo.arrow_pixel_height / 2) * growthFactor;
  
    return [arrowPosX, arrowPosY];
  }

  getHeightScalePosition(USER_ANCHOR_POINT: number[]) {
    const cannonPosition = this.getCannonOriginalPosition(USER_ANCHOR_POINT)
    const growthFactor = this.getGrowthFactorHeight();

    const xDistanceFromCannon = 20;

    const pos_x = cannonPosition[0] - this.#heightBarInfo.pixel_width * growthFactor - xDistanceFromCannon;
    const pos_y = 0.1 * this.#canvas.height 
      - this.#heightBarInfo.y_offset_scale_start * growthFactor; 
    return [pos_x, pos_y]  
  }



  getTargetPivot(
    GROUND_LEVEL_SCALAR: number,
    USER_ANCHOR_POINT: number[], 
    altitude: number, 
    range: number
  ) {
    const conversionRate = this.calculateConversionRate(USER_ANCHOR_POINT);
  
  
    const anchor_x = this.getPivotPosition(USER_ANCHOR_POINT)[0]
  
    const y_pos = GROUND_LEVEL_SCALAR * this.getCanvas().height - altitude * conversionRate;
    const x_pos = anchor_x + range * conversionRate;

    return [x_pos, y_pos]
  }

  getTargetTopLeft(
    GROUND_LEVEL_SCALAR: number, 
    USER_ANCHOR_POINT: number[], 
    altitude: number, 
    range: number
  ) {
    const growthFactor = 0.5;

    const [piv_x, piv_y] = this.getTargetPivot(GROUND_LEVEL_SCALAR, USER_ANCHOR_POINT, altitude, range)
    return [
      piv_x - this.#targetInfo.target_x * growthFactor, 
      piv_y - this.#targetInfo.target_y * growthFactor
    ];
  }


  /// GROWTH FACTOR
  getGrowthFactorCannon() {
    const FRACTION_OF_SCREEN = 1/3;
    return (FRACTION_OF_SCREEN * window.innerWidth) / this.#cannonInfo.pixel_width
  }

  getGrowthFactorVelocity() {
    const FRACTION_OF_CANVAS = 2/5;
    return (FRACTION_OF_CANVAS * window.innerWidth) / this.#velocitySliderInfo.pixel_width; // 817 is the velocityBar_pixel_width
  }

  getGrowthFactorHeight() {
  const FRACTION_OF_CANVAS = GROUND_LEVEL_SCALAR -  0.1
  return (FRACTION_OF_CANVAS * this.#canvas.height) / this.#heightBarInfo.functional_pixel_height // 866 is the pixel height of the scale (that is actually the ruler (not the cosmetic ends))
  }

  getGrowthFactorForeground() {
    return this.#canvas.width / this.#foregroundInfo.width; // 1000 is the width of the grass image atm
  }

  /// CONVERSION RATE
  calculateConversionRate(USER_ANCHOR_POINT: number[]) {
    const availableSpace = (this.#canvas.width - this.getPivotPosition(USER_ANCHOR_POINT)[0]) * 9/10;
    const conversionRate = availableSpace / this.#MAX_HORIZONTAL_RANGE;
    return conversionRate  
  }
}