import { DraggingVelocity } from "../userGameActions/DraggingVelocity";
import { DraggedVelocity } from "./DraggedVelocity";
import { TutorialState } from "./TutorialState";

export class ToDragVelocity extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new DraggedVelocity(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
    } else {
      return this;
    }
    
  }
  public completedTaskHelper() {
    return (
      this.getUserState().current instanceof DraggingVelocity && 
      this.getGameState().current[1] >= 30
    );
  }
}