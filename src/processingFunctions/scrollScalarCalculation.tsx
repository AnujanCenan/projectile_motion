import { RefObject } from "react";

export function calculateScrollScalar(canvas: HTMLCanvasElement) {
  const canvasContainer = canvas.parentNode as HTMLDivElement;
  return (canvasContainer.scrollLeft + canvasContainer.clientWidth) / canvasContainer.scrollWidth
}