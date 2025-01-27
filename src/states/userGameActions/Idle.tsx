import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction"

export class Idle extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling();
  }
  requiresReDrawing(): boolean {
    return false;
  }

}