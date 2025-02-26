import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";
import { clickedOnCannon, clickedOnHeightArrow, clickedOnVelocitySlider } from "../../processingFunctions/clickedOnObject";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
import { DraggingCannon } from "../../states/userGameActions/DraggingCannon";
import { DraggingHeightArrow } from "../../states/userGameActions/DraggingHeightArrow";
import { DraggingVelocity } from "../../states/userGameActions/DraggingVelocity";

export class CanvasMouseDown {
  #positionsAndSizesInterface;
  #canvasX;
  #canvasY;
  #clickedBehindPivot;
  #userActionRef;
  #gameStateRef;
  #click_x;
  #click_y;
  
  constructor(
    postionsAndSizesInterface: CanvasPositionAndSizes,
    // cannonClick: RefObject<boolean>,
    clickedBehindPivot: RefObject<number>,
    // sliderClick: RefObject<boolean>,
    // heightArrowClick: RefObject<boolean>,
    userActionRef: RefObject<UserGameAction>,
    gameStateRef: RefObject<GameState>,
    click_x: RefObject<number>,
    click_y: RefObject<number>
  ) {
    this.#positionsAndSizesInterface = postionsAndSizesInterface;
    this.#canvasX = this.#positionsAndSizesInterface.getCanvas().getBoundingClientRect().x * window.devicePixelRatio;
    this.#canvasY =  this.#positionsAndSizesInterface.getCanvas().getBoundingClientRect().y * window.devicePixelRatio;
    this.#clickedBehindPivot = clickedBehindPivot
    this.#userActionRef = userActionRef;
    this.#gameStateRef = gameStateRef;
    this.#click_x = click_x;
    this.#click_y = click_y;
  }

  #cannonClickCheck(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, 
    elevationAngle: number, 
    USER_ANCHOR_POINT: number[]
  ) {
    const cannonInfo = this.#positionsAndSizesInterface.getCannonInfo();

    const didClick = clickedOnCannon(
      e.pageX * window.devicePixelRatio + this.#gameStateRef.current[3] - this.#canvasX, 
      e.pageY * window.devicePixelRatio - this.#canvasY,
      cannonInfo,
      this.#positionsAndSizesInterface.getGrowthFactorCannon(),
      this.#positionsAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT),
      elevationAngle,
      this.#clickedBehindPivot,
    )
    if (didClick) this.#userActionRef.current = new DraggingCannon();
  }

  #velocitySliderCheck(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    positionAndSizesInterface: CanvasPositionAndSizes,
    launchVelocity: number, 
    USER_ANCHOR_POINT: number[],
    MAX_SPEED: number
  ) {
    const velocitySliderInfo = this.#positionsAndSizesInterface.getVelocitySliderInfo();
    const didClick = clickedOnVelocitySlider(
      e.pageX * window.devicePixelRatio + this.#gameStateRef.current[3] -  this.#canvasX,
      e.pageY * window.devicePixelRatio -  this.#canvasY, 
      launchVelocity, 
      velocitySliderInfo.pixel_width, 
      velocitySliderInfo.pixel_height, 
      velocitySliderInfo.slider_pixel_width, 
      velocitySliderInfo.slider_pixel_height, 
      this.#positionsAndSizesInterface.getVelocityBarPosition(USER_ANCHOR_POINT), 
      MAX_SPEED, 
      positionAndSizesInterface.getGrowthFactorVelocity()
    )

    if (didClick) this.#userActionRef.current = new DraggingVelocity();
  }

  #heightArrowCheck(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, 
    USER_ANCHOR_POINT: number[]
  ) {
    if (this.#positionsAndSizesInterface) {
      const didClick = clickedOnHeightArrow(
        e.pageX * window.devicePixelRatio + this.#gameStateRef.current[3] - this.#canvasX,
        e.pageY * window.devicePixelRatio - this.#canvasY,
        this.#positionsAndSizesInterface.getHeightArrowPosition(USER_ANCHOR_POINT),
        this.#positionsAndSizesInterface.getGrowthFactorHeight(USER_ANCHOR_POINT),
      )

      if (didClick) this.#userActionRef.current = new DraggingHeightArrow();
    }

  }

  mouseDown(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    positionAndSizesInterface: CanvasPositionAndSizes,
    elevationAngle: number,
    launchVelocity: number,
    USER_ANCHOR_POINT: number[],
    MAX_SPEED: number,

  ) {
    // uses e.PageX and e.PageY not e.clientX and clientY
    const canvas = this.#positionsAndSizesInterface.getCanvas();

    if (!canvas) return;

    this.#cannonClickCheck(e, elevationAngle, USER_ANCHOR_POINT);

    this.#velocitySliderCheck(e, positionAndSizesInterface, launchVelocity, USER_ANCHOR_POINT, MAX_SPEED)

    this.#heightArrowCheck(e, USER_ANCHOR_POINT);


    this.#click_x.current = e.pageX * window.devicePixelRatio + this.#gameStateRef.current[3] - this.#canvasX;
    this.#click_y.current = e.pageY * window.devicePixelRatio - this.#canvasY;
  }
}