import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes.tsx";
import { drawCircle } from "./drawingFunctions.tsx";
import { calculateScrollScalar } from "./scrollScalarCalculation.tsx";

// needs canvas, user anchor point, launch vel, elevation angle, ground level scalar   
export function fireCannon(
    positionAndSizesInterface: CanvasPositionAndSizes,
    USER_ANCHOR_POINT: number[], 
    launchVelocity: number, 
    elevationAngle: number, 
    GROUND_LEVEL_SCALAR: number, 
    width: number,
    gameStateRef: RefObject<GameState>,
    userStateRef: RefObject<UserState>,
    setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>

) {

  userStateRef.current = "firing";
  setStateChangeTrigger(x => x ^ 1);
  console.log("Set user state to firing")
    const canvas = positionAndSizesInterface.getCanvas();
    const ctx = positionAndSizesInterface.getCtx();
    var reqNum: number;
    try {
      if (canvas) {
        const [initial_x, initial_y] 
          = positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT);

        const conversionRate = positionAndSizesInterface.calculateConversionRate(USER_ANCHOR_POINT);

        const accel = 9.8 * conversionRate;          // TODO: acceleration could become a state variable if we move to different planets
        const initial_v =  launchVelocity * conversionRate;
        var x = initial_x;
        var y = initial_y;
        var currTime = 0;
        const angle_rad = elevationAngle * (Math.PI / 180);


        function trackProjectile() {      
          x = initial_x + initial_v * Math.cos(angle_rad) * currTime;                 
          y = initial_y
            - (initial_v * Math.sin(angle_rad) * currTime) 
            + (1/2 * accel * currTime ** 2);            

          currTime += 0.04; // something to experiment with
          (canvas.parentNode as HTMLDivElement).scrollTo({
            top: 0,
            left: (x) / window.devicePixelRatio - width / 2,
            behavior: "instant"
          });

          gameStateRef.current[3] = calculateScrollScalar(canvas)
          
          if (ctx) {
            setStateChangeTrigger(x => x ^ 1);
            drawCircle(ctx, x, y, 5, "blue", "black");
            
          }
          if (initial_y
            - (initial_v * Math.sin(angle_rad) * currTime) 
            + (1/2 * accel * currTime ** 2)  <= GROUND_LEVEL_SCALAR * canvas.height) {
            reqNum = requestAnimationFrame(trackProjectile);
          } else {
            cancelAnimationFrame(reqNum);
            userStateRef.current = "idle";
            setStateChangeTrigger(x => x ^ 1)
          }
        }
        reqNum = requestAnimationFrame(trackProjectile);

      }

    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
