import { drawImageWithRotation } from "../processingFunctions/drawingFunctions";

export class DrawingImages {
  #canvasPositionAndSizes;
  constructor(canvasPositionAndSizes) {
    this.#canvasPositionAndSizes = canvasPositionAndSizes;
  }

  ////// Cannon Drawing
  drawDefaultCannon(cannonImage, holsterImage, USER_ANCHOR_POINT) {
    holsterImage.onload = () => {
      this.#drawHolster(
        holsterImage, 
        USER_ANCHOR_POINT, 
      )

      cannonImage.onload = () => {
        this.#drawCannon(
          cannonImage, 
          0, 
          USER_ANCHOR_POINT
        )
      }
    }
  }

  drawRotatedCannon(angle, cannonImage, holsterImage, USER_ANCHOR_POINT) {
    this.#drawHolster(
      holsterImage,
      USER_ANCHOR_POINT,
    );

    this.#drawCannon(
      cannonImage,
      angle,
      USER_ANCHOR_POINT,
    )

  }

  #drawHolster(holsterImage, USER_ANCHOR_POINT) {
    const canvas = this.#canvasPositionAndSizes.getCanvas();
    const holsterInfo = this.#canvasPositionAndSizes.getHolsterInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();

    const TOP_LEFT_CORNER = [
      canvas.width * USER_ANCHOR_POINT[0] - holsterInfo.pivot_x * growthFactor,
      canvas.height * USER_ANCHOR_POINT[1] - holsterInfo.pivot_y * growthFactor
    ]

    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      holsterImage, 
      TOP_LEFT_CORNER[0], 
      TOP_LEFT_CORNER[1],
      holsterInfo.pivot_x, 
      holsterInfo.pivot_y, 
      holsterInfo.pixel_width, 
      holsterInfo.pixel_height, 
      0, 
      growthFactor
    )
  }

  #drawCannon(cannonImage, angle, USER_ANCHOR_POINT) {
    const canvas = this.#canvasPositionAndSizes.getCanvas();
    const cannonInfo = this.#canvasPositionAndSizes.getCannonInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();

    const TOP_LEFT_CORNER = [
      canvas.width * USER_ANCHOR_POINT[0] - cannonInfo.pivot_x * growthFactor,
      canvas.height * USER_ANCHOR_POINT[1] - cannonInfo.pivot_y * growthFactor
    ]
  
    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      cannonImage, 
      TOP_LEFT_CORNER[0], 
      TOP_LEFT_CORNER[1],
      cannonInfo.pivot_x, 
      cannonInfo.pivot_y, 
      cannonInfo.pixel_width, 
      cannonInfo.pixel_height, 
      angle, 
      growthFactor
    )
  }

  //// Velocity Methods

  drawDefaultVelocitySlider(velocityBar, velocitySlider, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();
    velocityBar.onload = () => {

      drawImageWithRotation(
        this.#canvasPositionAndSizes.getCtx(), 
        velocityBar, 
        pos_x, 
        pos_y, 
        0, 
        0, 
        817, 
        25, 
        0, 
        growthFactor
      )
      const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
      const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;
      const sliderPosY = pos_y - 51/4 * growthFactor;
    
      velocitySlider.onload = () => {
        drawImageWithRotation(
          this.#canvasPositionAndSizes.getCtx(),  
          velocitySlider, 
          sliderPosX, sliderPosY, 
          0, 
          0, 
          50, 
          51, 
          0, 
          growthFactor
        )
      }
    }
  }

  drawVelocitySlider(velocityBar, velocitySlider, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT) {

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      velocityBar, 
      pos_x, 
      pos_y, 
      0, 
      0, 
      817, 
      25, 
      0, 
      growthFactor
    )

    const sliderPosY = pos_y - 51/4 * growthFactor;

    const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;

    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(),  
      velocitySlider, 
      sliderPosX, 
      sliderPosY, 
      0, 
      0, 
      50, 
      51, 
      0, 
      growthFactor
    )
  }



  drawDefaultHeightScale(heightScale, heightArrow, USER_ANCHOR_POINT) {

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    heightScale.onload = () => {
      drawImageWithRotation(
        this.#canvasPositionAndSizes.getCtx(),
        heightScale, 
        pos_x, 
        pos_y, 
        0, 
        0, 
        158, 
        917, 
        0, 
        growthFactor
      );
      // TODO: add this code to the top left corner file
      const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
      console.log(`Arrow position: ${arrowPosX}, ${arrowPosY}`);
      drawImageWithRotation(
        this.#canvasPositionAndSizes.getCtx(), 
        heightArrow, 
        arrowPosX, 
        arrowPosY, 
        0, 
        0, 
        103, 
        63, 
        0, 
        growthFactor
      );
    }
    
  }
  //// Draw Height Scale
  drawHeightScale(heightScale, heightArrow, USER_ANCHOR_POINT) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      heightScale, 
      pos_x, 
      pos_y, 
      0, 
      0, 
      158, 
      917, 
      0, 
      growthFactor
    );

    const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      heightArrow, 
      arrowPosX, 
      arrowPosY, 
      0, 
      0, 
      103, 
      63, 
      0, 
      growthFactor
    );
  }
}