import { ToUseInputPanel } from "./ToUseInputPanel";
import { TutorialState } from "./TutorialState";

export class InputPanelInstructions extends TutorialState {
  public completeDialogue(): TutorialState {
    return new ToUseInputPanel(this.getUserState(), this.getGameState());
  }
  public checkIfCompletedTask(): TutorialState {
    return this;
  }

}