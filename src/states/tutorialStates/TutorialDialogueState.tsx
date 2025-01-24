import { JSX } from "react";
import { TutorialState } from "./TutorialState";

export abstract class TutorialDialogueState extends TutorialState {
  abstract getDialogue(): JSX.Element;
}