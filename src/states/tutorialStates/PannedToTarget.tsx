import { FireAtTargetInstructions } from "./FireAtTargetInstructions";
import { TutorialState } from "./TutorialState";

export class PannedToTarget extends TutorialState {
  public completeDialogue(): TutorialState {
    return new FireAtTargetInstructions(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}