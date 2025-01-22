import Canvas from "../canvasParts/Canvas";
import Dialogue from "../dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"
import { useEffect, useState } from "react";


export default function Tutorial() {


  const [userState, setUserState] = useState("default" as UserState);
  const [gameState, setGameState] = useState([0, 0, 0.8]);  // [angle, velocity, userAnchor[1]]

  const [sequenceMarker, setSequenceMarker] = useState("Salutations" as TutorialState)

  const salutations = 
    <Dialogue
      name="General Paddy"
      speeches={[
        "ATTENTION!",
        "Seems like you're the newest recruit. I've heard good things from your current instructor.",
        "Well, don't think I'll be so easy to impress. It's one thing to be able to perfom in the classroom.",
        "It's a WHOLE other thing to be reliable on the battlefield.",
        "So let's see what you've got, shall we?"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[2, 0, 2, 0, 1]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"DraggingCannonInstructions"}
    />
  
  const dragCannonInstructions =
    <Dialogue
      name="General Paddy"
      speeches={[
        "It is important to be able to change the angle of your cannon. You have a few options to change the angle of elevation.",
        "You can click and drag the cannon to raise and lower it.",
        "Try changing the angle so that it is greater than 50 degrees."
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"ToDragCannon"}
    />

  const wellDone =
    <Dialogue
      name="General Paddy"
      speeches={[
        "Well done",
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"DraggingVelocityInstructions"}
    />
    
  const dragVelocityInstructions =
    <Dialogue 
      name="General Paddy"
      speeches={[
        "If you need to change the launch speed, you can draw the slider below the cannon.",
        "Try changing the velocity so that it is greater than 30 metres per second."
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"ToDragVelocity"}
    />

  const wellDone2 =
    <Dialogue
      name="General Paddy"
      speeches={[
        "Well done",
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"DragHeightArrowInstructions"}
    />
  
  const dragHeightArrowInstructions = 
    <Dialogue 
      name="General Paddy"
      speeches={[
        "Finally, to change the height of your cannon, you can drag the height arrow up and down",
        "Move the cannon at least a quarter of a way up"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"ToDragHeightArrow"}
    />

    const wellDone3 =
    <Dialogue
      name="General Paddy"
      speeches={[
        "Well done",
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0]}
      setCompletionVariable={setSequenceMarker}
      completionVal={"ToPanToTarget"}
    />

  useEffect(() => {
    if (sequenceMarker === "ToDragCannon" && userState === "draggingCannon" && gameState[0] >= 50) {
      setSequenceMarker("DraggedCannon");
    } else if (sequenceMarker === "ToDragVelocity" && userState === "draggingVelocity" && gameState[1] >= 30) {
      setSequenceMarker("DraggedVelocity");
    } else if (sequenceMarker === "ToDragHeightArrow" && userState === "draggingHeightArrow" && gameState[2] <= 0.625) {
      setSequenceMarker("DraggedHeightArrow");
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
      
      {(sequenceMarker === "Salutations") && salutations}
      {(sequenceMarker === "DraggingCannonInstructions") &&  dragCannonInstructions}
      {(sequenceMarker === "DraggedCannon") && wellDone}
      {(sequenceMarker === "DraggingVelocityInstructions") && dragVelocityInstructions}
      {(sequenceMarker === "DraggedVelocity") && wellDone2}
      {(sequenceMarker === "DragHeightArrowInstructions") && dragHeightArrowInstructions}
      {(sequenceMarker === "DraggedHeightArrow") && wellDone3}
    </>
  )
}