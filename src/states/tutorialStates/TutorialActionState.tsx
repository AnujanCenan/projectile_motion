import { TutorialState } from "./TutorialState";

export abstract class TutorialActionState extends TutorialState {
  abstract getObjectives(): string[];
}