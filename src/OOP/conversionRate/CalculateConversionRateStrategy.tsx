import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";

export abstract class CalculateConversionRateStrategy  {
  abstract calculateConversionRateXDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number;
  abstract calculateConversionRateYDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number;
}