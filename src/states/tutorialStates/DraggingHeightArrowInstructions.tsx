import { JSX } from "react";
import { TutorialDialogueState } from "./TutorialDialogueState";
import { ToDragHeightArrow } from "./ToDragHeightArrow";
import { TutorialState } from "./TutorialState";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import Dialogue from "../../components/dialogue/Dialogue";


export class DragHeightArrowInstructions extends TutorialDialogueState {
  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "Finally, to change the height of your cannon, you can drag the height arrow up and down",
        "Move the cannon at least a quarter of a way up"
      ]}
      expressions={[
        GeneralPaddy_neutral,
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}
    />
  }
  
  public completeDialogue(): TutorialState {
    return new ToDragHeightArrow(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue);
    
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}