import { UserGameAction } from "./UserGameAction";

export class ReadingDialogue extends UserGameAction {
    onScroll(): UserGameAction {
        return this;
    }
    requiresReDrawing(): boolean {
        return false;
    }
}