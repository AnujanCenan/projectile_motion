import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar";
import { DraggingHeightArrow } from "../userGameActions/DraggingHeightArrow";
import { DraggedHeightArrow } from "./DraggedHeightArrow";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";

export class ToDragHeightArrow extends TutorialActionState {
  getObjectives(): string[] {
    return ["Drag height arrow off the ground"]
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
      this.getGameState().current.yPosScalar <= GROUND_LEVEL_SCALAR - 0.03
    );
  }
}