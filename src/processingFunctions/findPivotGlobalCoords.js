export function findPivotGlobalCoords(canvas, USER_ANCHOR_POINT) {
  const pivX = canvas.width * USER_ANCHOR_POINT[0]

  const pivY = canvas.height * USER_ANCHOR_POINT[1]

  return [pivX, pivY]
}