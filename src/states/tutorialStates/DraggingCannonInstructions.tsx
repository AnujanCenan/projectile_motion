import { ToDragCannon } from "./ToDragCannon";
import { TutorialState } from "./tutorialState";

export default class DraggingCannonInstructions implements TutorialState {
  public completedTask(): TutorialState {
    return this;
  }
  public completeDialogue(): TutorialState {
    return new ToDragCannon();
  }
    
}