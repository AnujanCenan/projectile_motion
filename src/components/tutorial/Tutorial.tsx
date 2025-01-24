import Canvas from "../canvasParts/Canvas";

import { JSX, useEffect, useRef, useState } from "react";
import { TutorialDialogues } from "./TutorialDialogues";
import { tutorialStates } from "../../types/tutorialStates";
import { Salutations } from "../../states/tutorialStates/Salutations";
import { TutorialState } from "../../states/tutorialStates/TutorialState";
import { TutorialDialogueState } from "../../states/tutorialStates/TutorialDialogueState";

export default function Tutorial() {

  // const [userState, setUserState] = useState("idle" as UserState);
  // const [gameState, setGameState] = useState([0, 0, 0.8, 0] as GameState);

  const userStateRef = useRef<UserState>("idle")
  const gameStateRef = useRef<GameState>([0, 0, 0.8, 0]);
  const [stateChangeTrigger, setStateChangeTrigger] = useState(0);

  const [completedCurrDialogue, setCompletedCurrDialogue] = useState(false);
  // const [currTutStateIndex, setCurrTutStateIndex] = useState(0);

  // const tutorialDialoguesRef = useRef(new TutorialDialogues(setCompletedCurrDialogue));


  const [tutorialState, setTutorialState] = useState(new Salutations(userStateRef, gameStateRef, setCompletedCurrDialogue) as TutorialState);

  useEffect(() => {
    // if (tutorialState === "ToDragCannon" && userState === "draggingCannon" && gameState[0] >= 50) {
    //   setCurrTutStateIndex(c => c + 1);
    // } else if (tutorialState === "ToDragVelocity" && userState === "draggingVelocity" && gameState[1] >= 30) {
    //   setCurrTutStateIndex(c => c + 1);
    // } else if (tutorialState === "ToDragHeightArrow" && userState === "draggingHeightArrow" && gameState[2] <= 0.625) {
    //   setCurrTutStateIndex(c => c + 1);
    // } else if (tutorialState === "ToUseInputPanel" && userState === "inputPanelVelocity" && gameState[1] === 40) {
    //   setCurrTutStateIndex(c => c + 1);
    // } else if (tutorialState === "ToPanToTarget" && userState === "scrolling" && gameState[3] === 1) {
    //   setCurrTutStateIndex(c => c + 1)
    // } else if (tutorialState === "ToFireAtTarget" && userState === "idle" 
    //     && gameState[0] === 45 && gameState[1] === 70 && gameState[2] === 0.8) {
    //   setCurrTutStateIndex(c => c + 1)
    // }
    setTutorialState(tutState => tutState.checkIfCompletedTask());

  }, [/*userState, gameState*/ stateChangeTrigger]);

  useEffect(() => {
    if (completedCurrDialogue) {
      setTutorialState(tutState => tutState.completeDialogue());
      setCompletedCurrDialogue(_ => false);
    }
  }, [completedCurrDialogue])

  useEffect(() => {
    console.log("Detected a change in tutorial state, state is now", tutorialState);
    if (tutorialState instanceof TutorialDialogueState) {

    }

  }, [tutorialState])

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
      
      {/* {(tutorialStates[currTutStateIndex] === "Salutations") && tutorialDialoguesRef.current.salutations()}
      {(tutorialStates[currTutStateIndex] === "DraggingCannonInstructions") &&  tutorialDialoguesRef.current.dragCannonInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedCannon") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "DraggingVelocityInstructions") && tutorialDialoguesRef.current.dragVelocityInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedVelocity") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "DragHeightArrowInstructions") && tutorialDialoguesRef.current.dragHeightArrowInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedHeightArrow") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "InputPanelInstructions") && tutorialDialoguesRef.current.inputPanelInstructions()}
      {(tutorialStates[currTutStateIndex] === "UsedInputPanel") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "PanToTargetInstructions") && tutorialDialoguesRef.current.panToTargetInstructions()}
      {(tutorialStates[currTutStateIndex] === "PannedToTarget") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "FireAtTargetInstructions") && tutorialDialoguesRef.current.fireAtTargetInstructions()}
      {(tutorialStates[currTutStateIndex] === "FiredAtTarget") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "Conclusion") && tutorialDialoguesRef.current.completedTutorial()} */}
    </>
  )
}