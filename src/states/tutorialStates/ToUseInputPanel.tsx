import { InputPanelVelocity } from "../userGameActions/InputPanelVelocity";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";
import { UsedInputPanel } from "./UsedInputPanel";

export class ToUseInputPanel extends TutorialActionState {
  getObjectives(): string[] {
    return ["Set velocity to 40 m/s using the input panel"]
  }
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
      this.getGameState().current.velocity === 40
    );
  }
}