import { calculateConversionRate } from "../processingFunctions/calculateConversionRate";
import { calclateGrowthFactorVelocity, calculateGrowthFactorCannon, calculateGrowthFactorHeight } from "../processingFunctions/calculateGrowthFactor";
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords";
import { findCannonTopLeftGlobalCoords, topLeftCornerArrow, topLeftCornerHeightScale } from "../processingFunctions/topLeftCorners";

export class CanvasPositionAndSizes {
  #canvas;
  #ctx;
  #cannonInfo;
  #holsterInfo;
  #MAX_HORIZONTAL_RANGE;

  constructor(canvas, cannonInfo, holsterInfo, MAX_HORIZONTAL_RANGE) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
    this.#cannonInfo = cannonInfo;
    this.#holsterInfo = holsterInfo;
    this.#MAX_HORIZONTAL_RANGE = MAX_HORIZONTAL_RANGE;
  }


  ////////////////////////////////// Getters ///////////////////////////////////
  getCanvas() {
    return this.#canvas;
  }

  getCtx() {
    return this.#ctx;
  }

  getCannonInfo() {
    return this.#cannonInfo;
  }

  getHolsterInfo() {
    return this.#holsterInfo;
  }

  getMaxHorizontalRage() {
    return this.#MAX_HORIZONTAL_RANGE;
  }

  //////////////////////////////////////////////////////////////////////////////
  //// PIVOT
  getPivotPosition(USER_ANCHOR_POINT) {
    return findPivotGlobalCoords(this.#canvas, USER_ANCHOR_POINT)
  }

  /// TOP LEFT CORNERS

  getCannonOriginalTopLeft(USER_ANCHOR_POINT) {
    return findCannonTopLeftGlobalCoords(this.#canvas, USER_ANCHOR_POINT, this.#cannonInfo);
  }

  getHolsterPosition(USER_ANCHOR_POINT) {
    const [piv_x, piv_y] = this.getPivotPosition(USER_ANCHOR_POINT);
    const growthFactor = this.getGrowthFactorCannon();
    return [
      piv_x - growthFactor * this.#holsterInfo.pivot_x,
      piv_y - growthFactor * this.#holsterInfo.pivot_y
    ]
  }

  getVelocityBarPosition(USER_ANCHOR_POINT) {
    const holster_y = this.getHolsterPosition(USER_ANCHOR_POINT)[1];
    const cannon_x = this.getCannonOriginalTopLeft(USER_ANCHOR_POINT)[0];
    const growthFactor = this.getGrowthFactorCannon();

    return [cannon_x, holster_y + this.#holsterInfo.pixel_height * growthFactor + 20];
  }

  getHeightArrowPosition(USER_ANCHOR_POINT) {
    return topLeftCornerArrow(this.getCannonOriginalTopLeft(USER_ANCHOR_POINT), this.#canvas, USER_ANCHOR_POINT[1])
  }

  getHeightScalePosition(USER_ANCHOR_POINT) {
    return topLeftCornerHeightScale(this.getCannonOriginalTopLeft(USER_ANCHOR_POINT), this.#canvas);
  }


  /// GROWTH FACTOR
  getGrowthFactorCannon() {
    return calculateGrowthFactorCannon(this.#cannonInfo, this.#canvas);
  }

  getGrowthFactorVelocity() {
    return calclateGrowthFactorVelocity(this.#canvas);
  }

  getGrowthFactorHeight() {
    return calculateGrowthFactorHeight(this.#canvas);
  }

  /// CONVERSION RATE
  calculateConversionRate(USER_ANCHOR_POINT) {
    return calculateConversionRate(this.#canvas, USER_ANCHOR_POINT, this.#MAX_HORIZONTAL_RANGE)
  }
}