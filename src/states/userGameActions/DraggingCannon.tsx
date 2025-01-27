import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class DraggingCannon extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling();
  }
  requiresReDrawing(): boolean {
    return true;
  }
}