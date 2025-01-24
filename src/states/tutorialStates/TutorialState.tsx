export abstract class TutorialState {
  private userState;
  private gameState;
  private setCompletedDialogue;
  constructor(userState: UserState, gameState: GameState, setCompletedDialgoue: Function) {
    this.userState = userState;
    this.gameState = gameState;
    this.setCompletedDialogue = setCompletedDialgoue;
  }
  
  /// getters
  public getUserState(): UserState {
    return this.userState;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public getSetCompletedDialogue(): Function {
    return this.setCompletedDialogue;
  }

  abstract completeDialogue(): TutorialState;
  abstract checkIfCompletedTask(): TutorialState
}