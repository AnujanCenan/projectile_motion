import { JSX } from "react";
import { DialogueState } from "./DialogueState";
import { DraggingVelocityInstructions } from "./DraggingVelocityInstructions";
import { TutorialState } from "./TutorialState";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import Dialogue from "../../components/dialogue/Dialogue";

export class DraggedCannon extends TutorialState implements DialogueState {

  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "It is important to be able to change the angle of your cannon. You can click and drag the cannon to raise and lower it.",
        "Try changing the angle so that it is greater than 50 degrees."
      ]}
      expressions={[
        GeneralPaddy_neutral
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}
    
    />
  }
  
  completeDialogue(): TutorialState {
    return new DraggingVelocityInstructions(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }

}