import { PanToTargetInstructions } from "./PanToTargetInstructions";
import { TutorialState } from "./TutorialState";

export class UsedInputPanel extends TutorialState {
  public completeDialogue(): TutorialState {
    return new PanToTargetInstructions(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}