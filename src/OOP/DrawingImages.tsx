import { RefObject } from "react";
import { drawImageNoRotation, drawImageWithRotation } from "../processingFunctions/drawingFunctions.tsx";
import { CanvasPositionAndSizes } from "./CanvasPositionAndSizes.tsx";

export class DrawingImages {
  #canvasPositionAndSizes;
  #holsterRef;
  #cannonRef;
  #velocityBarRef;
  #velocitySliderRef;
  #heightScaleRef;
  #heightArrowRef;
  #foregroundRef;
  #targetRef;

  constructor(
    canvasPositionAndSizes: CanvasPositionAndSizes,

    holsterRef: RefObject<HTMLImageElement>, 
    cannonRef: RefObject<HTMLImageElement>,
    velocityBarRef: RefObject<HTMLImageElement>,
    velocitySliderRef: RefObject<HTMLImageElement>,
    heightScaleRef: RefObject<HTMLImageElement>,
    heightArrowRef: RefObject<HTMLImageElement>,
    foregroundRef: RefObject<HTMLImageElement>,
    targetRef: RefObject<HTMLImageElement>
  ) {
    this.#canvasPositionAndSizes = canvasPositionAndSizes;

    this.#holsterRef = holsterRef;
    this.#cannonRef = cannonRef;
    this.#velocityBarRef = velocityBarRef;
    this.#velocitySliderRef = velocitySliderRef;
    this.#heightScaleRef = heightScaleRef;
    this.#heightArrowRef = heightArrowRef;
    this.#foregroundRef = foregroundRef;
    this.#targetRef = targetRef;
  }

  drawHolster(holsterImage: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const holsterInfo = this.#canvasPositionAndSizes.getHolsterInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();
    const pivot_coords = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)
    const TOP_LEFT_CORNER = [
      pivot_coords[0] - holsterInfo.pivot_x * growthFactor,
      pivot_coords[1] - holsterInfo.pivot_y * growthFactor
    ]

    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      drawImageNoRotation(
        ctx,
        holsterImage, 
        TOP_LEFT_CORNER[0] , 
        TOP_LEFT_CORNER[1],
        holsterInfo.pixel_width, 
        holsterInfo.pixel_height, 
        growthFactor
      )
    }
  }

  drawCannon(cannonImage: HTMLImageElement, angle: number, USER_ANCHOR_POINT: number[]) {
    const cannonInfo = this.#canvasPositionAndSizes.getCannonInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();
    const pivot_coords = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)
    const TOP_LEFT_CORNER = [
      pivot_coords[0] - cannonInfo.pivot_x * growthFactor,
      pivot_coords[1] - cannonInfo.pivot_y * growthFactor
    ]
    
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      drawImageWithRotation(
        ctx,
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
  }

  //// Velocity Methods

  drawVelocityBar(velocityBar: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        velocityBar, 
        pos_x, 
        pos_y, 
        817, 
        25, 
        growthFactor
      )
    }
  }

  drawVelocitySlider(velocitySlider: HTMLImageElement, launchVelocity: number, MAX_SPEED: number, USER_ANCHOR_POINT: number[]) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;
    const sliderPosY = pos_y - 51/4 * growthFactor;

    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageNoRotation(
        ctx,  
        velocitySlider, 
        sliderPosX, sliderPosY, 

        50, 
        51, 
        growthFactor
      )
    }
  }


  drawHeightScale(heightScale: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightScale, 
        pos_x, 
        pos_y, 
        158, 
        917, 
        growthFactor
      );
    }
  }

  drawHeightArrow(heightArrow: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightArrow, 
        arrowPosX, 
        arrowPosY, 
        103, 
        63, 
        growthFactor
      );
    }
  }

  drawHeightPlatform(USER_ANCHOR_POINT: number[], GROUND_LEVEL_SCALAR: number) {

    const SCALAR_OF_HOLSTER_WIDTH = 3;

    const width = SCALAR_OF_HOLSTER_WIDTH * (this.#canvasPositionAndSizes.getHolsterInfo().pixel_width  * this.#canvasPositionAndSizes.getGrowthFactorCannon());
    const height = (GROUND_LEVEL_SCALAR - USER_ANCHOR_POINT[1]) * this.#canvasPositionAndSizes.getCanvas().height;

    const [holster_x, holster_y] = this.#canvasPositionAndSizes.getHolsterPosition(USER_ANCHOR_POINT);


    const platform_x = holster_x - width / 4;
    const platform_y = holster_y + 
      this.#canvasPositionAndSizes.getHolsterInfo().pixel_height * this.#canvasPositionAndSizes.getGrowthFactorCannon();


    const ctx = this.#canvasPositionAndSizes.getCtx();
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 6;
      ctx.fillRect(platform_x , platform_y, width, height);
      ctx.strokeRect(platform_x , platform_y, width, height);
      ctx.stroke();
    }
  }

  drawForeground(GROUND_LEVEL_SCALAR: number, foreground: HTMLImageElement) {
    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height - 100;
    
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        foreground,
        0,
        y_pos,
        1000,
        302,
        this.#canvasPositionAndSizes.getGrowthFactorForeground()
      )
    }
  }

  drawTarget(USER_ANCHOR_POINT: number[], GROUND_LEVEL_SCALAR: number, target: HTMLImageElement, range: number, altitude: number) {
    const conversionRate = this.#canvasPositionAndSizes.calculateConversionRate(USER_ANCHOR_POINT);
    const growthFactor = 0.5;


    const anchor_x = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)[0]

    // the (152, 356) magic numbers are the coordinates of the green cross on the ORIGINAL target image
    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height - altitude * conversionRate - 356 * growthFactor;
    const x_pos = anchor_x + range * conversionRate - 152 * growthFactor;
    // const [x_pos, y_pos] = this.#canvasPositionAndSizes.getTargetTopLeft(GROUND_LEVEL_SCALAR, USER_ANCHOR_POINT, altitude, range);

    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      

      drawImageNoRotation(
        ctx,
        target,
        x_pos,
        y_pos,
        505,
        701,
        growthFactor
      )
    }
  }

  drawEnvironment(
    GROUND_LEVEL_SCALAR: number, 
    USER_ANCHOR_POINT: number[],
    MAX_SPEED: number,
    launchVelocity: number,
    elevationAngle: number,
    target_range: number,
    target_altitude: number,
  ) {
    
    const canvas = this.#canvasPositionAndSizes.getCanvas();
    const ctx = this.#canvasPositionAndSizes.getCtx();
    
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      this.drawForeground(GROUND_LEVEL_SCALAR, this.#foregroundRef.current);

      this.drawHolster(this.#holsterRef.current, USER_ANCHOR_POINT);
      this.drawCannon(this.#cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);

      this.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
      
      this.drawVelocityBar(this.#velocityBarRef.current, USER_ANCHOR_POINT);
      this.drawVelocitySlider(this.#velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
      
      this.drawHeightScale(this.#heightScaleRef.current, USER_ANCHOR_POINT);
      this.drawHeightArrow(this.#heightArrowRef.current, USER_ANCHOR_POINT);

      this.drawTarget(
        USER_ANCHOR_POINT, 
        GROUND_LEVEL_SCALAR, 
        this.#targetRef.current, 
        target_range, 
        target_altitude
      )
    }
  }
}