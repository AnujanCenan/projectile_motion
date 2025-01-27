import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class InputPanelVelocity extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling();
  }
  requiresReDrawing(): boolean {
    return true;
  }

}