import { DraggingVelocity } from "../userGameActions/DraggingVelocity";
import { DraggedVelocity } from "./DraggedVelocity";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";

export class ToDragVelocity extends TutorialActionState {
  getObjectives(): string[] {
    return ["Drag velocity slider to greater than 30 m/s"]
  }
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
      this.getGameState().current.velocity >= 30.5
    );
  }
}