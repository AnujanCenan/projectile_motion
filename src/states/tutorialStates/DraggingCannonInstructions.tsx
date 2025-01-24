import { ToDragCannon } from "./ToDragCannon";
import { TutorialState } from "./TutorialState";


export default class DraggingCannonInstructions implements TutorialState {
  public completedTask(): TutorialState {
    return this;
  }
  public completeDialogue(): TutorialState {
    return new ToDragCannon();
  }
    
}