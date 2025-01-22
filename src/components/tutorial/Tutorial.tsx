import Canvas from "../canvasParts/Canvas";

import { useEffect, useRef, useState } from "react";
import { TutorialDialogues } from "./TutorialDialogues";
import { TutorialState, tutorialStates } from "../../types/tutorialStates";

export default function Tutorial() {

  const [userState, setUserState] = useState("default" as UserState);
  const [gameState, setGameState] = useState([0, 0, 0.8]);  // [angle, velocity, userAnchor[1]]
  
  const [completedCurrDialogue, setCompletedCurrDialogue] = useState(false);
  const [currTutStateIndex, setCurrTutStateIndex] = useState(0);

  const tutorialDialoguesRef = useRef(new TutorialDialogues(setCompletedCurrDialogue));

  useEffect(() => {
    const tutorialState = tutorialStates[currTutStateIndex];
    if (tutorialState === "ToDragCannon" && userState === "draggingCannon" && gameState[0] >= 50) {
      setCurrTutStateIndex(currTutStateIndex + 1);
    } else if (tutorialState === "ToDragVelocity" && userState === "draggingVelocity" && gameState[1] >= 30) {
      setCurrTutStateIndex(currTutStateIndex + 1);
    } else if (tutorialState === "ToDragHeightArrow" && userState === "draggingHeightArrow" && gameState[2] <= 0.625) {
      setCurrTutStateIndex(currTutStateIndex + 1);
    } else if (tutorialState === "ToUseInputPanel" && userState === "inputPanelVelocity" && gameState[1] === 40) {
      setCurrTutStateIndex(currTutStateIndex + 1);
    }
  }, [userState, gameState, currTutStateIndex]);

  useEffect(() => {
    if (completedCurrDialogue) {
      console.log("In useEffect in tutorial.tsx because completedCurrDialogue was set to true")
      
      setCurrTutStateIndex(c => c + 1); 
    }
  }, [completedCurrDialogue])

  useEffect(() => {
    setCompletedCurrDialogue(false);
    console.log(tutorialStates[currTutStateIndex])
  }, [currTutStateIndex])

  return (
    <>
      <Canvas 
        MAX_RANGE={500} 
        target_range={500} 
        target_altitude={0} 
        setUserState={setUserState} 
        setGameState={setGameState}
      />
      
      {(tutorialStates[currTutStateIndex] === "Salutations") && tutorialDialoguesRef.current.salutations()}
      {(tutorialStates[currTutStateIndex] === "DraggingCannonInstructions") &&  tutorialDialoguesRef.current.dragCannonInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedCannon") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "DraggingVelocityInstructions") && tutorialDialoguesRef.current.dragVelocityInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedVelocity") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "DragHeightArrowInstructions") && tutorialDialoguesRef.current.dragHeightArrowInstructions()}
      {(tutorialStates[currTutStateIndex] === "DraggedHeightArrow") && tutorialDialoguesRef.current.wellDone()}
      {(tutorialStates[currTutStateIndex] === "InputPanelInstructions" && tutorialDialoguesRef.current.inputPanelInstructions())}
      {(tutorialStates[currTutStateIndex] === "UsedInputPanel") && tutorialDialoguesRef.current.wellDone()}
    </>
  )
}