import { InputPanelInstructions } from "./InputPanelInstructions";
import { TutorialState } from "./TutorialState";


export class DraggedHeightArrow extends TutorialState {
  completeDialogue(): TutorialState {
    return new InputPanelInstructions(this.getUserState(), this.getGameState());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }

}