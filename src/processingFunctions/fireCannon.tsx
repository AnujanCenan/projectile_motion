import { RefObject } from "react";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes.tsx";
import { drawCircle } from "./drawingFunctions.tsx";
import { calculateScrollScalar } from "./scrollScalarCalculation.tsx";
import { GROUND_LEVEL_SCALAR } from "../globalConstants/groundLevelScalar.tsx";

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

  const range_metres = range(
    gameStateRef, 
    positionAndSizesInterface.getCanvas(), 
    positionAndSizesInterface.calculateConversionRate(USER_ANCHOR_POINT)
  );

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
        if (userStateRef.current === "idle")  return;
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

          const final_x = range_metres * conversionRate + positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT)[0];
          const final_y = GROUND_LEVEL_SCALAR * canvas.height;
          if (ctx) {
            drawCircle(ctx, final_x, final_y, 5, "red", "black");
          }
          setStateChangeTrigger(x => x ^ 1)
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

  console.log(`vertical displacement = ${verticalDisplacement}`)
  const u = gameStateRef.current[1];
  const theta = gameStateRef.current[0];

  const u_y = u * Math.sin(degreesToRadians(theta));

  console.log(`u = ${u}; theta = ${theta}; u_y = ${u_y}`)

  const t = quadraticFormula(1/2 * 9.8, -u_y, -verticalDisplacement);
  console.log(`time of flight = ${t}`);
  return t;
}

// in "real-world" metres
function range(gameStateRef: RefObject<GameState>, canvas: HTMLCanvasElement, conversionRate: number) {
  const tf = timeOfFlight(gameStateRef, canvas, conversionRate);
  
  const u = gameStateRef.current[1];
  const theta = gameStateRef.current[0];
  console.log(`degrees to radians = ${degreesToRadians(theta)}`)
  const u_x = u * Math.cos(degreesToRadians(theta));

  console.log(`u_x = ${u_x}`);

  console.log(`calculated range is ${u_x * tf}`)

  return u_x * tf;
}

////////////////////////////////////////////////////////////////////////////////

function degreesToRadians(degs: number) {
  return degs * Math.PI / 180;
}

function quadraticFormula(a: number, b: number, c: number) {
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}