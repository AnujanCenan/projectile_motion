import { DraggedHeightArrow } from "./DraggedHeightArrow";
import { TutorialState } from "./TutorialState";

export class ToDragHeightArrow extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {

      return new DraggedHeightArrow(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue())
    } else {
      return this;
    }
  }

  public completedTaskHelper() {
    return this.getUserState().current === "draggingHeightArrow" &&  this.getGameState().current[2] <= 0.625;
  }
}