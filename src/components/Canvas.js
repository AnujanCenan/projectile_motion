import { useRef } from "react"
import "./CSS/Canvas.css"

import { drawDefaultCannon, drawHolster, drawRotatedCannon, getCannonInfo } from "./drawingFunctions"
import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"


// function InitialiseCanvas(canvasRef, cannonInfo, cannonRef, holsterRef) {

//     let dpi = window.devicePixelRatio;
//     const canvas = canvasRef.current

//     function fix_dpi() {
//       let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//       let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//       canvas.setAttribute('height', style_height * dpi);
//       canvas.setAttribute('width', style_width * dpi);
//     }
//     if (canvas) {
//       fix_dpi();
//     }

//     const ctx = canvas.getContext('2d');

//     const cannonImage = cannonRef.current;
//     const holsterImage = holsterRef.current;

//     drawDefaultCannon(ctx, canvas, cannonImage, holsterImage,cannonInfo);

//     drawRotatedCannon(
//       ctx, canvas, 0, cannonImage, holsterImage, cannonInfo);
// }



export default function Canvas() {

  const ctx = useRef(null);

  const canvasRef = useRef(null);
  const cannonRef = useRef(null);
  const holsterRef = useRef(null);


  // Cannon State Variables
  const cannonInfo = getCannonInfo("v2");


  function InitialiseCanvas(canvasRef) {
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
  }

  
  return (
    <>
    <canvas ref={canvasRef} 
    
      onLoad={() => {
        InitialiseCanvas(canvasRef);
        drawHolster(ctx.current, canvasRef.current, holsterRef.current);
        drawDefaultCannon(ctx.current, canvasRef.current, cannonRef.current, cannonInfo);
        drawRotatedCannon(ctx.current, canvasRef.current, -20, cannonRef.current, cannonInfo)
      }} 
      style={{height: 1.3 * window.innerHeight}} id="canvas" 
    >

      <img 
        src={holsterImg}
        alt="holster"
        ref={holsterRef}
      />
      <img
        src={cannonImg}
        alt="barrel"
        ref={cannonRef}
      />
    </canvas>

  </>

  )
}