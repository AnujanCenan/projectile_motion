import { Scrolling } from "./Scrolling";
import { UserGameAction } from "./UserGameAction";

export class LoadingImages extends UserGameAction {
  onScroll(): UserGameAction {
    return new Scrolling()
  }
  requiresReDrawing(): boolean {
      return true;
  }

}