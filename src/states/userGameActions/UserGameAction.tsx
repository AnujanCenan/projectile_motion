export abstract class UserGameAction {
  abstract onScroll(): UserGameAction;

  abstract requiresReDrawing(): boolean;
}