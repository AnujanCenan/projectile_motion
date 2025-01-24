import { RefObject } from "react";

export abstract class TutorialState {
  private userState;
  private gameState;
  private setCompletedDialogue;
  constructor(userState: RefObject<UserState>, gameState: RefObject<GameState>, setCompletedDialgoue: Function) {
    this.userState = userState;
    this.gameState = gameState;
    this.setCompletedDialogue = setCompletedDialgoue;
  }
  
  /// getters
  public getUserState(): RefObject<UserState> {
    return this.userState;
  }

  public getGameState(): RefObject<GameState> {
    return this.gameState;
  }

  public getSetCompletedDialogue(): Function {
    return this.setCompletedDialogue;
  }

  abstract completeDialogue(): TutorialState;
  abstract checkIfCompletedTask(): TutorialState
}