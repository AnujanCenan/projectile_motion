import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar";
import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";
import { CalculateConversionRateStrategy } from "./CalculateConversionRateStrategy";

export class IndependentDirectionStrategy implements CalculateConversionRateStrategy {
  calculateConversionRateXDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number {
    const availableSpace = (positionAndSizes.getCanvas().width - positionAndSizes.getPivotX(USER_ANCHOR_POINT[0])) * 9/10;
    const conversionRate = availableSpace / positionAndSizes.getMaxHorizontalRage();
    return conversionRate 
  }

  calculateConversionRateYDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number {
    const availableSpace = (GROUND_LEVEL_SCALAR - 0.1) * (positionAndSizes.getCanvas().height);
    const conversionRate = availableSpace / positionAndSizes.getMaxAltitude();
    return conversionRate 
  }
}