// My saving grace: https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click

import Canvas from "../canvasParts/Canvas";

import { JSX, useEffect, useRef, useState } from "react";
import { Salutations } from "../../states/tutorialStates/Salutations";
import { TutorialState } from "../../states/tutorialStates/TutorialState";
import { TutorialDialogueState } from "../../states/tutorialStates/TutorialDialogueState";
import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
import { LoadingImages } from "../../states/userGameActions/LoadingImages";


export default function Tutorial() {
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
    addChild();
  }, [tutorialState])
  
  function addChild() {
    if (tutorialState instanceof TutorialDialogueState) {
      setDialogueChildren([
        ...dialogueChildren, tutorialState.getDialogue()
      ]);

    } 
  }

  return (
    <>
      <Canvas 
        MAX_RANGE={500} 
        target_range={500} 
        target_altitude={0} 
        userStateRef={userGameActionRef}
        gameStateRef={gameStateRef}
        setStateChangeTrigger={setStateChangeTrigger}
      />
      <div id="dialogue_wrapper">
        {dialogueChildren}
      </div>
      
    </>

  )
}