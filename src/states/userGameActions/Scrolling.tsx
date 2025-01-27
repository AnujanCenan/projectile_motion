import { UserGameAction } from "./UserGameAction";

export class Scrolling extends UserGameAction {
  onScroll(): UserGameAction {
    return this;
  }
  requiresReDrawing(): boolean {
    return false;
  }

}