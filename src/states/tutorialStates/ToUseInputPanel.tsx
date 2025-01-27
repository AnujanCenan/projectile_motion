import { InputPanelVelocity } from "../userGameActions/InputPanelVelocity";
import { TutorialState } from "./TutorialState";
import { UsedInputPanel } from "./UsedInputPanel";

export class ToUseInputPanel extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new UsedInputPanel(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
    } else {
      return this;
    }
  }

  public completedTaskHelper() {
    return (
      this.getUserState().current instanceof InputPanelVelocity && 
      this.getGameState().current[1] === 40
    );
  }
}