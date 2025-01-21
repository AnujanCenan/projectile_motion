import { drawImageWithRotation } from "../processingFunctions/drawingFunctions.tsx";
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords.tsx";
import { CanvasPositionAndSizes } from "./CanvasPositionAndSizes.tsx";

export class DrawingImages {
  #canvasPositionAndSizes;
  constructor(canvasPositionAndSizes: CanvasPositionAndSizes) {
    this.#canvasPositionAndSizes = canvasPositionAndSizes;
  }

  drawHolster(holsterImage: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const holsterInfo = this.#canvasPositionAndSizes.getHolsterInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();
    const pivot_coords = findPivotGlobalCoords(this.#canvasPositionAndSizes.getCanvas(), USER_ANCHOR_POINT)
    const TOP_LEFT_CORNER = [
      pivot_coords[0] - holsterInfo.pivot_x * growthFactor,
      pivot_coords[1] - holsterInfo.pivot_y * growthFactor
    ]

    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      drawImageWithRotation(
        ctx,
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
  }

  drawCannon(cannonImage: HTMLImageElement, angle: number, USER_ANCHOR_POINT: number[]) {
    const cannonInfo = this.#canvasPositionAndSizes.getCannonInfo();

    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorCannon();
    const pivot_coords = findPivotGlobalCoords(this.#canvasPositionAndSizes.getCanvas(), USER_ANCHOR_POINT)
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
      
      drawImageWithRotation(
        ctx,
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
  }

  drawVelocitySlider(velocitySlider: HTMLImageElement, launchVelocity: number, MAX_SPEED: number, USER_ANCHOR_POINT: number[]) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getVelocityBarPosition(USER_ANCHOR_POINT);
    const growthFactor = this.#canvasPositionAndSizes.getGrowthFactorVelocity();

    const pixelPerVelocity =  (817 * growthFactor) / MAX_SPEED;
    const sliderPosX = pos_x + pixelPerVelocity * launchVelocity - 50/2 * growthFactor;
    const sliderPosY = pos_y - 51/4 * growthFactor;

    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageWithRotation(
        ctx,  
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


  drawHeightScale(heightScale: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const [pos_x, pos_y] = this.#canvasPositionAndSizes.getHeightScalePosition(USER_ANCHOR_POINT);
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    
    if (ctx) {
      
      drawImageWithRotation(
        ctx,
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
  }

  drawHeightArrow(heightArrow: HTMLImageElement, USER_ANCHOR_POINT: number[]) {
    const growthFactor =  this.#canvasPositionAndSizes.getGrowthFactorHeight();
    
    const [arrowPosX, arrowPosY] = this.#canvasPositionAndSizes.getHeightArrowPosition(USER_ANCHOR_POINT);
    
    const ctx = this.#canvasPositionAndSizes.getCtx()
    if (ctx) {
      
      drawImageWithRotation(
        ctx,
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
      
      drawImageWithRotation(
        ctx,
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
  }

  drawTarget(USER_ANCHOR_POINT: number[], GROUND_LEVEL_SCALAR: number, target: HTMLImageElement, range: number, altitude: number) {
    const conversionRate = this.#canvasPositionAndSizes.calculateConversionRate(USER_ANCHOR_POINT);
    const growthFactor = 0.5;


    const anchor_x = this.#canvasPositionAndSizes.getPivotPosition(USER_ANCHOR_POINT)[0]

    // the (152, 356) magic numbers are the coordinates of the green cross on the ORIGINAL target image
    const y_pos = GROUND_LEVEL_SCALAR * this.#canvasPositionAndSizes.getCanvas().height - altitude * conversionRate - 356 * growthFactor;
    const x_pos = anchor_x + range * conversionRate - 152 * growthFactor;

    const ctx = this.#canvasPositionAndSizes.getCtx()

    if (ctx) {
      

      drawImageWithRotation(
        ctx,
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

  drawEnvironment(
    GROUND_LEVEL_SCALAR: number, 
    USER_ANCHOR_POINT: number[],
    MAX_SPEED: number,
    launchVelocity: number,
    elevationAngle: number,
    target_range: number,
    target_altitude: number,
    foregroundRef: React.RefObject<HTMLImageElement>, 
    holsterRef: React.RefObject<HTMLImageElement>, 
    cannonRef: React.RefObject<HTMLImageElement>, 
    velocityBarRef: React.RefObject<HTMLImageElement>, 
    velocitySliderRef: React.RefObject<HTMLImageElement>, 
    heightScaleRef: React.RefObject<HTMLImageElement>, 
    heightArrowRef: React.RefObject<HTMLImageElement>,
    targetRef: React.RefObject<HTMLImageElement>,
  ) {
    
    const canvas = this.#canvasPositionAndSizes.getCanvas();
    const ctx = this.#canvasPositionAndSizes.getCtx();
    
    if (ctx) {
      

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      // foregroundRef.current.onload = () => this.drawForeground(GROUND_LEVEL_SCALAR, foregroundRef.current);
      this.drawForeground(GROUND_LEVEL_SCALAR, foregroundRef.current);

      // holsterRef.current.onload = () => this.drawHolster(holsterRef.current, USER_ANCHOR_POINT);
      this.drawHolster(holsterRef.current, USER_ANCHOR_POINT);
      // cannonRef.current.onload = () => this.drawCannon(cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);
      this.drawCannon(cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);

      this.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
      
      // velocityBarRef.current.onload = () => this.drawVelocityBar(velocityBarRef.current, USER_ANCHOR_POINT);
      this.drawVelocityBar(velocityBarRef.current, USER_ANCHOR_POINT);
      // velocitySliderRef.current.onload = () => this.drawVelocitySlider(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
      this.drawVelocitySlider(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
      
      // heightScaleRef.current.onload = () => this.drawHeightScale(heightScaleRef.current, USER_ANCHOR_POINT);
      this.drawHeightScale(heightScaleRef.current, USER_ANCHOR_POINT);
      // heightArrowRef.current.onload = () => this.drawHeightArrow(heightArrowRef.current, USER_ANCHOR_POINT);
      this.drawHeightArrow(heightArrowRef.current, USER_ANCHOR_POINT);

      // targetRef.current.onload = () => 
        // this.drawTarget(
        //   USER_ANCHOR_POINT, 
        //   GROUND_LEVEL_SCALAR, 
        //   targetRef.current, 
        //   target_range, 
        //   target_altitude
        // )
        
      this.drawTarget(
        USER_ANCHOR_POINT, 
        GROUND_LEVEL_SCALAR, 
        targetRef.current, 
        target_range, 
        target_altitude
      )
    }
  }
}