import DraggingCannonInstructions from "./DraggingCannonInstructions";
import { TutorialState } from "./tutorialState";

export class Salutations implements TutorialState {

  public completeDialogue(): TutorialState {
    return new DraggingCannonInstructions();
  }

  public completedTask(): TutorialState {
    return this;
  }

  
}