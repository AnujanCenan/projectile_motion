import { CompletedTutorial } from "./CompletedTutorial";
import { TutorialState } from "./TutorialState";

export class Conclusion extends TutorialState {
  completeDialogue(): TutorialState {
    return new CompletedTutorial(this.getUserState(), this.getGameState());
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  } 
}