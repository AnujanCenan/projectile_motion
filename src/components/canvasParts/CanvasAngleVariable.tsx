import { RefObject, SetStateAction, useRef } from "react";
import Canvas from "./Canvas";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
import { DrawingToSrcAndImage } from "../../OOP/DrawingImages";

import grassImg from "../../images/foregrounds/grassFlat.png"               // needs to be parameteriesd
import cannonImg from "../../images/Cannons/Cannonv2/Cannon_v2.0_body.png"  // needs to be parameteriesd
import holsterImg from "../../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"
import velocityBarImg from "../../images/velocity/velocityBar.png"
import velocitySliderImg from "../../images/velocity/velocitySlider.png"
import heightScaleImg from "../../images/height/heightBar.png"
import heightArrowImg from "../../images/height/heightIndicator.png"
import targetImg from "../../images/targets/trainingTarget.png"            // needs to be parameteriesd

interface CanvasAngleVariableProps{
  fixedVelocity: number;
  fixedHeight: number;
  max_range: number;
  target_range: number;
  target_altitude: number;
  userGameActionRef: RefObject<UserGameAction>
  gameStateRef: RefObject<GameState>
  setStateChangeTrigger: React.Dispatch<SetStateAction<number>>
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
}: CanvasAngleVariableProps) {

  const foregroundRef = useRef<HTMLImageElement>(null);
  const holsterRef = useRef<HTMLImageElement>(null);
  const cannonRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);

  const objectsToDraw: DrawingToSrcAndImage = {
    cannon: { src: cannonImg, imageRef:  useRef<HTMLImageElement>(null) },
    holster: { src: holsterImg, imageRef:  useRef<HTMLImageElement>(null) },
    foreground: { src: grassImg, imageRef:  useRef<HTMLImageElement>(null) },
    target: { src: targetImg, imageRef:  useRef<HTMLImageElement>(null) },
  }

  return (
    <Canvas 
      MAX_RANGE={max_range}
      target_range={target_range}
      target_altitude={target_altitude}
      userStateRef={userGameActionRef}
      gameStateRef={gameStateRef}
      setStateChangeTrigger={setStateChangeTrigger}
      objectsToDraw={objectsToDraw}
      disableInput={{ angle: false, velocity: fixedVelocity, height: fixedHeight }} 
    />
  )
}