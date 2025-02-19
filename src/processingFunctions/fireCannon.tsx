import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes.tsx";
import { drawCircle } from "./drawingFunctions.tsx";
import { calculateScrollScalar } from "./scrollScalarCalculation.tsx";
import { GROUND_LEVEL_SCALAR } from "../globalConstants/groundLevelScalar.tsx";
import { UserGameAction } from "../states/userGameActions/UserGameAction.tsx";
import { Firing } from "../states/userGameActions/Firing.tsx";
import { Idle } from "../states/userGameActions/Idle.tsx";

// needs canvas, user anchor point, launch vel, elevation angle, ground level scalar   
export function fireCannon(
    positionAndSizesInterface: CanvasPositionAndSizes,
    USER_ANCHOR_POINT: number[], 
    launchVelocity: number, 
    elevationAngle: number, 
    GROUND_LEVEL_SCALAR: number, 
    gameStateRef: RefObject<GameState>,
    userStateRef: RefObject<UserGameAction>,
    drawEnvironment: Function,
    setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>

) {

  userStateRef.current = new Firing();
  gameStateRef.current[3] = 0;

  const range_metres = range(
    gameStateRef, 
    positionAndSizesInterface.getCanvas(), 
    positionAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT)
  );

  const canvas = positionAndSizesInterface.getCanvas();
  const ctx = positionAndSizesInterface.getCtx();
  var reqNum: number;
  try {
    if (canvas) {
      const [initial_x, initial_y] 
        = positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT);

    const angle_rad = elevationAngle * (Math.PI / 180);


      const conversionRateX = positionAndSizesInterface.calculateConversionRateXDirection(USER_ANCHOR_POINT);
      const conversionRateY = positionAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT);

      const accel = 9.8 * conversionRateY;          // TODO: acceleration could become a state variable if we move to different planets
      const initial_v =  launchVelocity;

      const initial_v_x = initial_v * Math.cos(angle_rad);      // in real-world m/s
      const initial_v_y = initial_v * Math.sin(angle_rad);      // in real-world m/s

      const initial_v_x_px = initial_v_x * conversionRateX;
      const initial_v_y_px = initial_v_y * conversionRateY;

      var x = initial_x;
      var y = initial_y;
      var currTime = 0;

      function trackProjectile() {    
        // if (userStateRef.current === "idle")  return;
        const nextXDisplacement = initial_x + initial_v_x_px * currTime - x;
        x = initial_x + initial_v_x_px * currTime;                 
        y = initial_y
          - (initial_v_y_px * currTime) 
          + (1/2 * accel * currTime ** 2);            

        currTime += 0.04; // something to experiment with

        gameStateRef.current[3] += nextXDisplacement;
        const drawX = positionAndSizesInterface.getPivotX(USER_ANCHOR_POINT[0])
        if (ctx) {
          drawEnvironment()
          drawCircle(ctx, drawX, y, 5, "blue", "black");
          setStateChangeTrigger(x => x ^ 1);
        }
        if (initial_y
          - (initial_v_y_px * currTime) 
          + (1/2 * accel * currTime ** 2)  <= GROUND_LEVEL_SCALAR * canvas.height) {
          reqNum = requestAnimationFrame(trackProjectile);
        } else {
          const drawX = positionAndSizesInterface.getPivotX(USER_ANCHOR_POINT[0])

          cancelAnimationFrame(reqNum);
          userStateRef.current = new Idle();
          const final_x = range_metres * conversionRateX + positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT)[0];
          const nextXDisplacement = final_x - x;

          const final_y = GROUND_LEVEL_SCALAR * canvas.height;
          gameStateRef.current[3] += nextXDisplacement;
          setStateChangeTrigger(x => x ^ 1);

          if (ctx) {
            drawEnvironment();
            drawCircle(ctx, drawX, final_y, 5, "red", "black");
            console.log(gameStateRef.current[3])

          }
          return;
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


function timeOfFlight(gameStateRef: RefObject<GameState>, canvas: HTMLCanvasElement, conversionRate: number) {
  
  const verticalDisplacement = ((GROUND_LEVEL_SCALAR - gameStateRef.current[2]) * canvas.height) / conversionRate;

  const u = gameStateRef.current[1];
  const theta = gameStateRef.current[0];

  const u_y = u * Math.sin(degreesToRadians(theta));

  const t = quadraticFormula(1/2 * 9.8, -u_y, -verticalDisplacement);
  return t;
}

// in "real-world" metres
function range(gameStateRef: RefObject<GameState>, canvas: HTMLCanvasElement, conversionRate: number) {
  const tf = timeOfFlight(gameStateRef, canvas, conversionRate);
  
  const u = gameStateRef.current[1];
  const theta = gameStateRef.current[0];
  const u_x = u * Math.cos(degreesToRadians(theta));

  return u_x * tf;
}

////////////////////////////////////////////////////////////////////////////////

function degreesToRadians(degs: number) {
  return degs * Math.PI / 180;
}

function quadraticFormula(a: number, b: number, c: number) {
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}