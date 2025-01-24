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

  private completedTaskHelper() {
    return this.getUserState() === "draggingHeightArrow" && this.getGameState()[2] <= 0.625;
  }
}