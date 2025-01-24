import { JSX } from "react";
import { DialogueState } from "./DialogueState";
import { PanToTargetInstructions } from "./PanToTargetInstructions";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"


export class UsedInputPanel extends TutorialState implements DialogueState {
  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "Well done.",
      ]}
      expressions={[
        GeneralPaddy_neutral,
      ]} 
      orderOfExpressions={[0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}

    />
  }

  public completeDialogue(): TutorialState {
    return new PanToTargetInstructions(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}