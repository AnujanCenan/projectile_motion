import { DraggingHeightArrow } from "../userGameActions/DraggingHeightArrow";
import { DraggedHeightArrow } from "./DraggedHeightArrow";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";

export class ToDragHeightArrow extends TutorialActionState {
  getObjectives(): string[] {
    return ["Drag height arrow a quarter of the way up"]
  }
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
    return (
      this.getUserState().current instanceof DraggingHeightArrow && 
      this.getGameState().current.yPosScalar <= 0.625
    );
  }
}