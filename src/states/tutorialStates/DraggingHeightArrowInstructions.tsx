import { ToDragHeightArrow } from "./ToDragHeightArrow";
import { TutorialState } from "./TutorialState";


export class DragHeightArrowInstructions extends TutorialState {
  public completeDialogue(): TutorialState {
    return new ToDragHeightArrow(this.getUserState(), this.getGameState());
    
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}