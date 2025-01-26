import { RefObject } from "react";

export abstract class TutorialState {
  private userState;
  private gameState;
  private setCompletedDialogue;
  constructor(
    userState: RefObject<UserState>, 
    gameState: RefObject<GameState>,
     setCompletedDialgoue: React.Dispatch<React.SetStateAction<boolean>>
  ) {
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

  public getSetCompletedDialogue(): React.Dispatch<React.SetStateAction<boolean>> {
    return this.setCompletedDialogue;
  }

  abstract completeDialogue(): TutorialState;
  abstract checkIfCompletedTask(): TutorialState
}