import { useEffect, useRef } from "react"
import "./CSS/Canvas.css"

import { drawCannon, rotateCannon} from "./drawingFunctions"
import cannonImg from "../images/Cannon_v1.png"


export default function Canvas() {

  const canvasRef = useRef(null);
  const cannonRef = useRef(null);
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
    drawCannon(ctx, canvas, cannonImage);

    ctx.save();

    rotateCannon(ctx, canvas, 40, cannonImage);

    // console.log(canvas.width, canvas.height);



  }, [canvasRef]);
  
  return (
    <>
    <canvas ref={canvasRef} style={{height: 1.3 * window.innerHeight}} id="canvas">
      <img
        src={cannonImg}
        alt="barrel"
        ref={cannonRef}
      />
    </canvas>

  </>

  )
}