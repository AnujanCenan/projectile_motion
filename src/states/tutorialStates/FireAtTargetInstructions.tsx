import { ToFireAtTarget } from "./ToFireAtTarget";
import { TutorialState } from "./TutorialState";


export class FireAtTargetInstructions extends TutorialState {
  public completeDialogue(): TutorialState {
    return new ToFireAtTarget(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}