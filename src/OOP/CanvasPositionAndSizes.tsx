import { calculateConversionRate } from "../processingFunctions/calculateConversionRate.tsx";
import { calclateGrowthFactorVelocity, calculateGrowthFactorCannon, calculateGrowthFactorHeight } from "../processingFunctions/calculateGrowthFactor.tsx";
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords.tsx";
import { findCannonTopLeftGlobalCoords, topLeftCornerArrow, topLeftCornerHeightScale } from "../processingFunctions/topLeftCorners.tsx";

export class CanvasPositionAndSizes {
  #canvas;
  #cannonInfo;
  #holsterInfo;
  #MAX_HORIZONTAL_RANGE;

  constructor(
    canvas: HTMLCanvasElement, 
    cannonInfo: CannonInfo,
    holsterInfo: HolsterInfo, 
    MAX_HORIZONTAL_RANGE: number) 
  {
    this.#canvas = canvas;
    this.#cannonInfo = cannonInfo;
    this.#holsterInfo = holsterInfo;
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

  getMaxHorizontalRage() {
    return this.#MAX_HORIZONTAL_RANGE;
  }

  //////////////////////////////////////////////////////////////////////////////
  //// PIVOT
  getPivotPosition(USER_ANCHOR_POINT: number[]) {
    return findPivotGlobalCoords(this.#canvas, USER_ANCHOR_POINT)
  }

  /// TOP LEFT CORNERS

  getCannonOriginalTopLeft(USER_ANCHOR_POINT: number[]) {
    return findCannonTopLeftGlobalCoords(this.#canvas, USER_ANCHOR_POINT, this.#cannonInfo);
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
    const cannon_x = this.getCannonOriginalTopLeft(USER_ANCHOR_POINT)[0];
    const growthFactor = this.getGrowthFactorCannon();

    return [cannon_x, holster_y + this.#holsterInfo.pixel_height * growthFactor + 20];
  }

  getHeightArrowPosition(USER_ANCHOR_POINT: number[]) {
    return topLeftCornerArrow(this.getCannonOriginalTopLeft(USER_ANCHOR_POINT), this.#canvas, USER_ANCHOR_POINT[1])
  }

  getHeightScalePosition(USER_ANCHOR_POINT: number[]) {
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

  getGrowthFactorForeground() {
    return this.#canvas.width / 1000; // 1000 is the width of the grass image atm
  }

  /// CONVERSION RATE
  calculateConversionRate(USER_ANCHOR_POINT: number[]) {
    return calculateConversionRate(this.#canvas, USER_ANCHOR_POINT, this.#MAX_HORIZONTAL_RANGE)
  }
}