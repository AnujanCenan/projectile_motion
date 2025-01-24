import { JSX } from "react";
import { DialogueState } from "./DialogueState";
import { ToPanToTarget } from "./ToPanToTarget";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"


export class PanToTargetInstructions extends TutorialState implements DialogueState {
  
  getDialogue(): JSX.Element {
    return <Dialogue
      name={"General Paddy"} 
      speeches={[
        "Your target can be seen by panning to the right.", 
        "You can do this by scrolling or using the interactive map on the top left corner",
        "Pan all the way to the end of the training ground"
      ]} 
      expressions={[GeneralPaddy_neutral]}
      orderOfExpressions={[0, 0, 0]} 
      setCompletedDialogue={this.getSetCompletedDialogue()}    
    />
  }

  public completeDialogue(): TutorialState {
    return new ToPanToTarget(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}