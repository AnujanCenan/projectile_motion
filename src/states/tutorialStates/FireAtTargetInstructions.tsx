import { TutorialState } from "./tutorialState";

export class FireAtTargetInstructions implements TutorialState {
  completeDialogue(): TutorialState {
    throw new Error("Method not implemented.");
  }
  completedTask(): TutorialState {
    throw new Error("Method not implemented.");
  }

}