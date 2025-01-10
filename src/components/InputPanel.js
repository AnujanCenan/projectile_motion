import { calculateConversionRate } from "../processingFunctions/calculateConversionRate";
import "./CSS/InputPanel.css"

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
  MAX_HORIZONTAL_RANGE

}) {

  function changeVelocityWithTextBox(e) {
    const val = e.target.value;
    try {
      if (val === "") {
        setLaunchVelocity(0);
      }
      if (isNaN(parseFloat(val))) {
        return;
      } else if (parseFloat(val) < 0) {
        setLaunchVelocity(0);
        velocityInputRef.current.value = 0;
      } else if (parseFloat(val) > MAX_SPEED) {
        setLaunchVelocity(MAX_SPEED);
        velocityInputRef.current.value = MAX_SPEED;
      } else {
        setLaunchVelocity(parseFloat(val));
      }
    } catch (error) {
      console.error("In Canvas.js | function changeVelocityWithTextBox")
      console.error(error.message)
    }
  }
  
  function changeAngleWithTextBox(e) {
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
        angleInputRef.current.value = 0;
      } else if (parseFloat(val) > 90) {
        setElevationAngle(90);
        angleInputRef.current.value = 90;
      } else {
        setElevationAngle(parseFloat(val))
      }
    } catch (error) {
      console.error("In Canvas.js | function changeAngleWithTextBox")
      console.error(error.message)
      return;
    }
  }

  function changeHeightWithTextBox(e) {
    const val = e.target.value;
    // requires some defensive programming
    try {
      if (val === "") {
        setUserAnchorPoint([0.2, 0.8]);
      }
      // some defensive programming
      if (isNaN(parseFloat(val))) {
        return;
      }  
      const conversionRate = calculateConversionRate(canvas, USER_ANCHOR_PONT, MAX_HORIZONTAL_RANGE);
      const anchor_point_y = 0.8 - ((val * conversionRate)/ canvas.height);
      const maxMetreHeight = Math.round(((0.8 - 0.1) * canvas.height) / conversionRate / 10) * 10; 
      if (parseFloat(val) < 0) {
        setUserAnchorPoint([0.2, 0.8])
        heightInputRef.current.value = 0;
      } else if (anchor_point_y < 0.1) {
        setUserAnchorPoint([0.2, 0.1])
        heightInputRef.current.value = maxMetreHeight;
      } else {
        setUserAnchorPoint([0.2, anchor_point_y])
      }
    } catch (error) {
      console.error("In Canvas.js | function changeAngleWithTextBox")
      console.error(error.message)
      return;
    }
  }

  return (
    <>
      <div id="inputPanel">
        <div id="heightInput">
          Height: 
          <input 
            type="text"
            ref={heightInputRef}
            onChange={(e) => changeHeightWithTextBox(e)}
            maxLength={4}
          />
          m
        </div>
        <div id="velocityInput">
          Velocity:
          <input 
            type="text"
            ref={velocityInputRef}
            onChange={(e) => changeVelocityWithTextBox(e)}
            maxLength={8}
          />
          m/s
        </div>
        <div id="angleInput">
          Angle: 
          <input 
            type="text" 
            ref={angleInputRef}
            onChange={(e) => {changeAngleWithTextBox(e)}} 
            style={{bottom: "95px"}}
            maxLength={6}
          />
          degrees
        </div>
      </div>
    </>
  )
  
}