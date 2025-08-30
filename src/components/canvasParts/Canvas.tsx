import { RefObject, useEffect, useRef, useState } from "react"
import useWindowSize from "../resizingHook.tsx"

import "./CSS/Canvas.css"

import { 
  getCannonInfo, 
  getForegroundInfo, 
  getHeightBarInfo, 
  getHolsterInfo,
  getTargetInfo,
  getVelocitySliderInfo,
  isLandscape
} from "../../processingFunctions/drawingFunctions.tsx"

import FireButton from "./FireButton.tsx";
import InputPanel from "./InputPanel.tsx";
import { fireCannon } from "../../processingFunctions/fireCannon.tsx";
import { CanvasPositionAndSizes } from "../../OOP/CanvasPositionAndSizes.tsx";
import { DrawingImages, DrawingToSrcAndImage } from "../../OOP/DrawingImages.tsx"
import { CanvasMouseDown } from "../../OOP/canvasMouseEvents/CanvasMouseDown.tsx"
import { CanvasMouseMove } from "../../OOP/canvasMouseEvents/CanvasMouseMove.tsx"
import { CanvasImagePreloader } from "../../OOP/CanvasImagePreloader.tsx"
import InteractiveMap from "./InteractiveMap.tsx"
import { fix_dpi } from "../fixDPI.tsx"
import { calculateScrollScalar } from "../../processingFunctions/scrollScalarCalculation.tsx"
import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar.tsx"
import { UserGameAction } from "../../states/userGameActions/UserGameAction.tsx"
import { Firing } from "../../states/userGameActions/Firing.tsx"
import { Scrolling } from "../../states/userGameActions/Scrolling.tsx"
import { Idle } from "../../states/userGameActions/Idle.tsx"
import { LoadingImages } from "../../states/userGameActions/LoadingImages.tsx"
import { Restarting } from "../../states/userGameActions/Restarting.tsx"
import { Disabled } from "../../types/DisableInput.tsx"


/**
 * @param MAX_RANGE - The maximum horizontal range of the cannon
 * @param target_range - How far away the target is from the cannon (metres)
 * @param target_altitude - How high the target is from the ground (metres)
 * @param userStateRef - The reference to the user's current state
 * @param gameStateRef - The reference to the game's current state
 * @param setStateChangeTrigger - The function that triggers a state change
 * @param disableInput - The input types (angle, velocity, height) that is disabled
 * @param objectsToDraw - The objects (image)to draw on the canvas
 * 
 * Note: the refsArray and srcArray must be in the same order
 */
interface CanvasProps {
  MAX_RANGE: number,
  MAX_HEIGHT: number,
  target_range: number,
  target_altitude: number,
  userStateRef: RefObject<UserGameAction>,
  gameStateRef: RefObject<GameState>
  setStateChangeTrigger: React.Dispatch<React.SetStateAction<number>>  
  disableInput: Disabled
  objectsToDraw: DrawingToSrcAndImage;
}
// TODO: ensure target_range <= MAX_HORIZONTAL_RANGE
export default function Canvas({
  MAX_RANGE, 
  MAX_HEIGHT, 
  target_range, 
  target_altitude, 
  userStateRef, 
  gameStateRef, 
  setStateChangeTrigger, 
  disableInput, 
  objectsToDraw
}: CanvasProps) {
  // Positioning Constants
  const CANNON_HORIZONTAL_SCALAR = isLandscape() ? 0.5: 0.8;

  // const yScalarRef = useRef(GROUND_LEVEL_SCALAR);

  const [USER_ANCHOR_POINT, setUserAnchorPoint] = useState([CANNON_HORIZONTAL_SCALAR, gameStateRef.current[2]] as number[])

  
  const { width, height } = useWindowSize();

  //// Element References
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Textbox references
  const angleInputRef = useRef<HTMLInputElement>(null);
  const velocityInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  const MAX_SPEED = Math.sqrt(9.8 * MAX_RANGE)

  const foregroundInfo = getForegroundInfo("grass");
  const cannonInfo = getCannonInfo("v2");
  const holsterInfo = getHolsterInfo("holster_v1")
  const velocitySliderInfo = getVelocitySliderInfo("velocity_slider");
  const heightBarInfo = getHeightBarInfo("height_bar");
  const targetInfo = getTargetInfo("practice_target");


  // Cannon State Variables
  const [elevationAngle, setElevationAngle] = useState(disableInput.angle === false ? 0 : disableInput.angle);
  const [launchVelocity, setLaunchVelocity] = useState(disableInput.velocity === false ? 0 : disableInput.velocity)

  const click_x = useRef<number>(0);
  const click_y = useRef<number>(0);
  const clickedBehindPivot = useRef<number>(1);

  // For class instances
  const positionAndSizesInterfaceRef = useRef<CanvasPositionAndSizes>(null);
  const drawingInterfaceRef = useRef<DrawingImages>(null);

  const canvasMouseDownEvent = useRef<CanvasMouseDown>(null);
  const canvasMouseMoveEvent = useRef<CanvasMouseMove>(null);

  const imagePreloader = new CanvasImagePreloader();

  function pickHorizontalScalar() {
    return (isLandscape() ? 0.5 : 0.8);
  }
  useEffect(() => {
    setUserAnchorPoint([pickHorizontalScalar(), USER_ANCHOR_POINT[1]])
    
  }, [width, height]);

  useEffect(() => {
    gameStateRef.current[2] = USER_ANCHOR_POINT[1];
  }, [USER_ANCHOR_POINT]);

  useEffect(() => {
    if (userStateRef.current instanceof Restarting) {
      setElevationAngle(disableInput.angle !== false ? disableInput.angle : 0);
      setLaunchVelocity(disableInput.velocity !== false ? disableInput.velocity : 0);
      
      
      setUserAnchorPoint([
        pickHorizontalScalar(), 
        calculateAnchorPointY(disableInput.height !== false ? disableInput.height : GROUND_LEVEL_SCALAR)
      ]);
      (canvasRef.current?.parentElement as HTMLDivElement).scrollTo({
        left: 0
      })
      userStateRef.current = new Idle();
      

    }
  })

  //////////////////////// Canvas Loading //////////////////////////////////////
  
  useEffect(() => {
    if (userStateRef.current instanceof LoadingImages) {
      
      imagePreloader.loadImages(objectsToDraw, () => {
        drawEnvironmentFromCanvas();
      })
    }
  }, [])
/////////////////////////// Height Check ///////////////////////////////////////
  useEffect(() => {
    if (disableInput.height !== false) {
      const fixedHeight = disableInput.height;
      // probably need a check to make sure the asked for fixed height is less than max metre height
      setUserAnchorPoint([USER_ANCHOR_POINT[0], calculateAnchorPointY(fixedHeight)]);
    }
  }, [])

  function calculateAnchorPointY(height: number): number {
    if (positionAndSizesInterfaceRef.current && canvasRef.current) {
      const convRate = positionAndSizesInterfaceRef.current.calculateConversionRateYDirection(USER_ANCHOR_POINT);

      const anchor_point_y = GROUND_LEVEL_SCALAR - ((height * convRate)/ canvasRef.current.height);
      return anchor_point_y
    } else {
      return GROUND_LEVEL_SCALAR;
    }
  }

  //////////////////////// Canvas Drawing //////////////////////////////////////

  
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) fix_dpi(canvas);
    

  }, [width, height]);

  useEffect(() => {
    if (canvasRef.current) {
      positionAndSizesInterfaceRef.current = new CanvasPositionAndSizes(
        canvasRef.current, 
        foregroundInfo,
        cannonInfo, 
        holsterInfo, 
        velocitySliderInfo, 
        heightBarInfo,
        targetInfo, 
        MAX_RANGE,
        MAX_HEIGHT
      );


      drawingInterfaceRef.current = new DrawingImages(
        positionAndSizesInterfaceRef.current,
        objectsToDraw
      )

      canvasMouseDownEvent.current = new CanvasMouseDown(
        positionAndSizesInterfaceRef.current,
        clickedBehindPivot,
        userStateRef,
        click_x,
        click_y
      )

      canvasMouseMoveEvent.current = new CanvasMouseMove(
        positionAndSizesInterfaceRef.current,
        clickedBehindPivot,
        userStateRef,
        click_x,
        click_y,
        disableInput
      )
    }
  }, [cannonInfo, holsterInfo, velocitySliderInfo, MAX_RANGE])
  
  useEffect(() => {
    if (canvasRef.current && canvasRef.current.parentElement) {

      gameStateRef.current = [
        elevationAngle, 
        launchVelocity, 
        USER_ANCHOR_POINT[1], 
        calculateScrollScalar(canvasRef.current)
      ]
      setStateChangeTrigger(x => x ^ 1);
    }
  }, [elevationAngle, launchVelocity, USER_ANCHOR_POINT])

  useEffect(() => {
    
    drawEnvironmentFromCanvas();
  }, [GROUND_LEVEL_SCALAR, 
    USER_ANCHOR_POINT,
    MAX_SPEED,
    launchVelocity,
    elevationAngle,
    width, height,
    CANNON_HORIZONTAL_SCALAR
  ])

  

  function drawEnvironmentFromCanvas() {
    
    drawingInterfaceRef.current?.drawEnvironment(
      GROUND_LEVEL_SCALAR, 
      [USER_ANCHOR_POINT[0], gameStateRef.current[2]],
      MAX_SPEED,
      launchVelocity,
      elevationAngle,
      target_range,
      target_altitude,
    )
  }

  //////////////////////// Changing Angles Mouse Events ////////////////////////

  function mouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    canvasMouseDownEvent.current?.mouseDown(
      e, positionAndSizesInterfaceRef.current!, elevationAngle, launchVelocity, USER_ANCHOR_POINT, MAX_SPEED
    )
  }

  function mouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (angleInputRef.current && velocityInputRef.current && heightInputRef.current) {
      canvasMouseMoveEvent.current?.mouseMove(
        e,
        elevationAngle,
        launchVelocity,
        USER_ANCHOR_POINT,
        MAX_SPEED,
        CANNON_HORIZONTAL_SCALAR,
        GROUND_LEVEL_SCALAR,
        angleInputRef as RefObject<HTMLInputElement>,
        velocityInputRef as RefObject<HTMLInputElement>,
        heightInputRef as RefObject<HTMLInputElement>,
        setElevationAngle,
        setLaunchVelocity,
        setUserAnchorPoint,
        setStateChangeTrigger
      )
    }
  }

  function mouseUp() {
    userStateRef.current = new Idle();
  }
  
  ///////////////////////////////////////////////////////////////////////////////

  return (
    <>
      
      <div id="container" onScroll={() => {
        if (canvasRef.current && !(userStateRef.current instanceof Firing)) {
          userStateRef.current = new Scrolling();
          gameStateRef.current = [
            elevationAngle, launchVelocity, USER_ANCHOR_POINT[1], calculateScrollScalar(canvasRef.current)
          ]
          setStateChangeTrigger(x => x ^ 1);
        }
      }}>
        <canvas ref={canvasRef} 
          id="canvas" 
          onMouseDown={(e) => mouseDown(e)}
          onMouseUp={() => mouseUp()}
          onMouseMove={(e) => mouseMove(e)}
        >
        </canvas>

        {canvasRef.current &&

          <InputPanel 
            setElevationAngle={setElevationAngle} 
            setLaunchVelocity={setLaunchVelocity} 
            setUserAnchorPoint={setUserAnchorPoint}
            MAX_SPEED={MAX_SPEED} 
            angleInputRef={angleInputRef} 
            velocityInputRef={velocityInputRef}
            heightInputRef={heightInputRef}
            canvas={canvasRef.current}
            USER_ANCHOR_PONT={USER_ANCHOR_POINT}
            MAX_HORIZONTAL_RANGE={MAX_RANGE}
            CANNON_HORIZONTAL_SCALAR={CANNON_HORIZONTAL_SCALAR}
            GROUND_LEVEL_SCALAR={GROUND_LEVEL_SCALAR}
            positioningAndSizesInterface={(positionAndSizesInterfaceRef.current)!}
            userStateRef={userStateRef}
            setStateChangeTrigger={setStateChangeTrigger}
            disableInput={disableInput}
          />
        }

        {canvasRef.current && canvasRef.current.parentElement && positionAndSizesInterfaceRef.current &&      
          <InteractiveMap 
            parentCanvasRef={canvasRef as RefObject<HTMLCanvasElement>}
            pivotCoords={positionAndSizesInterfaceRef.current.getPivotPosition(USER_ANCHOR_POINT)} 
            targetCoords={positionAndSizesInterfaceRef.current.getTargetPivot(
              GROUND_LEVEL_SCALAR, USER_ANCHOR_POINT, target_altitude, target_range
            )}        
            gameStateRef={gameStateRef}
          />}

        { 
          <FireButton 
            fireCannon={() => fireCannon(
              (positionAndSizesInterfaceRef.current)!,
              USER_ANCHOR_POINT, 
              launchVelocity, 
              elevationAngle, 
              GROUND_LEVEL_SCALAR, 
              width,
              gameStateRef,
              userStateRef,
              setStateChangeTrigger
            )} 
          />
        }

      </div>
    </>
  )
}