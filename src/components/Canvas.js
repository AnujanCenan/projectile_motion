import { useEffect, useRef } from "react"
import "./CSS/Canvas.css"

import { drawDefaultCannon, drawRotatedCannon } from "./drawingFunctions"
import cannonImg from "../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"



export default function Canvas() {

  const canvasRef = useRef(null);
  const cannonRef = useRef(null);
  const holsterRef = useRef(null);
  // state variables for cannon position

  

  useEffect(() => {
    let dpi = window.devicePixelRatio;
    const canvas = canvasRef.current

    function fix_dpi() {
      //get CSS height
      //the + prefix casts it to an integer
      //the slice method gets rid of "px"
      let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
      //get CSS width
      let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
      //scale the canvas
      canvas.setAttribute('height', style_height * dpi);
      canvas.setAttribute('width', style_width * dpi);
    }

    if (canvas) {
      fix_dpi();
    }

    const ctx = canvas.getContext('2d');

    const cannonImage = cannonRef.current;
    const holsterImage = holsterRef.current;

    // drawHolster(ctx, canvas, holsterImage);
    
    // 'global' cannon position decided by the the draw cannon function
    // const TOP_LEFT_CORNER = drawCannon(ctx, canvas, cannonImage);
    drawDefaultCannon(ctx, canvas, cannonImage, holsterImage);
    drawRotatedCannon(ctx, canvas,  -45, cannonImage, holsterImage);




  }, [canvasRef]);
  
  return (
    <>
    <canvas ref={canvasRef} style={{height: 1.3 * window.innerHeight}} id="canvas">
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