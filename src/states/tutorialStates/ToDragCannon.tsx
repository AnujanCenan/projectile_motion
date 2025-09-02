import { DraggingCannon } from "../userGameActions/DraggingCannon";
import { DraggedCannon } from "./DraggedCannon";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";

export class ToDragCannon extends TutorialActionState {
  
  getObjectives(): string[] {
    return [
      "Click on cannon and drag it so that it is greater than 50 degrees"
    ]
  }
  
  public completeDialogue(): TutorialState {
    return this;
  }
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new DraggedCannon(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
    } else {
      return this;
    }
  }

  public completedTaskHelper(): boolean {
    return (
      this.getUserState().current instanceof DraggingCannon && 
      this.getGameState().current.angle >= 50.5
    );
  }

}