import { ToDragVelocity } from "./ToDragVelocity";
import { TutorialState } from "./TutorialState";


export class DraggingVelocityInstructions extends TutorialState {
  public completeDialogue(): TutorialState {
    return new ToDragVelocity(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }
}