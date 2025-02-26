export function calculateAngularDisplacement(
  mouse_x: number, 
  mouse_y: number, 
  init_mouse_x: number, 
  init_mouse_y: number, 
  clickedBehindPivot: number,
  global_pivot_pos: number[],
  angle: number,
) {
  
  const [global_piv_x, global_piv_y] = global_pivot_pos;

  const a = distanceFormula(global_piv_x, global_piv_y, mouse_x, mouse_y);
  const b = distanceFormula(global_piv_x, global_piv_y, init_mouse_x, init_mouse_y);

  const c = distanceFormula(mouse_x, mouse_y, init_mouse_x, init_mouse_y);

  // c^2 = a^2 + b^2 - 2 a b cos(theta)
  const angularDisplacement = (180 / Math.PI) * Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
  // figure out sign of the anuglar displacement based on where the final mouse pos is relative to the initial mouse pis
  var sign = 0;
  // dragging up and to the left
  if (mouse_y < init_mouse_y && mouse_x <= init_mouse_x) {
    sign = 1;
  // dragging down and to the right
  } else if (mouse_y > init_mouse_y && mouse_x >= init_mouse_x) {
    sign = -1;
  // dragging up and right  
  } else if (mouse_y < init_mouse_y && mouse_x >= init_mouse_x) {
    if (dragAngle(mouse_x, mouse_y, init_mouse_x, init_mouse_y) > angle) {
      sign = 1;
    } else {
      sign = -1;
    }
  // dragging down and left
  } else if (mouse_y > init_mouse_y && mouse_x <= init_mouse_x) {
    if (180 - dragAngle(mouse_x, mouse_y, init_mouse_x, init_mouse_y) < angle) {
      sign = 1;
    } else {
      sign = -1;
    }
  } else if (mouse_x < init_mouse_x) {
    sign = 1;
  } else if (mouse_x > init_mouse_x) {
    sign = -1;
  } else if (mouse_y < init_mouse_y) {
    sign = 1;
  } else if (mouse_y > init_mouse_y) {
    sign = -1;
  } else {
    sign = 0;
  }
  // if iniital click is "behind the pivot" then flip sign of angular displacement because the relation behind 
  // mouse drag direction and cannon rotation direction is reversed

  return clickedBehindPivot * sign * angularDisplacement;
}

function distanceFormula(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

// calculates the angle between the vector formed by a mouse drag, and the basis vector <1, 0>
function dragAngle(mouse_x: number, mouse_y: number, init_mouse_x: number, init_mouse_y: number) {
  const horizontalVector = [1, 0];
  const dragVector = [mouse_x - init_mouse_x, mouse_y - init_mouse_y];
  // a . b = |a| |b| cos(alpha)
  // note that horizontalVector[1] == 0
  return (180 / Math.PI) * Math.acos((dragVector[0] * horizontalVector[0]) 
    / distanceFormula(mouse_x, mouse_y, init_mouse_x, init_mouse_y));

}