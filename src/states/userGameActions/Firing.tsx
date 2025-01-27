import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class Firing extends UserGameAction {
  onScroll(): UserGameAction {
    return this;
  }
  requiresReDrawing(): boolean {
    return false;
  }
}