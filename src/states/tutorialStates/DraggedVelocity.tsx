import { TutorialState } from "./tutorialState";

export class DraggedVelocity implements TutorialState {
  completeDialogue(): TutorialState {
    throw new Error("Method not implemented.");
  }
  completedTask(): TutorialState {
    throw new Error("Method not implemented.");
  }
}