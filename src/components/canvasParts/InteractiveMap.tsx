import { RefObject, useEffect, useRef } from "react"

import "./CSS/InteractiveMap.css"
import { fix_dpi } from "../fixDPI";
import { isLandscape } from "../../processingFunctions/drawingFunctions";
import { CANVAS_WIDTH } from "../../globalConstants/canvasDimensions";
import { CanvasPositionAndSizes } from "../../OOP/CanvasPositionAndSizes";
interface InteractiveMapProps {
  MAX_RANGE: number;
  pivotCoords: number[];
  targetRange: number;
  gameStateRef: RefObject<GameState>
  postionAndSizesInterface: RefObject<CanvasPositionAndSizes>
  USER_ANCHOR_POINT: number[]
  setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>

  
}
export default function InteractiveMap({MAX_RANGE, pivotCoords, targetRange, gameStateRef, postionAndSizesInterface, USER_ANCHOR_POINT, setStateChangeTrigger}: InteractiveMapProps) {
  const INTERACTIVE_MAP_WIDTH = 200;
  const INTERACTIVE_MAP_HEIGHT = 80

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const xConversionRate =  postionAndSizesInterface.current.calculateConversionRateXDirection(USER_ANCHOR_POINT);
  // scale = l / L ==> multiplying by scale converts real world pixel distance into interactive map pixel distance
  const scale = (INTERACTIVE_MAP_WIDTH / (CANVAS_WIDTH + (MAX_RANGE * xConversionRate)))
  const spotsYCoord = (INTERACTIVE_MAP_HEIGHT / 2) * window.devicePixelRatio;

  const piv_x_real = pivotCoords[0] / window.devicePixelRatio;
  const piv_x_map = (piv_x_real * scale);

  const target_x_map = piv_x_map + (targetRange * xConversionRate * scale);


  // information to get the highlighting rectangle
  // const rightMostScalar = gameStateRef.current[3];

  // const rightSideContainer = rightMostScalar * parentCanvasRef.current.width;
  // const parentDivContainerWidth = (parentCanvasRef.current.parentElement as HTMLDivElement).clientWidth;
  // const leftSideContainer = rightSideContainer - parentDivContainerWidth * window.devicePixelRatio;

  const radius = 5 * window.devicePixelRatio;
  const canvasLeftBorder = gameStateRef.current[3];
  const canvasRightBorder = canvasLeftBorder + CANVAS_WIDTH;
  const highlighter_left_side = canvasLeftBorder * scale ;
  const highlighter_right_side = canvasRightBorder * scale ;

  // const highlighter_left_side = (leftSideContainer * scale) * window.devicePixelRatio;

  const highlighter_width = (highlighter_right_side - highlighter_left_side) * window.devicePixelRatio;
  const highlighter_height = INTERACTIVE_MAP_HEIGHT * window.devicePixelRatio;;
  const highlighter_x = highlighter_left_side * window.devicePixelRatio;;
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
        ctx.arc(piv_x_map * window.devicePixelRatio, spotsYCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.stroke()
        ctx.fill();

        ctx.beginPath();
        ctx.arc(target_x_map * window.devicePixelRatio, spotsYCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.stroke()
        ctx.fill(); 

        // ctx.beginPath();
        // ctx.arc(enemyX, spotsYCoord, radius, 0, 2 * Math.PI);
        // ctx.strokeStyle = "red";
        // ctx.fillStyle = "red";
        // ctx.stroke()
        // ctx.fill(); 
      }
    }
  })


  ///////////////////////////////////////////////////////////////////////////////////

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    clickedOn.current = true;
    clicked_x.current = e.pageX;

    updateGameStateMouseDown()
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!clickedOn.current) return;
    const new_x = e.pageX;

    const displacement_x = new_x - clicked_x.current;

    const translatedDisplacementX = displacement_x / scale;
    clicked_x.current = new_x;
    gameStateRef.current[3] += translatedDisplacementX;
    setStateChangeTrigger(x => x ^ 1)


  }

  function mouseUp() {
    clickedOn.current = false;
  }
  
  window.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    mouseUp();
  })

  function updateGameStateMouseDown() {
    var newVal = ((clicked_x.current) / scale);
    if (newVal > MAX_RANGE * 5) {
      newVal = MAX_RANGE * 5;
    }
    // if (newVal < initialScrollScalar.current) {
    //   newVal = initialScrollScalar.current;
    // } else if (newVal > 1) {
    //   newVal = 1;
    // }
    gameStateRef.current[3] = newVal;
    setStateChangeTrigger(x => x ^ 1)
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