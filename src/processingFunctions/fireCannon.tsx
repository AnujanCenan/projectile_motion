import { Ref, RefObject } from "react";
import { CanvasPositionAndSizes } from "../OOP/CanvasPositionAndSizes.tsx";
import { drawCircle } from "./drawingFunctions.tsx";
import { calculateScrollScalar } from "./scrollScalarCalculation.tsx";
import { GROUND_LEVEL_SCALAR } from "../globalConstants/groundLevelScalar.tsx";
import { UserGameAction } from "../states/userGameActions/UserGameAction.tsx";
import { Firing } from "../states/userGameActions/Firing.tsx";
import { Idle } from "../states/userGameActions/Idle.tsx";

// needs canvas, user anchor point, launch vel, elevation angle, ground level scalar

const GRAV_ACCEL = 9.8

export function fireCannon(
    positionAndSizesInterface: CanvasPositionAndSizes,
    USER_ANCHOR_POINT: number[], 
    launchVelocity: number, 
    elevationAngle: number, 
    GROUND_LEVEL_SCALAR: number, 
    width: number,
    gameStateRef: RefObject<GameState>,
    userStateRef: RefObject<UserGameAction>,
    setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>,

    timeRef: RefObject<number>,
    xVelRef: RefObject<number>,
    xDisRef: RefObject<number>,
    yVelRef: RefObject<number>,
    yDisRef: RefObject<number>

    

) {

  userStateRef.current = new Firing();
  setStateChangeTrigger(x => x ^ 1);

  const range_metres = range(
    gameStateRef, 
    positionAndSizesInterface.getCanvas(), 
    positionAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT)
  );

  const canvas = positionAndSizesInterface.getCanvas();
  const ctx = positionAndSizesInterface.getCtx();

  const tf = timeOfFlight(gameStateRef, canvas, positionAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT));
  var reqNum: number;
  try {
    if (canvas) {
      const [initial_x, initial_y] 
        = positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT);

    const angle_rad = elevationAngle * (Math.PI / 180);


      const conversionRateX = positionAndSizesInterface.calculateConversionRateXDirection(USER_ANCHOR_POINT);
      const conversionRateY = positionAndSizesInterface.calculateConversionRateYDirection(USER_ANCHOR_POINT);

      const accel = GRAV_ACCEL * conversionRateY;          // TODO: acceleration could become a state variable if we move to different planets
      const initial_v =  launchVelocity;

      const initial_v_x = initial_v * Math.cos(angle_rad);      // in real-world m/s
      const initial_v_y = initial_v * Math.sin(angle_rad);      // in real-world m/s

      xVelRef.current = initial_v_x;

      const initial_v_x_px = initial_v_x * conversionRateX;
      const initial_v_y_px = initial_v_y * conversionRateY;

      var x = initial_x;
      var y = initial_y;
      var currTime = 0;

      function trackProjectile() {    
        // if (userStateRef.current === "idle")  return;


        x = initial_x + initial_v_x_px * currTime;                 
        y = initial_y
          - (initial_v_y_px * currTime) 
          + (1/2 * accel * currTime ** 2);



        currTime += 0.04; // something to experiment with

        timeRef.current = currTime;

        xDisRef.current = (x - initial_x) / conversionRateX;
        yDisRef.current = (initial_y - y) / conversionRateY;

        yVelRef.current = initial_v_y - GRAV_ACCEL * timeRef.current;

        

        (canvas.parentNode as HTMLDivElement).scrollTo({
          top: y / window.devicePixelRatio - 10,
          left: (x) / window.devicePixelRatio - width / 2,
          behavior: "instant"
        });

        gameStateRef.current.xScroll = calculateScrollScalar(canvas)
        
        if (ctx) {
          // setStateChangeTrigger(x => x ^ 1);
          drawCircle(ctx, x, y, 5, "blue", "black");
          
        }
        if (initial_y
          - (initial_v_y_px * currTime) 
          + (1/2 * accel * currTime ** 2)  <= GROUND_LEVEL_SCALAR * canvas.height) {
          reqNum = requestAnimationFrame(trackProjectile);
          setStateChangeTrigger(x => x ^ 1)
        } else {
          cancelAnimationFrame(reqNum);

          const final_x = range_metres * conversionRateX + positionAndSizesInterface.getPivotPosition(USER_ANCHOR_POINT)[0];
          const final_y = GROUND_LEVEL_SCALAR * canvas.height;

          timeRef.current = tf
          xDisRef.current = range_metres;
          yDisRef.current = 0;
          yVelRef.current = finalVerticalVelocity(initial_v_y, tf)

          setStateChangeTrigger(x => x ^ 1)
          userStateRef.current = new Idle();

          if (ctx) {
            drawCircle(ctx, final_x, final_y, 5, "red", "black");
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
  // assumes time of flight is when the projectile hits the ground
  const verticalDisplacement = ((GROUND_LEVEL_SCALAR - gameStateRef.current.yPosScalar) * canvas.height) / conversionRate;

  const u = gameStateRef.current.velocity;
  const theta = gameStateRef.current.angle;

  const u_y = u * Math.sin(degreesToRadians(theta));

  const t = quadraticFormula(1/2 * GRAV_ACCEL, -u_y, -verticalDisplacement);
  return t;
}

// in "real-world" metres
function range(gameStateRef: RefObject<GameState>, canvas: HTMLCanvasElement, conversionRate: number) {
  const tf = timeOfFlight(gameStateRef, canvas, conversionRate);
  
  const u = gameStateRef.current.velocity;
  const theta = gameStateRef.current.angle;
  const u_x = u * Math.cos(degreesToRadians(theta));

  return u_x * tf;
}

function finalVerticalVelocity(initialVerticalVel: number, tf: number) {
  return initialVerticalVel - GRAV_ACCEL * tf
}

////////////////////////////////////////////////////////////////////////////////

function degreesToRadians(degs: number) {
  return degs * Math.PI / 180;
}

function quadraticFormula(a: number, b: number, c: number) {
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}