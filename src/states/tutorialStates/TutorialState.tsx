export interface TutorialState {
  completeDialogue(): TutorialState;
  completedTask(): TutorialState
}