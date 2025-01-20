import { useEffect, useRef, useState } from "react"
import useWindowSize from "./resizingHook.tsx"

import "./CSS/Canvas.css"

import { 
  getCannonInfo, 
  getHolsterInfo,
  getVelocitySliderInfo,
  isLandscape
} from "../processingFunctions/drawingFunctions.tsx"

import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"

import velocityBar from "../images/velocity/velocityBar.png"
import velocitySlider from "../images/velocity/velocitySlider.png"

import heightScale from "../images/height/heightBar.png"
import heightArrow from "../images/height/heightIndicator.png"


import grassImg from "../images/foregrounds/grassLarge.png"

import target from "../images/targets/trainingTarget.png"

import { clickedOnCannon, clickedOnHeightArrow, clickedOnVelocitySlider } from "../processingFunctions/clickedOnObject.tsx"
import { calculateAngularDisplacement } from "../processingFunctions/calculateAngularDisplacement.tsx"
import { calclateGrowthFactorVelocity } from "../processingFunctions/calculateGrowthFactor.tsx";
import FireButton from "./FireButton.tsx";
import InputPanel from "./InputPanel.tsx";
import { calculateConversionRate } from "../processingFunctions/calculateConversionRate.tsx";
import { fireCannon } from "../processingFunctions/fireCannon.tsx";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes.tsx";
import { DrawingImages } from "../OOP/DrawingImages.tsx"


interface CanvasProps {
  MAX_RANGE: number,
  target_range: number,
  target_altitude: number
}
// TODO: ensure target_range <= MAX_HORIZONTAL_RANGE
export default function Canvas({MAX_RANGE, target_range, target_altitude}: CanvasProps) {

  // Hack to make sure the input panel loads in after the canvas is rendered
  const [loadedCanvas, setLoadedCanvas] = useState(false);

  // Positioning Constants
  const GROUND_LEVEL_SCALAR = 0.8;
  const [CANNON_HORIZONTAL_SCALAR, setCannonHorizontalScalar] = useState(isLandscape() ? 0.5: 0.5);

  const [USER_ANCHOR_POINT, setUserAnchorPoint] = useState([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR] as number[])


  const { width, height } = useWindowSize();


  //// Element References
  // const ctxRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Image references
  const cannonRef = useRef(new Image());
  const holsterRef = useRef(new Image());

  const velocityBarRef = useRef(new Image());
  const velocitySliderRef = useRef(new Image());

  const heightScaleRef = useRef(new Image());
  const heightArrowRef = useRef(new Image());


  // Foreground image reference
  const foregroundRef = useRef(new Image());
  
  // Target image reference
  const targetRef = useRef(new Image());

  // Textbox references
  const angleInputRef = useRef<HTMLInputElement>(null);
  const velocityInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  // const MAX_SPEED = 140;
  const MAX_SPEED = Math.sqrt(9.8 * MAX_RANGE)

  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2") as 
  {
    pixel_width: number;
    pixel_height: number;
    pivot_x: number;
    pivot_y: number;
  }
  const holsterInfo = getHolsterInfo("holster_v1") as 
  {  
    pixel_width: number;
    pixel_height: number;
    pivot_x: number;
    pivot_y: number;
  }

  const velocitySliderInfo = getVelocitySliderInfo("velocity_slider") as 
  {
    pixel_width: number;
    pixel_height: number;
    slider_pixel_width: number;
    slider_pixel_height: number;
  };
  
  const [elevationAngle, setElevationAngle] = useState(0);
  const [launchVelocity, setLaunchVelocity] = useState(0)

  // User state variables
  const cannonClick = useRef(false);
  const sliderClick = useRef(false);
  const heightArrowClick = useRef(false);

  const click_x = useRef(0);
  const click_y = useRef(0);
  const clickedBehindPivot = useRef<number>(1);

  // For class instances
  const positionAndSizesInterface = useRef<CanvasPositionAndSizes>(null);
  const drawingInterface = useRef<DrawingImages>(null);
  // 0.5 * window.devicePixelRatio: 0.8 * window.devicePixelRatio
  useEffect(() => {
    if (isLandscape()) {
      setCannonHorizontalScalar(0.5);
    } else {
      setCannonHorizontalScalar(0.5);
    }
  }, []);
  //////////////////////// Canvas Drawings ///////////////////////////////////////

  useEffect(() => {
    let dpi = window.devicePixelRatio;
    const canvas = canvasRef.current
  
    function fix_dpi() {
      if (canvas) {
        let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
        canvas.setAttribute('height', (style_height * dpi).toString());
        canvas.setAttribute('width', (style_width * dpi).toString());
        setLoadedCanvas(true);
      }
    }
    
    fix_dpi();
  }, [width, height, cannonInfo, holsterInfo]);

  useEffect(() => {
    if (canvasRef.current) {
      // ctxRef.current = canvasRef.current.getContext('2d');
      positionAndSizesInterface.current = new CanvasPositionAndSizes(canvasRef.current, cannonInfo, holsterInfo, MAX_RANGE);
      drawingInterface.current = new DrawingImages(positionAndSizesInterface.current)
      
      // drawingInterface.current.drawEnvironmentOnLoad(
      //   GROUND_LEVEL_SCALAR, 
      //   USER_ANCHOR_POINT,
      //   MAX_SPEED,
      //   launchVelocity,
      //   target_range,
      //   target_altitude,
      //   foregroundRef, 
      //   holsterRef, 
      //   cannonRef, 
      //   velocityBarRef, 
      //   velocitySliderRef, 
      //   heightScaleRef, 
      //   heightArrowRef,
      //   targetRef
      // )
      
    }
  }, [cannonInfo, holsterInfo, MAX_RANGE])

  window.onload = () => {
    if (drawingInterface.current) {
      

      drawingInterface.current.drawEnvironment(
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
      )
    }
  }

  useEffect(() => {
    if (drawingInterface.current) {
      
      
      drawingInterface.current.drawEnvironment(
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
      )
    }
  }, [MAX_SPEED, USER_ANCHOR_POINT, elevationAngle, launchVelocity, target_altitude, target_range, width, height])

  //////////////////////// Changing Angles Mouse Events ////////////////////////

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    // uses e.PageX and e.PageY not e.clientX and clientY
    if (!canvasRef || (!canvasRef.current)) return;
    const container = canvasRef.current.parentNode as HTMLDivElement; 
    const horizScroll = container.scrollLeft
    cannonClick.current = clickedOnCannon(
      canvasRef.current, 
      e.pageX + horizScroll, e.pageY,
      cannonInfo, 
      elevationAngle,
      clickedBehindPivot,
      USER_ANCHOR_POINT
    )
    if (positionAndSizesInterface.current) {
      sliderClick.current = clickedOnVelocitySlider(
        e.pageX + horizScroll, 
        e.pageY, 
        launchVelocity, 
        velocitySliderInfo.pixel_width, 
        velocitySliderInfo.pixel_height, 
        velocitySliderInfo.slider_pixel_width, 
        velocitySliderInfo.slider_pixel_height, 
        positionAndSizesInterface.current.getVelocityBarPosition(USER_ANCHOR_POINT), 
        MAX_SPEED, 
        calclateGrowthFactorVelocity(canvasRef.current)
      )
    }

    if (positionAndSizesInterface.current) {
      heightArrowClick.current = clickedOnHeightArrow(
        e.pageX + horizScroll,
        e.pageY,
        positionAndSizesInterface.current.getHeightArrowPosition(USER_ANCHOR_POINT),
        positionAndSizesInterface.current.getGrowthFactorHeight(),
      )
    }

    click_x.current = e.pageX + horizScroll;
    click_y.current = e.pageY;
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!canvasRef || (!canvasRef.current)) return;
    const container = canvasRef.current.parentNode as HTMLDivElement; 

    const horizScroll = container.scrollLeft
    if (cannonClick.current) {
    if (!angleInputRef.current) return;
      const angularDisplacement = calculateAngularDisplacement(
        e.pageX + horizScroll, 
        e.pageY, 
        click_x.current, 
        click_y.current, 
        clickedBehindPivot.current,
        canvasRef.current,
        elevationAngle,
        USER_ANCHOR_POINT
      );

      click_x.current = e.pageX + horizScroll;
      click_y.current = e.pageY;
      if (elevationAngle + angularDisplacement > 90) {
        setElevationAngle(90)
      } else if (elevationAngle + angularDisplacement < 0) {
        setElevationAngle(0)
      } else {
        setElevationAngle(elevationAngle + angularDisplacement);
      }
      angleInputRef.current.value = (Math.round(elevationAngle * 1000) / 1000).toString();

    } else if (sliderClick.current) {
      if (!velocityInputRef.current) return;
      if (!positionAndSizesInterface.current) return;
      const mouse_x = e.pageX + horizScroll;
      const mouse_y = e.pageY;

      const xDisplacement = (mouse_x  - click_x.current) * window.devicePixelRatio;
      const velocityPerPixel = MAX_SPEED / (velocitySliderInfo.pixel_width * positionAndSizesInterface.current.getGrowthFactorVelocity());
      
      click_x.current = mouse_x;
      click_y.current = mouse_y;

      if (launchVelocity + xDisplacement * velocityPerPixel > MAX_SPEED) {
        setLaunchVelocity(MAX_SPEED)
      } else if (launchVelocity + xDisplacement * velocityPerPixel < 0) {
        setLaunchVelocity(0)
      } else {
        setLaunchVelocity(launchVelocity + xDisplacement * velocityPerPixel);
      }

      velocityInputRef.current.value = (Math.round(launchVelocity * 1000) / 1000).toString();
    } 
    else if (heightArrowClick.current) {
      if (!heightInputRef.current) return;
      const mouse_x = e.pageX + horizScroll;
      const mouse_y = e.pageY;

      const yDisplacement = (mouse_y - click_y.current) * window.devicePixelRatio;
      
      click_x.current = mouse_x;
      click_y.current = mouse_y;
      
      window.scrollTo({top: mouse_y - canvasRef.current.height * 0.1 * 2, behavior: "smooth"})

      if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement < 0.1 * canvasRef.current.height) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, 0.1]);
      } else if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement > GROUND_LEVEL_SCALAR * canvasRef.current.height) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR]);
      } else {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, USER_ANCHOR_POINT[1] + yDisplacement / canvasRef.current.height])
      }

      const conversionRate = calculateConversionRate(canvasRef.current, USER_ANCHOR_POINT, MAX_RANGE);
      const metreHeight = ((GROUND_LEVEL_SCALAR - USER_ANCHOR_POINT[1]) * canvasRef.current.height) / conversionRate;
      heightInputRef.current.value = metreHeight.toString();
    }
  }

  function mouseUp(){
    cannonClick.current = false;
    sliderClick.current = false;
    heightArrowClick.current = false;
  }
  
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <div id="container">
      <canvas ref={canvasRef} 
        id="canvas" 
        onMouseDown={(e) => mouseDown(e)}
        onMouseUp={() => mouseUp()}
        onMouseMove={(e) => mouseMove(e)}
      >
        <img 
          src={grassImg}
          alt="grass"
          ref={foregroundRef}
        />

        <img
          src={cannonImg}
          alt="barrel"
          ref={cannonRef}
        />
        <img 
          src={holsterImg}
          alt="holster"
          ref={holsterRef}
        />

        <img
          src={velocityBar}
          alt="velocityBar"
          ref={velocityBarRef}
        />
        <img
          src={velocitySlider}
          alt="velocitySlider"
          ref={velocitySliderRef}
        />

        <img
          src={heightScale}
          alt="heightScale"
          ref={heightScaleRef}
        />
        <img
          src={heightArrow}
          alt="heightArrow"
          ref={heightArrowRef}
        />

        <img
          src={target}
          alt="target"
          ref={targetRef}
        />

      </canvas>

      {loadedCanvas && canvasRef && canvasRef.current && 
        <InputPanel 
          setElevationAngle={setElevationAngle} 
          setLaunchVelocity={setLaunchVelocity} 
          setUserAnchorPoint={setUserAnchorPoint}
          MAX_SPEED={MAX_SPEED} 
          angleInputRef={angleInputRef} 
          velocityInputRef={velocityInputRef}
          heightInputRef={heightInputRef}
          canvas={canvasRef.current}
          USER_ANCHOR_PONT={USER_ANCHOR_POINT}
          MAX_HORIZONTAL_RANGE={MAX_RANGE}
          CANNON_HORIZONTAL_SCALAR={CANNON_HORIZONTAL_SCALAR}
          GROUND_LEVEL_SCALAR={GROUND_LEVEL_SCALAR}
        />
      }

      <FireButton 
        fireCannon={() => fireCannon(
          canvasRef.current, 
          USER_ANCHOR_POINT, 
          launchVelocity, 
          elevationAngle, 
          GROUND_LEVEL_SCALAR, 
          MAX_RANGE, 
          width
        )} 
      />

    </div>
    
  )
}