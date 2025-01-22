import Canvas from "../canvasParts/Canvas";
import Dialogue from "../dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"
import { useEffect, useRef, useState } from "react";
import { TutorialDialogues } from "./TutorialDialogues";


export default function Tutorial() {


  const [userState, setUserState] = useState("default" as UserState);
  const [gameState, setGameState] = useState([0, 0, 0.8]);  // [angle, velocity, userAnchor[1]]

  const [sequenceMarker, setSequenceMarker] = useState("Salutations" as TutorialState)
  
  const tutorialDialoguesRef = useRef(new TutorialDialogues(setSequenceMarker));

  useEffect(() => {
    if (sequenceMarker === "ToDragCannon" && userState === "draggingCannon" && gameState[0] >= 50) {
      setSequenceMarker("DraggedCannon");
    } else if (sequenceMarker === "ToDragVelocity" && userState === "draggingVelocity" && gameState[1] >= 30) {
      setSequenceMarker("DraggedVelocity");
    } else if (sequenceMarker === "ToDragHeightArrow" && userState === "draggingHeightArrow" && gameState[2] <= 0.625) {
      setSequenceMarker("DraggedHeightArrow");
    } else if (sequenceMarker === "ToUseInputPanel" && ["inputPanelAngle", "inputPanelVelocity", "inputPanelHeight"].includes(userState)) {
      setSequenceMarker("UsedInputPanel")
    }
  }, [userState, gameState, sequenceMarker])

  
  return (
    <>
      <Canvas 
        MAX_RANGE={500} 
        target_range={500} 
        target_altitude={0} 
        setUserState={setUserState} 
        setGameState={setGameState}
      />
      
      {(sequenceMarker === "Salutations") && tutorialDialoguesRef.current.salutations()}
      {(sequenceMarker === "DraggingCannonInstructions") &&  tutorialDialoguesRef.current.dragCannonInstructions()}
      {(sequenceMarker === "DraggedCannon") && tutorialDialoguesRef.current.wellDone()}
      {(sequenceMarker === "DraggingVelocityInstructions") && tutorialDialoguesRef.current.dragVelocityInstructions()}
      {(sequenceMarker === "DraggedVelocity") && tutorialDialoguesRef.current.wellDone2()}
      {(sequenceMarker === "DragHeightArrowInstructions") && tutorialDialoguesRef.current.dragHeightArrowInstructions()}
      {(sequenceMarker === "DraggedHeightArrow") && tutorialDialoguesRef.current.wellDone3()}
      {(sequenceMarker === "InputPanelInstructions" && tutorialDialoguesRef.current.inputPanelInstructions())}
      {(sequenceMarker === "UsedInputPanel") && tutorialDialoguesRef.current.wellDone4()}
    </>
  )
}