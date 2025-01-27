import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class InputPanelHeight extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling();
  }
  requiresReDrawing(): boolean {
    return true;
  }

}