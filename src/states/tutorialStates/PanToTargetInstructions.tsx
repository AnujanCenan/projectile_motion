import { ToPanToTarget } from "./ToPanToTarget";
import { TutorialState } from "./TutorialState";

export class PanToTargetInstructions extends TutorialState {
  public completeDialogue(): TutorialState {
    return new ToPanToTarget(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}