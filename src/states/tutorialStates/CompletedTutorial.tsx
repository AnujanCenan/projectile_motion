import { TutorialState } from "./TutorialState";

export class CompletedTutorial extends TutorialState {
  completeDialogue(): TutorialState {
    return this;
  }
  checkIfCompletedTask(): TutorialState {
    return this;
  }
}