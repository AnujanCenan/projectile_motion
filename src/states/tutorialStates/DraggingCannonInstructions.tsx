import { ToDragCannon } from "./ToDragCannon";
import { TutorialState } from "./TutorialState";


export default class DraggingCannonInstructions extends TutorialState {
  
  public completeDialogue(): TutorialState {
    return new ToDragCannon(this.getUserState(), this.getGameState());
  }
  
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

    
}