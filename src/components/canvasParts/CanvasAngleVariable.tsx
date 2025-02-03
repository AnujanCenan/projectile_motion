import { RefObject, SetStateAction, useRef } from "react";
import Canvas from "./Canvas";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";

interface CanvasAngleVariableProps{
  fixedVelocity: number;
  fixedHeight: number;
  max_range: number;
  target_range: number;
  target_altitude: number;
  userGameActionRef: RefObject<UserGameAction>
  gameStateRef: RefObject<GameState>
  setStateChangeTrigger: React.Dispatch<SetStateAction<number>>
  refsArray: RefObject<HTMLImageElement | null>[];
  srcArray: string[];
}
export default function CanvasAngleVariable({
  fixedVelocity, 
  fixedHeight,
  max_range,
  target_range,
  target_altitude,
  userGameActionRef,
  gameStateRef,
  setStateChangeTrigger,
  refsArray,
  srcArray

}: CanvasAngleVariableProps) {



  return (
    <Canvas 
      MAX_RANGE={max_range}
      target_range={target_range}
      target_altitude={target_altitude}
      userStateRef={userGameActionRef}
      gameStateRef={gameStateRef}
      setStateChangeTrigger={setStateChangeTrigger}
      refsArray={refsArray}
      srcArray={srcArray}    
      disableInput={{ angle: false, velocity: fixedVelocity, height: fixedHeight }} 
    />
  )
}