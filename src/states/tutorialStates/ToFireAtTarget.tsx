import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar";
import { Firing } from "../userGameActions/Firing";
import { FiredAtTarget } from "./FiredAtTarget";
import { TutorialActionState } from "./TutorialActionState";
import { TutorialState } from "./TutorialState";

export class ToFireAtTarget extends TutorialActionState {
  getObjectives(): string[] {
    return [
      "Set angle to 45 degrees",
      "Set velocity to 70 m/s",
      "Set height to 0 m",
      "Click the fire button"
    ]
  }
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

  public completedTaskHelper() {
    const gameState = this.getGameState();
    const userState = this.getUserState();
    return (
      userState.current instanceof Firing && 
      gameState.current.angle === 45 && 
      gameState.current.velocity === 70 && 
      gameState.current.yPosScalar === GROUND_LEVEL_SCALAR
    )
  }
}