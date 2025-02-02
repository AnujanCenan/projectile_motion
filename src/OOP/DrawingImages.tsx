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

    holsterRef: RefObject<HTMLImageElement | null>, 
    cannonRef: RefObject<HTMLImageElement | null>,
    velocityBarRef: RefObject<HTMLImageElement | null>,
    velocitySliderRef: RefObject<HTMLImageElement | null>,
    heightScaleRef: RefObject<HTMLImageElement | null>,
    heightArrowRef: RefObject<HTMLImageElement | null>,
    foregroundRef: RefObject<HTMLImageElement | null>,
    targetRef: RefObject<HTMLImageElement | null>
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

    if (!this.#velocityBarRef.current || !this.#velocityBarRef.current) return;
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        velocityBar, 
        pos_x, 
        pos_y, 
        this.#velocityBarRef.current.width, 
        this.#velocityBarRef.current.height, 
        growthFactor
      )
    }
  }

  drawVelocitySlider(velocitySlider: HTMLImageElement, launchVelocity: number, MAX_SPEED: number, USER_ANCHOR_POINT: number[]) {
  if (!this.#velocityBarRef.current || !this.#velocitySliderRef.current) return;

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    const pixelPerVelocity =  (this.#velocityBarRef.current.width * growthFactor) / MAX_SPEED;

    const sliderWidth = this.#velocitySliderRef.current.width;
    const sliderHeight = this.#velocitySliderRef.current.height;

    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - sliderWidth/2 * growthFactor;
    const sliderPosY = pos_y - sliderHeight/4 * growthFactor;

    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageNoRotation(
        ctx,  
        velocitySlider, 
        sliderPosX, sliderPosY, 

        sliderWidth, 
        sliderHeight, 
        growthFactor
      )
    }
  }


  drawHeightScale(heightScale: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    if (!this.#heightScaleRef.current) return;

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightScale, 
        pos_x, 
        pos_y, 
        this.#heightScaleRef.current.width, 
        this.#heightScaleRef.current.height, 
        growthFactor
      );
    }
  }

  drawHeightArrow(heightArrow: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    if (!this.#heightArrowRef.current) return;
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightArrow, 
        arrowPosX, 
        arrowPosY, 
        this.#heightArrowRef.current.width, 
        this.#heightArrowRef.current.height, 
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
    if (!this.#foregroundRef.current) return;

    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height;
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        foreground,
        0,
        y_pos,
        this.#foregroundRef.current.width,
        this.#foregroundRef.current.height,
        this.#canvasPositionAndSizes.getGrowthFactorForeground()
      )
    }
  }

  drawTarget(USER_ANCHOR_POINT: number[], GROUND_LEVEL_SCALAR: number, target: HTMLImageElement, range: number, altitude: number) {
    if (!this.#targetRef.current) return;
    const [x_pos, y_pos] = this.#canvasPositionAndSizes.getTargetTopLeft(
      GROUND_LEVEL_SCALAR, 
      USER_ANCHOR_POINT, 
      altitude, 
      range
    )
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorTarget();

    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      

      drawImageNoRotation(
        ctx,
        target,
        x_pos,
        y_pos,
        this.#targetRef.current.width,
        this.#targetRef.current.height,
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
      if (this.#foregroundRef.current)
        this.drawForeground(GROUND_LEVEL_SCALAR, this.#foregroundRef.current);

      if (this.#holsterRef.current)
        this.drawHolster(this.#holsterRef.current, USER_ANCHOR_POINT);
      if (this.#cannonRef.current)
        this.drawCannon(this.#cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);

      this.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
      
      if (this.#velocityBarRef.current)
        this.drawVelocityBar(this.#velocityBarRef.current, USER_ANCHOR_POINT);
      
      if (this.#velocitySliderRef.current)
        this.drawVelocitySlider(this.#velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
      
      if (this.#heightScaleRef.current)
        this.drawHeightScale(this.#heightScaleRef.current, USER_ANCHOR_POINT);
      
      if (this.#heightArrowRef?.current)
        this.drawHeightArrow(this.#heightArrowRef.current, USER_ANCHOR_POINT);

      if (this.#targetRef.current)
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