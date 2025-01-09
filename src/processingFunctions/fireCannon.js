import { calculateConversionRate } from "./calculateConversionRate";
import { drawCircle } from "./drawingFunctions";
import { findPivotGlobalCoords } from "./findPivotGlobalCoords";

// needs canvas, user anchor point, launch vel, elevation angle, ground level scalar   
export function fireCannon(
    ctx,
    canvas, 
    USER_ANCHOR_POINT, 
    launchVelocity, 
    elevationAngle, 
    GROUND_LEVEL_SCALAR, 
    MAX_HORIZONTAL_RANGE
) {
    var requNum;
    try {
      if (canvas) {
        const [initial_x, initial_y] 
          = findPivotGlobalCoords(canvas, USER_ANCHOR_POINT)

        const conversionRate = calculateConversionRate(canvas, USER_ANCHOR_POINT, MAX_HORIZONTAL_RANGE);

        const accel = 9.8 * conversionRate;          // TODO: acceleration could become a state variable if we move to different planets
        const initial_v =  launchVelocity * conversionRate;
        var x = initial_x;
        var y = initial_y;
        var currTime = 0;
        const angle_rad = elevationAngle * (Math.PI / 180)

        function trackProjectile() {          
          if (y <= (GROUND_LEVEL_SCALAR * canvas.height))
          {    
            x = initial_x + initial_v * Math.cos(angle_rad) * currTime;                 
            y = initial_y
              - (initial_v * Math.sin(angle_rad) * currTime) 
              + (1/2 * accel * currTime ** 2);             

            currTime += 0.05; // something to experiment with
      
            drawCircle(ctx, x, y, 5, "blue", "black");
          }
          

          requNum = requestAnimationFrame(trackProjectile);
        }
        trackProjectile(); 
      }

    } catch (e) {
      console.error(e.message);
    }
  }
