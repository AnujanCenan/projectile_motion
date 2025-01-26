import { PannedToTarget } from "./PannedToTarget";
import { TutorialState } from "./TutorialState";

export class ToPanToTarget extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new PannedToTarget(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
    } else {
      return this;
    }
  }

  public completedTaskHelper(): boolean {
    return  this.getGameState().current[3] === 1;
  }
}