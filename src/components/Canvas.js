import { useEffect, useRef } from "react"
import "./CSS/Canvas.css"

import { drawDefaultCannon, drawRotatedCannon, getCannonInfo } from "./drawingFunctions"
import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"

export default function Canvas() {

  const ctx = useRef(null);

  const canvasRef = useRef(null);
  const cannonRef = useRef(null);
  const holsterRef = useRef(null);


  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2");

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
  
    ctx.current = canvas.getContext('2d');
    drawDefaultCannon(ctx.current, canvasRef.current, cannonRef.current, holsterRef.current, cannonInfo);
  }, [canvasRef, cannonRef, holsterRef, cannonInfo])

  //////////////////////// Changing Angles Mouse Events ////////////////////////
  useEffect(() => {
    canvasRef.current.addEventListener("mousedown", function (e) {
      // if mouse down is on the cannon
      //    activate the ting  
    });
  })

  useEffect(() => {
    canvasRef.current.addEventListener("drag", function (e) {
      // if activated
      //    listen for the mouse position and calculate angle displacement from 
      //    starting angle and finsishing angle
    })
  })

  useEffect(() => {
    canvasRef.current.addEventListener("mouseup", function (e) {
      // deactivate the ting
    })
  })

  //////////////////////////////////////////////////////////////////////////////

  
  return (
    <>
      <canvas ref={canvasRef} 
        style={{height: 1.3 * window.innerHeight}} id="canvas" 
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