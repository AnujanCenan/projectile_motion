// My saving grace: https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click

import Canvas from "../canvasParts/Canvas";

import { JSX, SetStateAction, useEffect, useRef, useState } from "react";
import { Salutations } from "../../states/tutorialStates/Salutations";
import { TutorialState } from "../../states/tutorialStates/TutorialState";
import { TutorialDialogueState } from "../../states/tutorialStates/TutorialDialogueState";
import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
import { LoadingImages } from "../../states/userGameActions/LoadingImages";
import { CompletedTutorial } from "../../states/tutorialStates/CompletedTutorial";
import CompletedMission from "../completedMission/CompletedMission";
import { ReadingDialogue } from "../../states/userGameActions/ReadingDialogue";
import { TutorialActionState } from "../../states/tutorialStates/TutorialActionState";
import CurrObjective from "../currObjective/CurrObjective";
import PauseButton from "../pauseButton/pauseButton";

import grassImg from "../../images/foregrounds/grassFlat.png"
import cannonImg from "../../images/Cannons/Cannonv2/Cannon_v2.0_body.png"
import holsterImg from "../../images/Cannons/Cannonv2/Cannon_v2.0_holster.png"
import velocityBarImg from "../../images/velocity/velocityBar.png"
import velocitySliderImg from "../../images/velocity/velocitySlider.png"
import heightScaleImg from "../../images/height/heightBar.png"
import heightArrowImg from "../../images/height/heightIndicator.png"
import targetImg from "../../images/targets/trainingTarget.png"
import { DrawingToSrcAndImage } from "../../OOP/DrawingImages";

interface TutorialProps {
  setProjectileMotionPage: React.Dispatch<SetStateAction<JSX.Element>>
}
export default function Tutorial({setProjectileMotionPage}: TutorialProps) {
  // const userStateRef = useRef<UserState>("loading")
  const userGameActionRef = useRef<UserGameAction>(new LoadingImages());

  const gameStateRef = useRef<GameState>([0, 0, GROUND_LEVEL_SCALAR, 0]);
  const [stateChangeTrigger, setStateChangeTrigger] = useState(0);

  const [completedCurrDialogue, setCompletedCurrDialogue] = useState(false);


  const [tutorialState, setTutorialState] = useState(new Salutations(userGameActionRef, gameStateRef, setCompletedCurrDialogue) as TutorialState);
  const [dialogueChildren, setDialogueChildren] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setTutorialState(tutState => tutState.checkIfCompletedTask());
  }, [stateChangeTrigger]);

  useEffect(() => {
    if (completedCurrDialogue) {
      setTutorialState(tutState => tutState.completeDialogue());
      setCompletedCurrDialogue(_ => false);
    }
  }, [completedCurrDialogue])

  useEffect(() => {
    if (tutorialState instanceof TutorialDialogueState) {
      userGameActionRef.current = new ReadingDialogue();
      setDialogueChildren([
        ...dialogueChildren, tutorialState.getDialogue()
      ]);
    } 
  }, [tutorialState])

  const foregroundRef = useRef<HTMLImageElement>(null);
  const holsterRef = useRef<HTMLImageElement>(null);
  const cannonRef = useRef<HTMLImageElement>(null);
  const velocityBarRef = useRef<HTMLImageElement>(null);
  const velocitySliderRef = useRef<HTMLImageElement>(null);
  const heightScaleRef = useRef<HTMLImageElement>(null);
  const heightArrowRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);

  const objectsToDraw: DrawingToSrcAndImage = {
    cannon: { src: cannonImg, imageRef: cannonRef },
    holster: { src: holsterImg, imageRef: holsterRef },
    foreground: { src: grassImg, imageRef: foregroundRef },
    target: { src: targetImg, imageRef: targetRef },
    
    velocityBar: { src: velocityBarImg, imageRef: velocityBarRef },
    velocitySlider: { src: velocitySliderImg, imageRef: velocitySliderRef },
    heightArrow: { src: heightArrowImg, imageRef: heightArrowRef },
    heightScale: { src: heightScaleImg, imageRef: heightScaleRef }
  }

  return (
    <>
      {/* Ending Screen when mission is completed */}
      {tutorialState instanceof CompletedTutorial && <CompletedMission setProjectileMotionPage={setProjectileMotionPage}/>}
      
      {/* The array of dialogue */}
      {dialogueChildren}
      
      {/* Pause button */}
      <PauseButton 
        setProjectileMotionPage={setProjectileMotionPage}
        startingLevelState={new Salutations(userGameActionRef, gameStateRef, setCompletedCurrDialogue)}
        setLevelState={setTutorialState} 
        userGameActionRef={userGameActionRef}
      />
      {/* Main canvas - includes input panel and interactive map */}
      <Canvas 
        MAX_RANGE={500}
        MAX_HEIGHT={100}
        target_range={500}
        target_altitude={0}
        userStateRef={userGameActionRef}
        gameStateRef={gameStateRef}
        setStateChangeTrigger={setStateChangeTrigger}
        disableInput={{ angle: false, velocity: false, height: false }} 
        objectsToDraw={objectsToDraw}
      />
    
      {/* Helpful Hints component */}
      {tutorialState instanceof TutorialActionState &&
        <CurrObjective currObjectives={tutorialState.getObjectives()} />
      }
      
    </>

  )
}