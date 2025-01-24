import { TutorialState } from "./TutorialState";

export class PanToTargetInstructions implements TutorialState {
  completeDialogue(): TutorialState {
    throw new Error("Method not implemented.");
  }
  completedTask(): TutorialState {
    throw new Error("Method not implemented.");
  }
}