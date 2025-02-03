import { RefObject } from "react"
import { CanvasPositionAndSizes } from "../../OOP/CanvasPositionAndSizes"
import "./CSS/InputPanel.css"
import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar"
import { UserGameAction } from "../../states/userGameActions/UserGameAction"
import { InputPanelVelocity } from "../../states/userGameActions/InputPanelVelocity"
import { InputPanelAngle } from "../../states/userGameActions/InputPanelAngle"
import { InputPanelHeight } from "../../states/userGameActions/InputPanelHeight"
import { Disabled } from "../../types/DisableInput"

interface InputPanelProps {
  setElevationAngle: Function 
  setLaunchVelocity: Function
  setUserAnchorPoint: Function
  MAX_SPEED: number
  angleInputRef: React.RefObject<HTMLInputElement | null>
  velocityInputRef: React.RefObject<HTMLInputElement | null>
  heightInputRef: React.RefObject<HTMLInputElement | null>
  canvas: HTMLCanvasElement
  positioningAndSizesInterface: CanvasPositionAndSizes
  USER_ANCHOR_PONT: number[]
  MAX_HORIZONTAL_RANGE: number
  CANNON_HORIZONTAL_SCALAR: number
  GROUND_LEVEL_SCALAR: number
  userStateRef: RefObject<UserGameAction>
  setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>
  disableInput: Disabled
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
  positioningAndSizesInterface,
  USER_ANCHOR_PONT,
  MAX_HORIZONTAL_RANGE,
  CANNON_HORIZONTAL_SCALAR,
  userStateRef,
  setStateChangeTrigger,
  disableInput
}: InputPanelProps) {

  function changeVelocityWithTextBox(e: React.ChangeEvent<HTMLInputElement>) {
    if (!velocityInputRef || !velocityInputRef.current) {
      return;
    }
    userStateRef.current = new InputPanelVelocity();
    setStateChangeTrigger(x => x ^ 1)
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
    userStateRef.current = new InputPanelAngle();
    setStateChangeTrigger(x => x ^ 1)

    const val = e.target.value;
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
    userStateRef.current = new InputPanelHeight();
    setStateChangeTrigger(x => x ^ 1)

    const val = e.target.value;
    try {
      if (val === "") {
        setUserAnchorPoint([CANNON_HORIZONTAL_SCALAR, GROUND_LEVEL_SCALAR]);
      }
      // some defensive programming
      if (isNaN(parseFloat(val))) {
        return;
      }
      const conversionRate = positioningAndSizesInterface.calculateConversionRate(USER_ANCHOR_PONT[0]);
      
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
      
      {/* angle input */}
      <div id="angleInput" className="singleInputContainer">
        <span className="inputTitle">Angle:</span>
        <input 
          maxLength={6}
          onChange={(e) => {changeAngleWithTextBox(e)}} 
          placeholder={disableInput.angle === false ? "0" : `${disableInput.angle}`}
          disabled={disableInput.angle !== false}
          ref={angleInputRef}
          style={{bottom: "95px"}}
          type="text" 
        />
        <span className="unit">degrees</span>
      </div>
      <div className="flexBreak"/>
      
      {/* velocity input */}
      <div id="velocityInput" className="singleInputContainer">
        <span className="inputTitle">Velocity:</span>
        <input 
          maxLength={8}
          onChange={(e) => changeVelocityWithTextBox(e)}
          placeholder={disableInput.velocity === false ? "0" : `${disableInput.velocity}`}
          disabled={disableInput.velocity !== false}
          ref={velocityInputRef}
          type="text"
        />
        <span className="unit">m/s</span>
      </div>
      <div className="flexBreak"/>

      {/* height input */}
      <div id="heightInput" className="singleInputContainer">
        <span className="inputTitle">Height:</span>
        <input 
          maxLength={4}
          onChange={(e) => changeHeightWithTextBox(e)}
          placeholder={disableInput.height === false ? "0" : `${disableInput.height}`}
          disabled={disableInput.height !== false}
          ref={heightInputRef}
          type="text"
        />
        <span className="unit">m</span>
      </div>
    </div>
  )
  
}