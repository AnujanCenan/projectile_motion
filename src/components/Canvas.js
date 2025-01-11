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

import { clickedOnCannon, clickedOnHeightArrow, clickedOnVelocitySlider } from "../processingFunctions/clickedOnObject"
import { calculateAngularDisplacement } from "../processingFunctions/calculateAngularDisplacement"
import { findPivotGlobalCoords } from "../processingFunctions/findPivotGlobalCoords"
import { calclateGrowthFactorVelocity } from "../processingFunctions/calculateGrowthFactor";
import FireButton from "./FireButton";
import InputPanel from "./InputPanel";
import { calculateConversionRate } from "../processingFunctions/calculateConversionRate";
import { fireCannon } from "../processingFunctions/fireCannon";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes";
import { DrawingImages } from "../OOP/DrawingImages";

export default function Canvas() {

  // Hack to make sure the input panel loads in after the canvas is rendered
  const [loadedCanvas, setLoadedCanvas] = useState(false);



  // Positioning Constants
  const GROUND_LEVEL_SCALAR = 0.8;
  const CANNON_HORIZONTAL_SCALAR = isLandscape() ? 0.1 : 0.5;

  const [USER_ANCHOR_POINT, setUserAnchorPoint] = useState([CANNON_HORIZONTAL_SCALAR, 0.8])


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

  // Textbox references
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

  // For class instances
  const positionAndSizesInterface = useRef(null);
  const drawingInterface = useRef(null);

  
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
      positionAndSizesInterface.current = new CanvasPositionAndSizes(canvasRef.current, cannonInfo, holsterInfo, 500);
      drawingInterface.current = new DrawingImages(positionAndSizesInterface.current)
    }
  }, [cannonInfo, holsterInfo])

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');

    drawingInterface.current.drawDefaultCannon(cannonRef.current, holsterRef.current, USER_ANCHOR_POINT);

    drawingInterface.current.drawDefaultVelocitySlider(
      velocityBarRef.current,
      velocitySliderRef.current,
      launchVelocity,
      MAX_SPEED,
      USER_ANCHOR_POINT
    )
    drawingInterface.current.drawDefaultHeightScale(
      heightScaleRef.current,
      heightArrowRef.current,
      USER_ANCHOR_POINT
    )
  })

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    if (ctxRef && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    drawingInterface.current.drawRotatedCannon(
      -elevationAngle, 
      cannonRef.current, 
      holsterRef.current, 
      USER_ANCHOR_POINT
    );

    drawingInterface.current.drawHeightPlatform(USER_ANCHOR_POINT);
    
    drawingInterface.current.drawVelocitySlider(
      velocityBarRef.current, 
      velocitySliderRef.current, 
      launchVelocity, 
      MAX_SPEED, 
      USER_ANCHOR_POINT
    )
    
    drawingInterface.current.drawHeightScale(
      heightScaleRef.current,
      heightArrowRef.current,
      USER_ANCHOR_POINT
    )


    const [piv_x, piv_y] = findPivotGlobalCoords(canvasRef.current, USER_ANCHOR_POINT);


    const conversionRate = calculateConversionRate(canvasRef.current, USER_ANCHOR_POINT, 500);
    // Drawing a scrappy target

    const metreHeight = ((0.8 - USER_ANCHOR_POINT[1]) * canvasRef.current.height) / conversionRate;

    ctxRef.current.beginPath();
    ctxRef.current.arc(piv_x + 500 * conversionRate, piv_y + (metreHeight - 0) * conversionRate, 20, 0, 2 * Math.PI);
    ctxRef.current.strokeStyle = "blue";
    ctxRef.current.fillStyle = "purple";
    ctxRef.current.stroke();
    ctxRef.current.fill();
  })

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

    sliderClick.current = clickedOnVelocitySlider(
      e.pageX, 
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
      e.pageX,
      e.pageY,

      positionAndSizesInterface.current.getHeightArrowPosition(USER_ANCHOR_POINT),
      positionAndSizesInterface.current.getGrowthFactorHeight(),
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
      const mouse_x = e.pageX;
      const mouse_y = e.pageY;

      const yDisplacement = (mouse_y - click_y.current) * window.devicePixelRatio;
      
      click_x.current = mouse_x;
      click_y.current = mouse_y;
      
      window.scrollTo({top: mouse_y - canvasRef.current.height * 0.1 * 2, behavior: "smooth"})

      if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement < 0.1 * canvasRef.current.height) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, 0.1]);
      } else if (USER_ANCHOR_POINT[1] * canvasRef.current.height + yDisplacement > 0.8 * canvasRef.current.height) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, 0.8]);
      } else {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, USER_ANCHOR_POINT[1] + yDisplacement / canvasRef.current.height])
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
  
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <div id="container">
      <canvas ref={canvasRef} 
        style={{height: 0.8 * height, width: 1 * width}} 
        id="canvas" 
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
          CANNON_HORIZONTAL_SCALAR={CANNON_HORIZONTAL_SCALAR}
        />
      }

      <FireButton fireCannon={() => fireCannon(ctxRef.current, canvasRef.current, USER_ANCHOR_POINT, launchVelocity, elevationAngle, GROUND_LEVEL_SCALAR, 500)} />
    </div>
    
  )
}