import { useEffect, useRef, useState } from "react"
import useWindowSize from './resizingHook';

import "./CSS/Canvas.css"

import { 
  drawRotatedCannon, 
  getCannonInfo, 
  getHolsterInfo,
  drawVelocitySlider,
  drawDefaultCannon,
  drawDefaultVelocitySlider,
  drawDefaultHeightScale,
  drawHeightScale
} from "../processingFunctions/drawingFunctions"

import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"

import velocityBar from "../images/velocity/velocityBar.png"
import velocitySlider from "../images/velocity/velocitySlider.png"

import heightScale from "../images/height/heightBar.png"
import heightArrow from "../images/height/heightIndicator.png"

import { clickedOnCannon, clickedOnHeightArrow, clickedOnVelocitySlider } from "../processingFunctions/clickedOnObject"
import { calculateAngularDisplacement } from "../processingFunctions/calculateAngularDisplacement"
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords"
import { findCannonTopLeftGlobalCoords, topLeftCornerArrow, topLeftCornerVelocityBar } from "../processingFunctions/topLeftCorners";
import { calclateGrowthFactorVelocity, calculateGrowthFactorHeight } from "../processingFunctions/calculateGrowthFactor";
import FireButton from "./FireButton";
import InputPanel from "./InputPanel";
import { calculateConversionRate } from "../processingFunctions/calculateConversionRate";
import { fireCannon } from "../processingFunctions/fireCannon";

export default function Canvas() {

  // Hack to make sure the input panel loads in after the canvas is rendered
  const [loadedCanvas, setLoadedCanvas] = useState(false);

  // Positioning Constants
  const [USER_ANCHOR_POINT, setUserAnchorPoint] = useState([0.2, 0.8])
  const GROUND_LEVEL_SCALAR = 0.8;

  const { width, height } = useWindowSize();

  // Element References
  const ctxRef = useRef(null);

  const canvasRef = useRef(null);

  const cannonRef = useRef(null);
  const holsterRef = useRef(null);

  const velocityBarRef = useRef(null);
  const velocitySliderRef = useRef(null);

  const heightScaleRef = useRef(null);
  const heightArrowRef = useRef(null);

  const angleInputRef = useRef(null);
  const velocityInputRef = useRef(null);
  const heightInputRef = useRef(null);


  const MAX_SPEED = 140;

  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2");
  const holsterInfo = getHolsterInfo("holster_v1");
  const velocitySliderInfo = getHolsterInfo("velocity_slider");
  
  const [elevationAngle, setElevationAngle] = useState(0);
  const [launchVelocity, setLaunchVelocity] = useState(10)

  // User state variables
  const cannonClick = useRef(false);
  const sliderClick = useRef(false);
  const heightArrowClick = useRef(false);

  const click_x = useRef(0);
  const click_y = useRef(0);
  const clickedBehindPivot = useRef(1);

  
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
  }, [width, height]);

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    drawDefaultCannon(ctxRef.current, canvasRef.current, cannonRef.current, holsterRef.current, cannonInfo, holsterInfo, USER_ANCHOR_POINT)
    drawDefaultVelocitySlider(
      ctxRef.current, 
      canvasRef.current, 
      velocityBarRef.current, 
      velocitySliderRef.current, 
      findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo), 
      MAX_SPEED, 
      launchVelocity
    )
    drawDefaultHeightScale(
      ctxRef.current,
      canvasRef.current,
      heightScaleRef.current,
      heightArrowRef.current,
      findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo),
      USER_ANCHOR_POINT[1]
    )
  })

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    if (ctxRef && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    drawRotatedCannon(ctxRef.current, canvasRef.current, 
      -elevationAngle, 
      cannonRef.current, holsterRef.current, 
      cannonInfo, holsterInfo,
      USER_ANCHOR_POINT
    );

    drawVelocitySlider(
      ctxRef.current, canvasRef.current, 
      velocityBarRef.current, velocitySliderRef.current,
      findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo),
      launchVelocity, MAX_SPEED
    );


    drawHeightScale(
      ctxRef.current,
      canvasRef.current,
      heightScaleRef.current,
      heightArrowRef.current,
      findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo),
      USER_ANCHOR_POINT[1]
    );


    const [piv_x, piv_y] = findPivotGlobalCoords(canvasRef.current, USER_ANCHOR_POINT);


    const conversionRate = calculateConversionRate(canvasRef.current, USER_ANCHOR_POINT, 500);
    // Drawing a scrappy target

    const metreHeight = ((0.8 - USER_ANCHOR_POINT[1]) * canvasRef.current.height) / conversionRate;

    ctxRef.current.beginPath();
    ctxRef.current.arc(piv_x + 430 * conversionRate, piv_y + (metreHeight - 100) * conversionRate, 20, 0, 2 * Math.PI);
    ctxRef.current.strokeStyle = "blue";
    ctxRef.current.fillStyle = "purple";
    ctxRef.current.stroke();
    ctxRef.current.fill();
  }, [cannonInfo, elevationAngle, holsterInfo, width, launchVelocity, USER_ANCHOR_POINT])

  //////////////////////// Changing Angles Mouse Events ////////////////////////

  function mouseDown(e) {
    // uses e.PageX and e.PageY not e.clientX and clientY

    cannonClick.current = clickedOnCannon(
      ctxRef.current, canvasRef.current, 
      e.pageX, e.pageY,
      cannonInfo, 
      elevationAngle,
      clickedBehindPivot,
      USER_ANCHOR_POINT
    )

    const cannonTopLeft = findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo)
    sliderClick.current = clickedOnVelocitySlider(
      e.pageX, 
      e.pageY, 
      launchVelocity, 
      velocitySliderInfo.pixel_width, 
      velocitySliderInfo.pixel_height, 
      velocitySliderInfo.slider_pixel_width, 
      velocitySliderInfo.slider_pixel_height, 
      topLeftCornerVelocityBar(cannonTopLeft, canvasRef.current), 
      MAX_SPEED, 
      calclateGrowthFactorVelocity(canvasRef.current)
    )

    const cannonPosition = findCannonTopLeftGlobalCoords(canvasRef.current, USER_ANCHOR_POINT, cannonInfo)
    heightArrowClick.current = clickedOnHeightArrow(
      e.pageX,
      e.pageY,
      topLeftCornerArrow(cannonPosition, canvasRef.current, USER_ANCHOR_POINT[1]),
      calculateGrowthFactorHeight(canvasRef.current),
      ctxRef.current
    )


    click_x.current = e.pageX;
    click_y.current = e.pageY;
  }

  function mouseMove(e) {
    if (cannonClick.current) {
      const angularDisplacement = calculateAngularDisplacement(
        e.pageX, e.pageY, 
        click_x.current, click_y.current, clickedBehindPivot.current,
        cannonInfo, 
        canvasRef.current,
        elevationAngle,
        USER_ANCHOR_POINT
      );

      click_x.current = e.pageX;
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
      const mouse_x = e.pageX;
      const mouse_y = e.pageY;

      const xDisplacement = (mouse_x  - click_x.current) * window.devicePixelRatio;
      const velocityPerPixel = MAX_SPEED / (velocitySliderInfo.pixel_width * calclateGrowthFactorVelocity(canvasRef.current));
      
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
      const mouse_x = e.pageX;
      const mouse_y = e.pageY;

      const yDisplacement = (mouse_y - click_y.current) * window.devicePixelRatio;
      
      click_x.current = mouse_x;
      click_y.current = mouse_y;

      if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement < 0.1 * canvasRef.current.height) {
        setUserAnchorPoint([0.2, 0.1]);
      } else if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement > 0.8 * canvasRef.current.height) {
        setUserAnchorPoint([0.2, 0.8]);
      } else {
        setUserAnchorPoint([0.2, USER_ANCHOR_POINT[1] + yDisplacement / canvasRef.current.height])
      }

      const conversionRate = calculateConversionRate(canvasRef.current, USER_ANCHOR_POINT, 500);
      const metreHeight = ((0.8 - USER_ANCHOR_POINT[1]) * canvasRef.current.height) / conversionRate;
      heightInputRef.current.value = metreHeight;
    }
  }

  function mouseUp(){
    cannonClick.current = false;
    sliderClick.current = false;
    heightArrowClick.current = false;
  }

  //////////////////////////////////////////////////////////////////////////////

  
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <canvas ref={canvasRef} 
        style={{height: 1.3 * height, width: 2 * width}} id="canvas" 
        onMouseDown={(e) => mouseDown(e)}
        onMouseUp={() => mouseUp()}
        onMouseMove={(e) => mouseMove(e)}
      >
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
      </canvas>

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
          MAX_HORIZONTAL_RANGE={500}
        />
    }

      <FireButton fireCannon={() => fireCannon(ctxRef.current, canvasRef.current, USER_ANCHOR_POINT, launchVelocity, elevationAngle, GROUND_LEVEL_SCALAR, 500)} />
    </>
    
  )
}