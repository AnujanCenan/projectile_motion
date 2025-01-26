import { TutorialState } from "./TutorialState";

export class CompletedTutorial extends TutorialState {
  completeDialogue(): TutorialState {
    throw new Error("Method not implemented.");
  }
  checkIfCompletedTask(): TutorialState {
    throw new Error("Method not implemented.");
  }
}