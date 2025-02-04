import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";

export class SingleRateStrategy {
  calculateConversionRateXDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number {
    const availableSpace = (positionAndSizes.getCanvas().width - positionAndSizes.getPivotX(USER_ANCHOR_POINT[0])) * 9/10;
    const conversionRate = availableSpace / positionAndSizes.getMaxHorizontalRage();
    return conversionRate 
  }

  calculateConversionRateYDirection(positionAndSizes: CanvasPositionAndSizes, USER_ANCHOR_POINT: number[]): number {
    return this.calculateConversionRateXDirection(positionAndSizes, USER_ANCHOR_POINT);
  }
}