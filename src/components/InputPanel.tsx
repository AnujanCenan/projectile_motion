import { Ref } from "react";
import { calculateConversionRate } from "../processingFunctions/calculateConversionRate.tsx";
import "./CSS/InputPanel.css"

interface InputPanelProps {
  setElevationAngle: Function 
  setLaunchVelocity: Function
  setUserAnchorPoint: Function
  MAX_SPEED: number
  angleInputRef: React.RefObject<HTMLInputElement | null>
  velocityInputRef: React.RefObject<HTMLInputElement | null>
  heightInputRef: React.RefObject<HTMLInputElement | null>
  canvas: HTMLCanvasElement
  USER_ANCHOR_PONT: number[]
  MAX_HORIZONTAL_RANGE: number
  CANNON_HORIZONTAL_SCALAR: number
  GROUND_LEVEL_SCALAR: number
}

export default function InputPanel({
  setElevationAngle, 
  setLaunchVelocity,
  setUserAnchorPoint,
  MAX_SPEED, 
  angleInputRef, 
  velocityInputRef, 
  heightInputRef,
  canvas,
  USER_ANCHOR_PONT,
  MAX_HORIZONTAL_RANGE,
  CANNON_HORIZONTAL_SCALAR,
  GROUND_LEVEL_SCALAR = 0.8
}: InputPanelProps) {

  function changeVelocityWithTextBox(e: React.ChangeEvent<HTMLInputElement>) {
    if (!velocityInputRef || !velocityInputRef.current) {
      return;
    }

    const val = e.target.value;
    try {
      if (val === "") {
        setLaunchVelocity(0);
      }
      if (isNaN(parseFloat(val))) {
        return;
      } else if (parseFloat(val) < 0) {
        setLaunchVelocity(0);
        velocityInputRef.current.value = "0";
      } else if (parseFloat(val) > MAX_SPEED) {
        setLaunchVelocity(MAX_SPEED);
        velocityInputRef.current.value = `${MAX_SPEED}`;
      } else {
        setLaunchVelocity(parseFloat(val));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("In Canvas.js | function changeVelocityWithTextBox")
        console.error(error.message)
      }
    }
  }
  
  function changeAngleWithTextBox(e: React.ChangeEvent<HTMLInputElement>) {
    if (!angleInputRef || !angleInputRef.current) {
      return;
    }
    
    const val = e.target.value;
    // requires some defensive programming
    try {
      if (val === "") {
        setElevationAngle(0);
      }
      // some defensive programming
      if (isNaN(parseFloat(val))) {
        return;
      } else if (parseFloat(val) < 0) {
        setElevationAngle(0)
        angleInputRef.current.value = "0";
      } else if (parseFloat(val) > 90) {
        setElevationAngle(90);
        angleInputRef.current.value = "90";
      } else {
        setElevationAngle(parseFloat(val))
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("In Canvas.js | function changeAngleWithTextBox")
        console.error(error.message)
      }
      return;
    }
  }

  function changeHeightWithTextBox(e: React.ChangeEvent<HTMLInputElement>) {
    if (!heightInputRef || !heightInputRef.current) {
      return;
    }
    const val = e.target.value;
    // requires some defensive programming
    try {
      if (val === "") {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR]);
      }
      // some defensive programming
      if (isNaN(parseFloat(val))) {
        return;
      }  
      const conversionRate = calculateConversionRate(canvas, USER_ANCHOR_PONT, MAX_HORIZONTAL_RANGE);
      const anchor_point_y = GROUND_LEVEL_SCALAR - ((parseFloat(val) * conversionRate)/ canvas.height);
      const maxMetreHeight = Math.round(((GROUND_LEVEL_SCALAR - 0.1) * canvas.height) / conversionRate / 10) * 10; 
      if (parseFloat(val) < 0) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR])
        heightInputRef.current.value = "0";
      } else if (anchor_point_y < 0.1) {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, 0.1])
        heightInputRef.current.value = `${maxMetreHeight}`;
      } else {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, anchor_point_y])
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("In Canvas.js | function changeAngleWithTextBox")
        console.error(error.message)
      }
      return;
    }
  }

  return (
    <div id="inputPanel">
      <div id="inputPanel_title">Input Panel</div>

      <div id="heightInput" className="singleInputContainer">
        <span className="inputTitle">Height:</span>
        <input 
          maxLength={4}
          onChange={(e) => changeHeightWithTextBox(e)}
          placeholder="0"
          ref={heightInputRef}
          type="text"
        />
        <span className="unit">m</span>
      </div>
      <div className="flexBreak"/>
      <div id="velocityInput" className="singleInputContainer">
        <span className="inputTitle">Velocity:</span>
        <input 
          maxLength={8}
          onChange={(e) => changeVelocityWithTextBox(e)}
          placeholder="0"
          ref={velocityInputRef}
          type="text"
        />
        <span className="unit">m/s</span>
      </div>
      <div className="flexBreak"/>
      <div id="angleInput" className="singleInputContainer">
        <span className="inputTitle">Angle:</span>
        <input 
          maxLength={6}
          onChange={(e) => {changeAngleWithTextBox(e)}} 
          placeholder="0"
          ref={angleInputRef}
          style={{bottom: "95px"}}
          type="text" 
        />
        <span className="unit">degrees</span>
      </div>
    </div>
  )
  
}