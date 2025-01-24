import { TutorialState } from "./tutorialState";

export class ToDragHeightArrow implements TutorialState {
  completeDialogue(): TutorialState {
    throw new Error("Method not implemented.");
  }
  completedTask(): TutorialState {
    throw new Error("Method not implemented.");
  }
}