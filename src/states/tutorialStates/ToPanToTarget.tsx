import { PannedToTarget } from "./PannedToTarget";
import { TutorialState } from "./TutorialState";

export class ToPanToTarget extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new PannedToTarget(this.getUserState(), this.getGameState());
    } else {
      return this;
    }
  }

  private completedTaskHelper(): boolean {
    return this.getGameState()[3] === 1;
  }
}