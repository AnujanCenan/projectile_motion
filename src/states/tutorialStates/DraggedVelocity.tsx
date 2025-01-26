import { JSX } from "react";
import { TutorialDialogueState } from "./TutorialDialogueState";

import { DragHeightArrowInstructions } from "./DraggingHeightArrowInstructions";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"


export class DraggedVelocity extends TutorialDialogueState {
  getDialogue(): JSX.Element {
    return<Dialogue
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

  completeDialogue(): TutorialState {
    return new DragHeightArrowInstructions(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }
}