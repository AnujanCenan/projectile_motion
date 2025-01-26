import Canvas from "../canvasParts/Canvas";

import { JSX, useEffect, useRef, useState } from "react";
// import { TutorialDialogues } from "./TutorialDialogues";
// import { tutorialStates } from "../../types/tutorialStates";
import { Salutations } from "../../states/tutorialStates/Salutations";
import { TutorialState } from "../../states/tutorialStates/TutorialState";
import { TutorialDialogueState } from "../../states/tutorialStates/TutorialDialogueState";


export default function Tutorial() {
  const userStateRef = useRef<UserState>("idle")
  const gameStateRef = useRef<GameState>([0, 0, 0.8, 0]);
  const [stateChangeTrigger, setStateChangeTrigger] = useState(0);

  const [completedCurrDialogue, setCompletedCurrDialogue] = useState(false);


  const [tutorialState, setTutorialState] = useState(new Salutations(userStateRef, gameStateRef, setCompletedCurrDialogue) as TutorialState);
  const dialgueChildren = useRef<JSX.Element[]>([new Salutations(userStateRef, gameStateRef, setCompletedCurrDialogue).getDialogue()]);

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
    console.log("Adding a child in dialogue children")
    if (tutorialState instanceof TutorialDialogueState && !(tutorialState instanceof Salutations)) {
      dialgueChildren.current.push(tutorialState.getDialogue());
      console.log(dialgueChildren.current)
      setStateChangeTrigger(x => x ^ 1);
    } 
  }



  return (
    <>
      <Canvas 
        MAX_RANGE={500} 
        target_range={500} 
        target_altitude={0} 
        userStateRef={userStateRef}
        gameStateRef={gameStateRef}
        setStateChangeTrigger={setStateChangeTrigger}
      />
      <div id="dialogue_wrapper">
        {dialgueChildren.current}
      </div>
      
    </>

  )
}