import { JSX } from "react";
import { DialogueState } from "./DialogueState";
import { ToUseInputPanel } from "./ToUseInputPanel";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"


export class InputPanelInstructions extends TutorialState implements DialogueState {

  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "Alternatively, instead of clicking and dragging, you can use the input panel",
        "The input panel lets you provide more precise values for your angle, velocity and height",
        "Try using the input panel now to change velocity to 40 metres per second."
      ]}
      expressions={[
        GeneralPaddy_neutral,
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}
    />
  }
  public completeDialogue(): TutorialState {
    return new ToUseInputPanel(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}