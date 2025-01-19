import { drawImageWithRotation } from "../processingFunctions/drawingFunctions";
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords";

export class DrawingImages {
  #canvasPositionAndSizes;
  constructor(canvasPositionAndSizes) {
    this.#canvasPositionAndSizes = canvasPositionAndSizes;
  }

  ////// Cannon Drawing
  drawHolsterOnLoad(holsterImage, USER_ANCHOR_POINT) {
    holsterImage.onload = () => {
      this.drawHolster(holsterImage, USER_ANCHOR_POINT);
    }
  }

  drawCannonOnLoad(cannonImage, USER_ANCHOR_POINT) {
    cannonImage.onload = () => {
      this.drawCannon(cannonImage, 0, USER_ANCHOR_POINT);
    }
  }

  drawHolster(holsterImage, USER_ANCHOR_POINT) {
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

  drawCannon(cannonImage, angle, USER_ANCHOR_POINT) {
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

  drawVelocityBar(velocityBar, USER_ANCHOR_POINT) {
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
  }

  drawVelocityBarOnLoad(velocityBar, USER_ANCHOR_POINT) {
    velocityBar.onload = () => {
      this.drawVelocityBar(velocityBar, USER_ANCHOR_POINT)
    }
  }

  drawVelocitySlider(velocitySlider, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;
    const sliderPosY = pos_y - 51/4 * growthFactor;

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

  drawVelocitySliderOnLoad(velocitySlider, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT) {
    velocitySlider.onload = () => {
      this.drawVelocitySlider(velocitySlider, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT)
    }
  }

  drawHeightScale(heightScale, USER_ANCHOR_POINT) {
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
  }

  drawHeightScaleOnLoad(heightScale, USER_ANCHOR_POINT) {
    heightScale.onload = () => {
      this.drawHeightScale(heightScale, USER_ANCHOR_POINT);
    }
  }

  drawHeightArrow(heightArrow, USER_ANCHOR_POINT) {
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
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

  drawHeightArrowOnLoad(heightArrow, USER_ANCHOR_POINT) {
    heightArrow.onload = () => {
      this.drawHeightArrow(heightArrow, USER_ANCHOR_POINT);
    }
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

  drawForegroundOnLoad(GROUND_LEVEL_SCALAR, foreground) {
    foreground.onload = () => {
      this.drawForeground(GROUND_LEVEL_SCALAR, foreground);
    }
  }

  drawTargetOnLoad(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR, target, range, altitude) {
    target.onload = () => {
      this.drawTarget(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR, target, range, altitude)
    }
  }

  drawTarget(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR, target, range, altitude) {
    const conversionRate = this.#canvasPositionAndSizes.calculateConversionRate(USER_ANCHOR_POINT);
    const growthFactor = 0.5;


    const anchor_x = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)[0]

    // the (152, 356) magic numbers are the coordinates of the green cross on the ORIGINAL target image
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

  drawEnvironmentOnLoad(
    GROUND_LEVEL_SCALAR, 
    USER_ANCHOR_POINT,
    MAX_SPEED,
    launchVelocity,
    target_range,
    target_altitude,
    foregroundRef, 
    holsterRef, 
    cannonRef, 
    velocityBarRef, 
    velocitySliderRef, 
    heightScaleRef, 
    heightArrowRef,
    targetRef,
  ) {

    this.drawForegroundOnLoad(GROUND_LEVEL_SCALAR, foregroundRef.current);
    
    this.drawHolsterOnLoad(holsterRef.current, USER_ANCHOR_POINT);
    this.drawCannonOnLoad(cannonRef.current, USER_ANCHOR_POINT);


    this.drawVelocityBarOnLoad(velocityBarRef.current, USER_ANCHOR_POINT);
    this.drawVelocitySliderOnLoad(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);

    this.drawHeightScaleOnLoad(heightScaleRef.current, USER_ANCHOR_POINT);
    this.drawHeightArrowOnLoad(heightArrowRef.current, USER_ANCHOR_POINT);

    this.drawTargetOnLoad(
      USER_ANCHOR_POINT, 
      GROUND_LEVEL_SCALAR, 
      targetRef.current, 
      target_range, 
      target_altitude
    )
  }

  drawEnvironment(
    GROUND_LEVEL_SCALAR, 
    USER_ANCHOR_POINT,
    MAX_SPEED,
    launchVelocity,
    elevationAngle,
    target_range,
    target_altitude,
    foregroundRef, 
    holsterRef, 
    cannonRef, 
    velocityBarRef, 
    velocitySliderRef, 
    heightScaleRef, 
    heightArrowRef,
    targetRef
  ) {
    
    const canvas = this.#canvasPositionAndSizes.getCanvas();
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawForeground(GROUND_LEVEL_SCALAR, foregroundRef.current);

    this.drawHolster(holsterRef.current, USER_ANCHOR_POINT);
    this.drawCannon(cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);

    this.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
    
    this.drawVelocityBar(velocityBarRef.current, USER_ANCHOR_POINT);
    this.drawVelocitySlider(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
    
    this.drawHeightScale(heightScaleRef.current, USER_ANCHOR_POINT);
    this.drawHeightArrow(heightArrowRef.current, USER_ANCHOR_POINT);

    this.drawTarget(
      USER_ANCHOR_POINT, 
      GROUND_LEVEL_SCALAR, 
      targetRef.current, 
      target_range, 
      target_altitude
    )
  }
}