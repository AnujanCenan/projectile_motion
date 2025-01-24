import { Conclusion } from "./Conclusion";
import { TutorialState } from "./TutorialState";

export class FiredAtTarget extends TutorialState {
  public completeDialogue(): TutorialState {
    return new Conclusion(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}