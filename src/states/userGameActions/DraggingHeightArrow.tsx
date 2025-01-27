import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class DraggingHeightArrow extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling();
  }
  requiresReDrawing(): boolean {
    return true;
  }

}