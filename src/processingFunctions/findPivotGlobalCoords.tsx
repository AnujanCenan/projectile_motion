export function findPivotGlobalCoords(canvas: any, USER_ANCHOR_POINT: number[]) {
  const pivX = window.innerWidth * USER_ANCHOR_POINT[0] * window.devicePixelRatio;

  const pivY = canvas.height * USER_ANCHOR_POINT[1]

  return [pivX, pivY]
}