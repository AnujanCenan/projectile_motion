import { useEffect, useRef } from "react"
import "./CSS/Canvas.css"

import { drawCannonPivot,  drawCannon, rotateCannon} from "./drawingFunctions"
import wheelImg from "../images/CannonWheel.png"
import barrelImg from "../images/CannonBarrel.png"


export default function Canvas() {

  const canvasRef = useRef(null);
  const wheelRef = useRef(null);
  const barrelRef = useRef(null);
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

    const barrelImage = barrelRef.current;
    drawCannon(ctx, canvas, barrelImage);

    const wheelImage = wheelRef.current;
    drawCannonPivot(ctx, canvas, wheelImage);

    ctx.save();

    rotateCannon(ctx, canvas, 10, barrelImage, wheelImage)
    // ctx.restore();



    
    
    
    // const [pivot_x, pivot_y] = drawCannon(ctx, canvas);
    // drawCannonPivot(ctx, canvas, pivot_x, pivot_y);



  }, [canvasRef]);
  
  return (
    <>
    <canvas ref={canvasRef} id="canvas">
      <img
        src={wheelImg}
        alt="wheel"
        ref={wheelRef}
        style={{border:"2px solid red"}}
      />
      <img
        src={barrelImg}
        alt="barrel"
        ref={barrelRef}
      />
    </canvas>

  </>

  )
}