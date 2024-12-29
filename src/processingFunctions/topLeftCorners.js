export function topLeftConerVelocityBar(cannonPosition, canvas) {
  const pos_x = cannonPosition[0];
  const pos_y = cannonPosition[1] + canvas.height * 0.15;

  return [pos_x, pos_y]
}