import { RefObject, useEffect, useRef } from "react"

import "./CSS/InteractiveMap.css"
import { fix_dpi } from "../fixDPI";
interface InteractiveMapProps {
  canvasWidth: number;
  containerWidth: number;
  pivotCoords: number[];
  targetCoords: number[];
  gameStateRef: RefObject<GameState>

  
}
export default function InteractiveMap({canvasWidth, containerWidth, pivotCoords, targetCoords, gameStateRef}: InteractiveMapProps) {
  const INTERACTIVE_MAP_WIDTH = 400;
  const INTERACTIVE_MAP_HEIGHT = 100
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const yCoord = INTERACTIVE_MAP_HEIGHT / 2;
  const piv_x_real = pivotCoords[0];
  const piv_x_map = (piv_x_real / canvasWidth) * INTERACTIVE_MAP_WIDTH * window.devicePixelRatio;

  const target_x_real = targetCoords[0];
  const target_x_map = (target_x_real / canvasWidth) * INTERACTIVE_MAP_WIDTH * window.devicePixelRatio;

  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) fix_dpi(canvas);
  }, []);

  useEffect(() => {
    console.log("canvas width is given as ", canvasWidth);
    console.log("container width is given as ", containerWidth);
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d");
      const rightMostScalar = gameStateRef.current[3];
      if (ctx) {

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const rightSideContainer = rightMostScalar * canvasWidth ;
        const leftSideContainer = rightSideContainer - containerWidth * window.devicePixelRatio;

        console.log("rightmost scalar = ", rightMostScalar)
        console.log("target coords are ", targetCoords);
        console.log("cannon coords = ", pivotCoords)
        const scale = INTERACTIVE_MAP_WIDTH / canvasWidth;
        console.log("left side conatiner is given as ", leftSideContainer);
        console.log("right side container is given as ", rightSideContainer);

        const highlighter_right_side = (rightSideContainer * scale) * window.devicePixelRatio;
        const highlighter_left_side = (leftSideContainer * scale) * window.devicePixelRatio;

        const width = (highlighter_right_side - highlighter_left_side);
        const height = INTERACTIVE_MAP_HEIGHT;
        const x = highlighter_left_side;
        const y = 0;

        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "yellow"
        ctx.lineWidth = 4;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);

        ctx.beginPath();
        ctx.arc(piv_x_map, yCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "green";
        ctx.fillStyle = "green";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(target_x_map, yCoord, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.fillStyle = "red";
        ctx.fill();

        
      } 
    }
  })
  
  return (
    <canvas style={{width: INTERACTIVE_MAP_WIDTH, height: INTERACTIVE_MAP_HEIGHT}}ref={canvasRef} id="interactiveMapCanvas"/>
  )
  
}