import { JSX } from "react";
import { TutorialDialogueState } from "./TutorialDialogueState";

import { ToFireAtTarget } from "./ToFireAtTarget";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"

export class FireAtTargetInstructions extends TutorialDialogueState {
  getDialogue(): JSX.Element {
    return <Dialogue 
      name={"General Paddy"} 
      speeches={[
        "Since this is just training, I will provide you with the values to hit the target",
        "Try having your angle at 45 degrees, your velocity at 70 metres per second and your height at 0 metres",
        "Then click the fire button."
      ]} 
      expressions={[GeneralPaddy_neutral]} 
      orderOfExpressions={[0, 0, 0]} 
      setCompletedDialogue={this.getSetCompletedDialogue()}    
    />
  }

  public completeDialogue(): TutorialState {
    return new ToFireAtTarget(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}