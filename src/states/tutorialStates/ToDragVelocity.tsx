import { DraggedVelocity } from "./DraggedVelocity";
import { TutorialState } from "./TutorialState";

export class ToDragVelocity extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new DraggedVelocity(this.getUserState(), this.getGameState());
    } else {
      return this;
    }
    
  }
  private completedTaskHelper() {
    return this.getUserState() === "draggingVelocity" && this.getGameState()[1] >= 30;
  }
}