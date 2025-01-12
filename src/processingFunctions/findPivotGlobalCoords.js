export function findPivotGlobalCoords(canvas, USER_ANCHOR_POINT) {
  const pivX = window.innerWidth * USER_ANCHOR_POINT[0]

  const pivY = canvas.height * USER_ANCHOR_POINT[1]

  return [pivX, pivY]
}