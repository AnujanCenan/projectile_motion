import { JSX } from "react";
import { DialogueState } from "./DialogueState";
import { ToDragVelocity } from "./ToDragVelocity";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"


export class DraggingVelocityInstructions extends TutorialState implements DialogueState {
  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "If you need to change the launch speed, you can draw the slider below the cannon.",
        "Try changing the velocity so that it is greater than 30 metres per second."
      ]}
      expressions={[
        GeneralPaddy_neutral,
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}
    />
  }

  public completeDialogue(): TutorialState {
    return new ToDragVelocity(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}