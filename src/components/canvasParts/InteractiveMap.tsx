import { RefObject, useEffect, useRef } from "react"

import "./CSS/InteractiveMap.css"
import { fix_dpi } from "../fixDPI";
interface InteractiveMapProps {
  parentCanvasRef: RefObject<HTMLCanvasElement>;
  pivotCoords: number[];
  targetCoords: number[];
  gameStateRef: RefObject<GameState>

  
}
export default function InteractiveMap({parentCanvasRef, pivotCoords, targetCoords, gameStateRef}: InteractiveMapProps) {
  
  const INTERACTIVE_MAP_WIDTH = 400;
  const INTERACTIVE_MAP_HEIGHT = 100
  const absoluteLeftPosition = 0;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialScrollScalar = useRef<number>(gameStateRef.current[3])
  // scale = l / L ==> multiplying by scale converts real world pixel distance into interactive map pixel distance
  const scale = INTERACTIVE_MAP_WIDTH / parentCanvasRef.current.width;
  
  const yCoord = (INTERACTIVE_MAP_HEIGHT / 2) * window.devicePixelRatio;
  const piv_x_real = pivotCoords[0];
  const piv_x_map = (piv_x_real * scale) * window.devicePixelRatio;

  const target_x_real = targetCoords[0];
  const target_x_map = (target_x_real * scale) * window.devicePixelRatio;

  const radius = 10 * window.devicePixelRatio;

  // information to get the highlighting rectangle
  const rightMostScalar = gameStateRef.current[3];

  const rightSideContainer = rightMostScalar * parentCanvasRef.current.width;
  const parentDivContainerWidth = (parentCanvasRef.current.parentElement as HTMLDivElement).clientWidth;
  const leftSideContainer = rightSideContainer - parentDivContainerWidth * window.devicePixelRatio;

  const highlighter_right_side = (rightSideContainer * scale) * window.devicePixelRatio;
  const highlighter_left_side = (leftSideContainer * scale) * window.devicePixelRatio;

  const highlighter_width = (highlighter_right_side - highlighter_left_side);
  const highlighter_height = INTERACTIVE_MAP_HEIGHT * window.devicePixelRatio;
  const highlighter_x = highlighter_left_side;
  const highlighter_y = 0;



  const clickedOn = useRef(false);

  const clicked_x = useRef(0);


  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) fix_dpi(canvas);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) {

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "yellow"
        ctx.lineWidth = 4;
        ctx.fillRect(highlighter_x, highlighter_y, highlighter_width, highlighter_height);
        ctx.strokeRect(highlighter_x, highlighter_y, highlighter_width, highlighter_height);

        ctx.beginPath();
        ctx.arc(piv_x_map, yCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.stroke()
        ctx.fill();

        ctx.beginPath();
        ctx.arc(target_x_map, yCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.stroke()
        ctx.fill(); 
      }
    }
  })


  ///////////////////////////////////////////////////////////////////////////////////

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

    clickedOn.current = true;
    clicked_x.current = e.pageX;

    const canvasDivContainer = parentCanvasRef.current.parentElement as HTMLDivElement;
    const newScrollPos = (clicked_x.current - absoluteLeftPosition) / scale;
    

    canvasDivContainer.scrollTo({
      left: newScrollPos - highlighter_width / (2 * scale)
    })

    updateGameStateMouseDown()
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!clickedOn.current) return;
    const new_x = e.pageX;

    const displacement_x = new_x - clicked_x.current;
    const translatedDisplacementX = displacement_x / scale;
    clicked_x.current = new_x;

    const canvasDivContainer = parentCanvasRef.current.parentElement as HTMLDivElement;


    canvasDivContainer.scrollBy({
      left: translatedDisplacementX
    })

  }

  function mouseUp() {
    clickedOn.current = false;
    updateGameStateMouseDown();
  }
  
  window.addEventListener("mouseup", () => {
    mouseUp();
  })

  function updateGameStateMouseDown() {
    var newVal = (clicked_x.current + (highlighter_width/2)) / INTERACTIVE_MAP_WIDTH;
    if (newVal < initialScrollScalar.current) {
      newVal = initialScrollScalar.current;
    } else if (newVal > 1) {
      newVal = 1;
    }
    gameStateRef.current[3] = newVal;
  }
  ///////////////////////////////////////////////////////////////////////////////////
  
  return (
    <canvas 
      id="interactiveMapCanvas"
      onMouseDown={(e) => mouseDown(e)}
      onMouseMove={(e) => mouseMove(e)}
      onMouseUp={() => mouseUp()}
      ref={canvasRef} 
      style={{width: INTERACTIVE_MAP_WIDTH, height: INTERACTIVE_MAP_HEIGHT}}
    />
  )
  
}