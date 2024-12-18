import { useEffect, useRef, useState } from "react"
import "./CSS/Canvas.css"

import { drawDefaultCannon, drawRotatedCannon, getCannonInfo, getHolsterInfo } from "../processingFunctions/drawingFunctions"
// import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"
import { clickedOnCannon } from "../processingFunctions/readingPixels"
import { calculateAngularDisplacement } from "../processingFunctions/calculateAngularDisplacement"

export default function Canvas() {

  const ctxRef = useRef(null);

  const canvasRef = useRef(null);
  const cannonRef = useRef(null);
  const holsterRef = useRef(null);


  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2");
  const holsterInfo = getHolsterInfo("holster_v1");
  const [elevationAngle, setElevationAngle] = useState(0);

  // User state variables
  const cannonClick = useRef(false);
  const click_x = useRef(0);
  const click_y = useRef(0);
  const clickedBehindPivot = useRef(1);

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
    }

  }, []);


  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    drawDefaultCannon(ctxRef.current, canvasRef.current, cannonRef.current, holsterRef.current, cannonInfo, holsterInfo)

    // drawRotatedCannon(ctxRef.current, canvasRef.current, -90, cannonRef.current, holsterRef.current, cannonInfo)
  }, [ctxRef, cannonInfo, holsterInfo])

  useEffect(() => {
    console.log("In the useEffect for drawing the cannon")

    ctxRef.current = canvasRef.current.getContext('2d');
    console.log(elevationAngle)
    // TODO: clear the appropriate portion of the canvas as opposed to the whole thing
    if (ctxRef && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    drawRotatedCannon(ctxRef.current, canvasRef.current, 
      -elevationAngle, 
      cannonRef.current, holsterRef.current, 
      cannonInfo, holsterInfo
    );

    // drawRotatedCannon(ctxRef.current, canvasRef.current, -90, cannonRef.current, holsterRef.current, cannonInfo)

  })

  //////////////////////// Changing Angles Mouse Events ////////////////////////

  async function mouseDown(e) {
    // uses e.PageX and e.PageY not e.clientX and clientY
    console.log("Heard mouse down")
    console.log(`Elevation angle = ${elevationAngle}`);
    
    cannonClick.current  = await clickedOnCannon(
      ctxRef.current, canvasRef.current, 
      e.pageX, e.pageY,
      cannonInfo, 
      elevationAngle,
      clickedBehindPivot
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
        canvasRef.current.width, canvasRef.current.height, 
        elevationAngle);

      click_x.current = e.pageX;
      click_y.current = e.pageY;
      if (elevationAngle + angularDisplacement > 90) {
        setElevationAngle(90)
      } else if (elevationAngle + angularDisplacement < 0) {
        setElevationAngle(0)
      } else {
        setElevationAngle(elevationAngle + angularDisplacement);
      }
      console.log(elevationAngle)
    }
  }

  function mouseUp(e){
      cannonClick.current = false;
  }

  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <canvas ref={canvasRef} 
        style={{height: 1.3 * window.innerHeight}} id="canvas" 
        // onClick={(e) => adjustAngle(e)}
        onMouseDown={(e) => mouseDown(e)}
        onMouseUp={(e) => mouseUp(e)}
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
      </canvas>
    </>
    
  )
}