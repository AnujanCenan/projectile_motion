import Canvas from "../canvasParts/Canvas";
import Dialogue from "../dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"
import { useEffect, useState } from "react";


export default function Tutorial() {


  const [userState, setUserState] = useState("");
  // gameState = [angle, velocity, userAnchor[1]]
  const [gameState, setGameState] = useState([0, 0, 0.8]);

  const [completedSalutations, setCompletedSalutations] = useState(false);
  const [completedCannonDragDialogue, setCompletedCannonDragDialogue] = useState(false);
  const [draggedCannon, setDraggedCannon] = useState(false);

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
      setCompletionVariable={setCompletedSalutations}
    />
  
  const changeAngle =
    <Dialogue
      name="General Paddy"
      speeches={[
        "It is important to be able to change the angle of your cannon. You have a few options to change the angle of elevation.",
        "You can click and drag the cannon to raise and lower it.",
        "Try changing the angle so that it is greater than 50 degrees"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletionVariable={setCompletedCannonDragDialogue}
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
      setCompletionVariable={null}
    />

  useEffect(() => {
    if (userState === "dragginCannon" && gameState[0] >= 50) {
      setDraggedCannon(true);
    }

  })

  
  return (
    <>
      <Canvas 
        MAX_RANGE={500} 
        target_range={500} 
        target_altitude={0} 
        setUserState={setUserState} 
        setGameState={setGameState}
      />
      
      {!completedSalutations && salutations}
      {completedSalutations && !completedCannonDragDialogue && changeAngle}
      {completedCannonDragDialogue && draggedCannon && wellDone}

    </>
  )
}