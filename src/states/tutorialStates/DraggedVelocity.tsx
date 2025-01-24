import { DragHeightArrowInstructions } from "./DraggingHeightArrowInstructions";
import { TutorialState } from "./TutorialState";


export class DraggedVelocity extends TutorialState {
  completeDialogue(): TutorialState {
    return new DragHeightArrowInstructions(this.getUserState(), this.getGameState());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }
}