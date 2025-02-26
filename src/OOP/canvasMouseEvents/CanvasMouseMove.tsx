import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";
import { calculateAngularDisplacement } from "../../processingFunctions/calculateAngularDisplacement";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
import { DraggingCannon } from "../../states/userGameActions/DraggingCannon";
import { DraggingVelocity } from "../../states/userGameActions/DraggingVelocity";
import { DraggingHeightArrow } from "../../states/userGameActions/DraggingHeightArrow";
import { Disabled } from "../../types/DisableInput";

export class CanvasMouseMove {

  #positionsAndSizesInterface;
  #canvasX;
  #canvasY;
  #clickedBehindPivot;
  #click_x;
  #click_y;
  #userActionRef;
  #gameStateRef;
  private disabledInput: Disabled;

  constructor(
    postionsAndSizesInterface: CanvasPositionAndSizes,
    // cannonClick: RefObject<boolean>,
    clickedBehindPivot: RefObject<number>,
    // sliderClick: RefObject<boolean>,
    // heightArrowClick: RefObject<boolean>,
    userActionRef: RefObject<UserGameAction>,
    gameStateRef: RefObject<GameState>,
    click_x: RefObject<number>,
    click_y: RefObject<number>,
    disabledInput: Disabled
    
  ) {
    this.#positionsAndSizesInterface = postionsAndSizesInterface;
    this.#canvasX = this.#positionsAndSizesInterface.getCanvas().getBoundingClientRect().x * window.devicePixelRatio;
    this.#canvasY =  this.#positionsAndSizesInterface.getCanvas().getBoundingClientRect().y * window.devicePixelRatio;
    this.#clickedBehindPivot = clickedBehindPivot
    this.#userActionRef = userActionRef;
    this.#gameStateRef = gameStateRef;
    this.#click_x = click_x;
    this.#click_y = click_y;
    this.disabledInput = disabledInput;

  }


  #handleCannonClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    elevationAngle: number,
    USER_ANCHOR_POINT: number[],
    angleInputRef: RefObject<HTMLInputElement>,
    setElevationAngle: Function,
  ) {
    if (this.disabledInput.angle !== false) return;

    const mouseX = e.pageX * window.devicePixelRatio - this.#gameStateRef.current[3] - this.#canvasX
    const mouseY = e.pageY * window.devicePixelRatio - this.#canvasY
    // console.log(`comparing old x and new x: ${this.#click_x.current}, ${this.#click_y.current} vs ${mouseX}, ${mouseY}`)
    const angularDisplacement = calculateAngularDisplacement(
      mouseX,
      mouseY,
      this.#click_x.current, 
      this.#click_y.current, 
      this.#clickedBehindPivot.current,
      this.#positionsAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT),
      elevationAngle,
    );

    this.#click_x.current = mouseX;
    this.#click_y.current = mouseY;

    if (elevationAngle + angularDisplacement > 90) {
      setElevationAngle(90)
    } else if (elevationAngle + angularDisplacement < 0) {
      setElevationAngle(0)
    } else {
      setElevationAngle(elevationAngle + angularDisplacement);
    }
    
    angleInputRef.current.value = (Math.round(elevationAngle * 1000) / 1000).toString();
  }

  #handleVelocityClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    launchVelocity: number,
    MAX_SPEED: number,
    velocityInputRef: RefObject<HTMLInputElement>,
    setLaunchVelocity: Function
  ) {
    if (this.disabledInput.velocity !== false) return;

      const mouse_x = e.pageX * window.devicePixelRatio - this.#gameStateRef.current[3] - this.#canvasX
      const mouse_y = e.pageY * window.devicePixelRatio - this.#canvasY;

      const velocitySliderInfo = this.#positionsAndSizesInterface.getVelocitySliderInfo();
      const xDisplacement = (mouse_x  - this.#click_x.current);
      const velocityPerPixel = MAX_SPEED / (velocitySliderInfo.pixel_width * this.#positionsAndSizesInterface.getGrowthFactorVelocity());
      
      this.#click_x.current = mouse_x;
      this.#click_y.current = mouse_y;

      if (launchVelocity + xDisplacement * velocityPerPixel > MAX_SPEED) {
        setLaunchVelocity(MAX_SPEED)
      } else if (launchVelocity + xDisplacement * velocityPerPixel < 0) {
        setLaunchVelocity(0)
      } else {
        setLaunchVelocity(launchVelocity + xDisplacement * velocityPerPixel);
      }

      velocityInputRef.current.value = (Math.round(launchVelocity * 1000) / 1000).toString();
  }

  #handleHeightArrowClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    USER_ANCHOR_POINT: number[],
    CANNON_HORIZONTAL_SCALAR: number,
    GROUND_LEVEL_SCALAR: number,
    heightInputRef: RefObject<HTMLInputElement>,
    setUserAnchorPoint: Function,
  ) {
    if (this.disabledInput.height !== false) return;

    const canvas = this.#positionsAndSizesInterface.getCanvas();
    
    const mouse_x = e.pageX * window.devicePixelRatio - this.#gameStateRef.current[3] - this.#canvasX;
    const mouse_y = e.pageY * window.devicePixelRatio - this.#canvasY;

    const yDisplacement = (mouse_y - this.#click_y.current);
    
    this.#click_x.current = mouse_x;
    this.#click_y.current = mouse_y;
    const topScalar = this.#positionsAndSizesInterface.calculateTopScalar(USER_ANCHOR_POINT);
    if (USER_ANCHOR_POINT[1] * canvas.height + yDisplacement < topScalar * canvas.height) {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, topScalar]);
    } else if (USER_ANCHOR_POINT[1] * canvas.height + yDisplacement > GROUND_LEVEL_SCALAR * canvas.height) {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR]);
    } else {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, USER_ANCHOR_POINT[1] + yDisplacement / canvas.height])
    }

    const conversionRateY = this.#positionsAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT);
    const metreHeight = ((GROUND_LEVEL_SCALAR - USER_ANCHOR_POINT[1]) * canvas.height) / conversionRateY;
    heightInputRef.current.value = (Math.round(metreHeight * 1000) / 1000).toString();
  }

  mouseMove(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    elevationAngle: number,
    launchVelocity: number,
    USER_ANCHOR_POINT: number[],
    MAX_SPEED: number,
    CANNON_HORIZONTAL_SCALAR: number,
    GROUND_LEVEL_SCALAR: number,


    angleInputRef: RefObject<HTMLInputElement>,
    velocityInputRef: RefObject<HTMLInputElement>,
    heightInputRef: RefObject<HTMLInputElement>,

    setElevationAngle: Function,
    setLaunchVelocity: Function,
    setUserAnchorPoint: Function,
  ) {

    if (this.#userActionRef.current instanceof DraggingCannon) {
      this.#handleCannonClick(e, elevationAngle, USER_ANCHOR_POINT, angleInputRef, setElevationAngle);
    } else if (this.#userActionRef.current instanceof DraggingVelocity) {
      this.#handleVelocityClick(e, launchVelocity, MAX_SPEED, velocityInputRef, setLaunchVelocity);
    } 
    else if (this.#userActionRef.current instanceof DraggingHeightArrow) {
      this.#handleHeightArrowClick(
        e, 
        USER_ANCHOR_POINT,
        CANNON_HORIZONTAL_SCALAR, 
        GROUND_LEVEL_SCALAR, 
        heightInputRef, 
        setUserAnchorPoint
      );
    }
  }
  
}