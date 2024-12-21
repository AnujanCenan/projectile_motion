export function findPivotGlobalCoords(canvas, angle, cannonInfo) {
  const pivX = canvas.width * cannonInfo.scalar_top_corner_x + 
    cannonInfo.pivot_x * cannonInfo.growth_factor

  const pivY = canvas.height * cannonInfo.scalar_top_corner_y + 
    cannonInfo.pivot_y * cannonInfo.growth_factor
  
  // const magnitude = cannonInfo.growth_factor * (cannonInfo.pixel_width - cannonInfo.pivot_x);

  // const angle_rad = angle * (Math.PI / 180)
  // const vector = [magnitude * Math.cos(angle_rad), -magnitude * Math.sin(angle_rad)];

  // return [pivX + vector[0], pivY + vector[1]]

  return [pivX, pivY]
}