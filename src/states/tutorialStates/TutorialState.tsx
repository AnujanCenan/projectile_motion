import { RefObject } from "react";
import { UserGameAction } from "../userGameActions/UserGameAction";

export abstract class TutorialState {
  private userState;
  private gameState;
  private setCompletedDialogue;
  constructor(
    userGameAction: RefObject<UserGameAction>, 
    gameState: RefObject<GameState>,
     setCompletedDialgoue: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.userState = userGameAction;
    this.gameState = gameState;
    this.setCompletedDialogue = setCompletedDialgoue;
  }
  
  /// getters
  public getUserState(): RefObject<UserGameAction> {
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