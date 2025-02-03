import { Ref, RefObject } from "react";
import { drawImageNoRotation, drawImageWithRotation } from "../processingFunctions/drawingFunctions.tsx";
import { CanvasPositionAndSizes } from "./CanvasPositionAndSizes.tsx";

export interface SrcAndImage {
  src: string,
  imageRef: RefObject<HTMLImageElement | null>
}

export interface DrawingToSrcAndImage {
  cannon: SrcAndImage;
  holster: SrcAndImage;
  foreground: SrcAndImage;
  target: SrcAndImage;

  velocitySlider?: SrcAndImage;
  velocityBar?: SrcAndImage;
  heightScale?: SrcAndImage;
  heightArrow?: SrcAndImage;
}

export class DrawingImages {
  #canvasPositionAndSizes;

  #drawingObjects: DrawingToSrcAndImage;

  constructor(
    canvasPositionAndSizes: CanvasPositionAndSizes,
    drawingObjects: DrawingToSrcAndImage
  ) {
    this.#canvasPositionAndSizes = canvasPositionAndSizes;

    this.#drawingObjects = drawingObjects;

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

    if (!this.#drawingObjects.velocityBar?.imageRef.current) return;
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        velocityBar, 
        pos_x, 
        pos_y, 
        this.#drawingObjects.velocityBar?.imageRef.current.width, 
        this.#drawingObjects.velocityBar?.imageRef.current.height, 
        growthFactor
      )
    }
  }

  drawVelocitySlider(velocitySlider: HTMLImageElement, launchVelocity: number, MAX_SPEED: number, USER_ANCHOR_POINT: number[]) {
  if (!this.#drawingObjects.velocityBar?.imageRef.current || !this.#drawingObjects.velocitySlider?.imageRef.current) return;

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    const pixelPerVelocity =  (this.#drawingObjects.velocityBar.imageRef.current.width * growthFactor) / MAX_SPEED;

    const sliderWidth = this.#drawingObjects.velocitySlider.imageRef.current.width;
    const sliderHeight = this.#drawingObjects.velocitySlider.imageRef.current.height;

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
    if (!this.#drawingObjects.heightScale?.imageRef.current) return;

    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightScale, 
        pos_x, 
        pos_y, 
        this.#drawingObjects.heightScale.imageRef.current.width, 
        this.#drawingObjects.heightScale.imageRef.current.height, 
        growthFactor
      );
    }
  }

  drawHeightArrow(heightArrow: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    if (!this.#drawingObjects.heightArrow?.imageRef.current) return;
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        heightArrow, 
        arrowPosX, 
        arrowPosY, 
        this.#drawingObjects.heightArrow.imageRef.current.width, 
        this.#drawingObjects.heightArrow.imageRef.current.height, 
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
    if (!this.#drawingObjects.foreground.imageRef.current) return;

    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height;
    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      
      drawImageNoRotation(
        ctx,
        foreground,
        0,
        y_pos,
        this.#drawingObjects.foreground.imageRef.current.width,
        this.#drawingObjects.foreground.imageRef.current.height,
        this.#canvasPositionAndSizes.getGrowthFactorForeground()
      )
    }
  }

  drawTarget(USER_ANCHOR_POINT: number[], GROUND_LEVEL_SCALAR: number, target: HTMLImageElement, range: number, altitude: number) {
    if (!this.#drawingObjects.target.imageRef.current) return;
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
        this.#drawingObjects.target.imageRef.current.width,
        this.#drawingObjects.target.imageRef.current.height,
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

      if (this.#drawingObjects.foreground.imageRef.current)
        this.drawForeground(GROUND_LEVEL_SCALAR, this.#drawingObjects.foreground.imageRef.current);
      this.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
      if (this.#drawingObjects.holster.imageRef.current)
        this.drawHolster(this.#drawingObjects.holster.imageRef.current, USER_ANCHOR_POINT);
      if (this.#drawingObjects.cannon.imageRef.current)
        this.drawCannon(this.#drawingObjects.cannon.imageRef.current, -elevationAngle, USER_ANCHOR_POINT);
      if (this.#drawingObjects.velocityBar?.imageRef.current)
        this.drawVelocityBar(this.#drawingObjects.velocityBar.imageRef.current, USER_ANCHOR_POINT);  
      if (this.#drawingObjects.velocitySlider?.imageRef.current)
        this.drawVelocitySlider(this.#drawingObjects.velocitySlider.imageRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
      if (this.#drawingObjects.heightScale?.imageRef.current)
        this.drawHeightScale(this.#drawingObjects.heightScale.imageRef.current, USER_ANCHOR_POINT);
      if (this.#drawingObjects.heightArrow?.imageRef.current)
        this.drawHeightArrow(this.#drawingObjects.heightArrow.imageRef.current, USER_ANCHOR_POINT);
      
      if (this.#drawingObjects.target.imageRef.current)
        this.drawTarget(
          USER_ANCHOR_POINT, 
          GROUND_LEVEL_SCALAR, 
          this.#drawingObjects.target.imageRef.current, 
          target_range, 
          target_altitude
        )
    }
  }
}