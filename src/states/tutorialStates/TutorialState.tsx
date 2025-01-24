export abstract class TutorialState {
  private userState;
  private gameState;
  constructor(userState: UserState, gameState: GameState) {
    this.userState = userState;
    this.gameState = gameState;
  }
  
  /// getters
  public getUserState(): UserState {
    return this.userState;
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  abstract completeDialogue(): TutorialState;
  abstract checkIfCompletedTask(): TutorialState
}