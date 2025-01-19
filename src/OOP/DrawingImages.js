import { drawImageWithRotation } from "../processingFunctions/drawingFunctions";
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords";

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
          USER_ANCHOR_POINT,
          0
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
    const pivot_coords = findPivotGlobalCoords(this.#canvasPositionAndSizes.getCanvas(), USER_ANCHOR_POINT)
    const TOP_LEFT_CORNER = [
      pivot_coords[0] - holsterInfo.pivot_x * growthFactor,
      pivot_coords[1] - holsterInfo.pivot_y * growthFactor
    ]

    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      holsterImage, 
      TOP_LEFT_CORNER[0] , 
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
    const pivot_coords = findPivotGlobalCoords(this.#canvasPositionAndSizes.getCanvas(), USER_ANCHOR_POINT)
    const TOP_LEFT_CORNER = [
      pivot_coords[0] - cannonInfo.pivot_x * growthFactor,
      pivot_coords[1] - cannonInfo.pivot_y * growthFactor
    ]
  
    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(), 
      cannonImage, 
      TOP_LEFT_CORNER[0] , 
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
      pos_x , 
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
      sliderPosX , 
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
      pos_x , 
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
      arrowPosX , 
      arrowPosY, 
      0, 
      0, 
      103, 
      63, 
      0, 
      growthFactor
    );
  }

  drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR) {

    const SCALAR_OF_HOLSTER_WIDTH = 3;

    const width = SCALAR_OF_HOLSTER_WIDTH * (this.#canvasPositionAndSizes.getHolsterInfo().pixel_width  * this.#canvasPositionAndSizes.getGrowthFactorCannon());
    const height = (GROUND_LEVEL_SCALAR - USER_ANCHOR_POINT[1]) * this.#canvasPositionAndSizes.getCanvas().height;

    const [holster_x, holster_y] = this.#canvasPositionAndSizes.getHolsterPosition(USER_ANCHOR_POINT);


    const platform_x = holster_x - width / 4;
    const platform_y = holster_y + 
      this.#canvasPositionAndSizes.getHolsterInfo().pixel_height * this.#canvasPositionAndSizes.getGrowthFactorCannon();


    const ctx = this.#canvasPositionAndSizes.getCtx();

    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillRect(platform_x , platform_y, width, height);
    ctx.strokeRect(platform_x , platform_y, width, height);
    ctx.stroke();
  }

  drawForeground(GROUND_LEVEL_SCALAR, foreground) {
    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height - 100;
    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(),
      foreground,
      0,
      y_pos,
      0,
      0,
      1000,
      302,
      0,
      this.#canvasPositionAndSizes.getGrowthFactorForeground()
    )
  }

  drawTarget(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR=0.8, target, range, altitude) {
    const conversionRate = this.#canvasPositionAndSizes.calculateConversionRate(USER_ANCHOR_POINT);
    const growthFactor = 0.5;


    const anchor_x = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)[0]

    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height - altitude * conversionRate - 356 * growthFactor;
    const x_pos = anchor_x + range * conversionRate - 152 * growthFactor;

    drawImageWithRotation(
      this.#canvasPositionAndSizes.getCtx(),
      target,
      x_pos,
      y_pos,
      0,
      0,
      505,
      701,
      0,
      growthFactor
    )
  }
}