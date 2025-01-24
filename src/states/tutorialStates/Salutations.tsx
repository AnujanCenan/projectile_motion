import DraggingCannonInstructions from "./DraggingCannonInstructions";
import { TutorialState } from "./TutorialState";

export class Salutations extends TutorialState {

  public completeDialogue(): TutorialState {
    return new DraggingCannonInstructions(this.getUserState(), this.getGameState());
  }

  public checkIfCompletedTask(): TutorialState {
    return this;
  }

  
}