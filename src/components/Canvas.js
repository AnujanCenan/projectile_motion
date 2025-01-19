import { useEffect, useRef, useState } from "react"
import useWindowSize from './resizingHook';

import "./CSS/Canvas.css"

import { 
  getCannonInfo, 
  getHolsterInfo,
  isLandscape
} from "../processingFunctions/drawingFunctions"

import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"

import velocityBar from "../images/velocity/velocityBar.png"
import velocitySlider from "../images/velocity/velocitySlider.png"

import heightScale from "../images/height/heightBar.png"
import heightArrow from "../images/height/heightIndicator.png"

import grassImg from "../images/foregrounds/grassLarge.png"

import target from "../images/targets/trainingTarget.png"

import { clickedOnCannon, clickedOnHeightArrow, clickedOnVelocitySlider } from "../processingFunctions/clickedOnObject"
import { calculateAngularDisplacement } from "../processingFunctions/calculateAngularDisplacement"
import { calclateGrowthFactorVelocity } from "../processingFunctions/calculateGrowthFactor";
import FireButton from "./FireButton";
import InputPanel from "./InputPanel";
import { calculateConversionRate } from "../processingFunctions/calculateConversionRate";
import { fireCannon } from "../processingFunctions/fireCannon";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes";
import { DrawingImages } from "../OOP/DrawingImages";

// TODO: ensure target_range <= MAX_HORIZONTAL_RANGE
export default function Canvas({MAX_RANGE, target_range, target_altitude}) {

  // Hack to make sure the input panel loads in after the canvas is rendered
  const [loadedCanvas, setLoadedCanvas] = useState(false);

  // Positioning Constants
  const GROUND_LEVEL_SCALAR = 0.8;
  const [CANNON_HORIZONTAL_SCALAR, setCannonHorizontalScalar] = useState(isLandscape() ? 0.6 * window.devicePixelRatio: 0.3 * window.devicePixelRatio);

  const [USER_ANCHOR_POINT, setUserAnchorPoint] = useState([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR])


  const { width, height } = useWindowSize();

  //// Element References
  const ctxRef = useRef(null);
  const canvasRef = useRef(null);

  // Image references
  const cannonRef = useRef(null);
  const holsterRef = useRef(null);

  const velocityBarRef = useRef(null);
  const velocitySliderRef = useRef(null);

  const heightScaleRef = useRef(null);
  const heightArrowRef = useRef(null);


  // Foreground image reference
  const foregroundRef = useRef(null);
  
  // Target image reference
  const targetRef = useRef(null);

  // Textbox references
  const angleInputRef = useRef(null);
  const velocityInputRef = useRef(null);
  const heightInputRef = useRef(null);

  // const MAX_SPEED = 140;
  const MAX_SPEED = Math.sqrt(9.8 * MAX_RANGE)

  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2");
  const holsterInfo = getHolsterInfo("holster_v1");
  const velocitySliderInfo = getHolsterInfo("velocity_slider");
  
  const [elevationAngle, setElevationAngle] = useState(0);
  const [launchVelocity, setLaunchVelocity] = useState(0)

  // User state variables
  const cannonClick = useRef(false);
  const sliderClick = useRef(false);
  const heightArrowClick = useRef(false);

  const click_x = useRef(0);
  const click_y = useRef(0);
  const clickedBehindPivot = useRef(1);

  // For class instances
  const positionAndSizesInterface = useRef(null);
  const drawingInterface = useRef(null);
  // 0.5 * window.devicePixelRatio: 0.8 * window.devicePixelRatio
  useEffect(() => {
    if (isLandscape()) {
      setCannonHorizontalScalar(0.6 * window.devicePixelRatio);
    } else {
      setCannonHorizontalScalar(0.3 * window.devicePixelRatio);
    }
  }, []);
  //////////////////////// Canvas Drawings ///////////////////////////////////////

  useEffect(() => {
    let dpi = window.devicePixelRatio;
    const canvas = canvasRef.current
  
    function fix_dpi() {
      let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
      let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
      canvas.setAttribute('height', style_height * dpi);
      canvas.setAttribute('width', style_width * dpi);
    }
    if (canvas) {
      fix_dpi();
      setLoadedCanvas(true);
    }
  }, [width, height, cannonInfo, holsterInfo]);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
      positionAndSizesInterface.current = new CanvasPositionAndSizes(canvasRef.current, cannonInfo, holsterInfo, MAX_RANGE);
      drawingInterface.current = new DrawingImages(positionAndSizesInterface.current)
    }
  }, [cannonInfo, holsterInfo, MAX_SPEED, MAX_RANGE])

  useEffect(() => {
    // console.log("Beginning environment on load")
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

    // console.log("In same useEffect - starting environment (not on load)")
    // drawingInterface.current.drawEnvironment(
    //   GROUND_LEVEL_SCALAR,
    //   USER_ANCHOR_POINT,
    //   MAX_SPEED,
    //   launchVelocity,
    //   elevationAngle,
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


    drawingInterface.current.drawForegroundOnLoad(GROUND_LEVEL_SCALAR, foregroundRef.current);
    
    drawingInterface.current.drawHolsterOnLoad(holsterRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawCannonOnLoad(cannonRef.current, USER_ANCHOR_POINT);


    drawingInterface.current.drawVelocityBarOnLoad(velocityBarRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawVelocitySliderOnLoad(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);

    drawingInterface.current.drawHeightScaleOnLoad(heightScaleRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawHeightArrowOnLoad(heightArrowRef.current, USER_ANCHOR_POINT);

    drawingInterface.current.drawTargetOnLoad(
      USER_ANCHOR_POINT, 
      GROUND_LEVEL_SCALAR, 
      targetRef.current, 
      target_range, 
      target_altitude
    )

  }, [USER_ANCHOR_POINT, launchVelocity, MAX_SPEED, target_altitude, target_range])

  useEffect(() => {

    // drawingInterface.current.drawEnvironment(
    //   GROUND_LEVEL_SCALAR,
    //   USER_ANCHOR_POINT,
    //   MAX_SPEED,
    //   launchVelocity,
    //   elevationAngle,
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
    if (ctxRef && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    drawingInterface.current.drawForeground(GROUND_LEVEL_SCALAR, foregroundRef.current);

    drawingInterface.current.drawHolster(holsterRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawCannon(cannonRef.current, -elevationAngle, USER_ANCHOR_POINT);

    drawingInterface.current.drawHeightPlatform(USER_ANCHOR_POINT, GROUND_LEVEL_SCALAR);
    
    drawingInterface.current.drawVelocityBar(velocityBarRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawVelocitySlider(velocitySliderRef.current, launchVelocity, MAX_SPEED, USER_ANCHOR_POINT);
    
    drawingInterface.current.drawHeightScale(heightScaleRef.current, USER_ANCHOR_POINT);
    drawingInterface.current.drawHeightArrow(heightArrowRef.current, USER_ANCHOR_POINT);

    drawingInterface.current.drawTarget(
      USER_ANCHOR_POINT, 
      GROUND_LEVEL_SCALAR, 
      targetRef.current, 
      target_range, 
      target_altitude
    )
  })

  //////////////////////// Changing Angles Mouse Events ////////////////////////

  function mouseDown(e) {
    // uses e.PageX and e.PageY not e.clientX and clientY
    const horizScroll = canvasRef.current.parentNode.scrollLeft
    cannonClick.current = clickedOnCannon(
      ctxRef.current, canvasRef.current, 
      e.pageX + horizScroll, e.pageY,
      cannonInfo, 
      elevationAngle,
      clickedBehindPivot,
      USER_ANCHOR_POINT
    )

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

    heightArrowClick.current = clickedOnHeightArrow(
      e.pageX + horizScroll,
      e.pageY,

      positionAndSizesInterface.current.getHeightArrowPosition(USER_ANCHOR_POINT),
      positionAndSizesInterface.current.getGrowthFactorHeight(),
      ctxRef.current
    )

    click_x.current = e.pageX + horizScroll;
    click_y.current = e.pageY;
  }

  function mouseMove(e) {
    const horizScroll = canvasRef.current.parentNode.scrollLeft
    if (cannonClick.current) {
      const angularDisplacement = calculateAngularDisplacement(
        e.pageX + horizScroll, e.pageY, 
        click_x.current, click_y.current, clickedBehindPivot.current,
        cannonInfo, 
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
      angleInputRef.current.value = Math.round(elevationAngle * 1000) / 1000;

    } else if (sliderClick.current) {
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

      velocityInputRef.current.value = Math.round(launchVelocity * 1000) / 1000;
    } 
    else if (heightArrowClick.current) {
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
      heightInputRef.current.value = metreHeight;
    }
  }

  function mouseUp(){
    cannonClick.current = false;
    sliderClick.current = false;
    heightArrowClick.current = false;
  }
  
  ////////////////////////////////////////////////////////////////////////////////
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

      <div className="Canvas_BillyGoat">
        {loadedCanvas && 
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
            ctxRef.current, 
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
    </div>
    
  )
}