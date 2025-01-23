import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../CanvasPositionAndSizes";
import { calculateAngularDisplacement } from "../../processingFunctions/calculateAngularDisplacement";

export class CanvasMouseMove {

  #positionsAndSizesInterface;
  #cannonClick;
  #clickedBehindPivot;
  #sliderClick;
  #heightArrowClick;
  #click_x;
  #click_y;

  constructor(
    postionsAndSizesInterface: CanvasPositionAndSizes,
    cannonClick: RefObject<boolean>,
    clickedBehindPivot: RefObject<number>,
    sliderClick: RefObject<boolean>,
    heightArrowClick: RefObject<boolean>,
    click_x: RefObject<number>,
    click_y: RefObject<number>,
    
  ) {
    this.#positionsAndSizesInterface = postionsAndSizesInterface;
    this.#cannonClick = cannonClick;
    this.#clickedBehindPivot = clickedBehindPivot
    this.#sliderClick = sliderClick;
    this.#heightArrowClick = heightArrowClick;
    this.#click_x = click_x;
    this.#click_y = click_y;
  }


  #handleCannonClick(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    elevationAngle: number,
    USER_ANCHOR_POINT: number[],
    angleInputRef: RefObject<HTMLInputElement>,
    setElevationAngle: Function,
  ) {
    const canvas = this.#positionsAndSizesInterface.getCanvas();
    const container = canvas.parentNode as HTMLDivElement;
    const horizScroll = container.scrollLeft

    const angularDisplacement = calculateAngularDisplacement(
      e.pageX + horizScroll, 
      e.pageY, 
      this.#click_x.current, 
      this.#click_y.current, 
      this.#clickedBehindPivot.current,
      this.#positionsAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT),
      elevationAngle,
    );

    this.#click_x.current = e.pageX + horizScroll;
    this.#click_y.current = e.pageY;

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
      const canvas = this.#positionsAndSizesInterface.getCanvas();
      const container = canvas.parentNode as HTMLDivElement;
      const horizScroll = container.scrollLeft

      const mouse_x = e.pageX + horizScroll;
      const mouse_y = e.pageY;

      const velocitySliderInfo = this.#positionsAndSizesInterface.getVelocitySliderInfo();
      const xDisplacement = (mouse_x  - this.#click_x.current) * window.devicePixelRatio;
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
    const canvas = this.#positionsAndSizesInterface.getCanvas();
    const container = canvas.parentNode as HTMLDivElement;
    const horizScroll = container.scrollLeft
    
    const mouse_x = e.pageX + horizScroll;
    const mouse_y = e.pageY;

    const yDisplacement = (mouse_y - this.#click_y.current) * window.devicePixelRatio;
    
    this.#click_x.current = mouse_x;
    this.#click_y.current = mouse_y;
    
    window.scrollTo({top: mouse_y - canvas.height * 0.1 * 2, behavior: "smooth"})

    if (USER_ANCHOR_POINT[1] * canvas.height + yDisplacement < 0.1 * canvas.height) {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, 0.1]);
    } else if (USER_ANCHOR_POINT[1] * canvas.height + yDisplacement > GROUND_LEVEL_SCALAR * canvas.height) {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR]);
    } else {
      setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, USER_ANCHOR_POINT[1] + yDisplacement / canvas.height])
    }

    const conversionRate = this.#positionsAndSizesInterface.calculateConversionRate(USER_ANCHOR_POINT);
    const metreHeight = ((GROUND_LEVEL_SCALAR - USER_ANCHOR_POINT[1]) * canvas.height) / conversionRate;
    heightInputRef.current.value = metreHeight.toString();
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
    
    setUserState: React.Dispatch<React.SetStateAction<UserState>>
  ) {

    if (this.#cannonClick.current) {
      this.#handleCannonClick(e, elevationAngle, USER_ANCHOR_POINT, angleInputRef, setElevationAngle);
     setUserState("draggingCannon");
    } else if (this.#sliderClick.current) {
      this.#handleVelocityClick(e, launchVelocity, MAX_SPEED, velocityInputRef, setLaunchVelocity);
      setUserState("draggingVelocity");
    } 
    else if (this.#heightArrowClick.current) {
      this.#handleHeightArrowClick(
        e, 
        USER_ANCHOR_POINT,
        CANNON_HORIZONTAL_SCALAR, 
        GROUND_LEVEL_SCALAR, 
        heightInputRef, 
        setUserAnchorPoint
      );
      setUserState("draggingHeightArrow")
    }
  }
  
}