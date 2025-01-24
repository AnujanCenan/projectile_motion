import { DraggingVelocityInstructions } from "./DraggingVelocityInstructions";
import { TutorialState } from "./TutorialState";


export class DraggedCannon extends TutorialState {

  constructor(userState: UserState, gameState: GameState) {
    super(userState, gameState);
  }
  
  completeDialogue(): TutorialState {
    return new DraggingVelocityInstructions(this.getUserState(), this.getGameState());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }

}