import { FiredAtTarget } from "./FiredAtTarget";
import { TutorialState } from "./TutorialState";

export class ToFireAtTarget extends TutorialState {
  public completeDialogue(): TutorialState {
    return this;
  }
  
  public checkIfCompletedTask(): TutorialState {
    if (this.completedTaskHelper()) {
      return new FiredAtTarget(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
    } else {
      return this;
    }
  }

  private completedTaskHelper() {
    const gameState = this.getGameState();
    const userState = this.getUserState();
    return (
      userState === "idle" && 
      gameState[0] === 45 && 
      gameState[1] === 70 && 
      gameState[2] === 0.8
    )
  }
}