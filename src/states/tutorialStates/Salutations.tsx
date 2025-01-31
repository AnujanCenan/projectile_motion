import { JSX } from "react";
import { TutorialDialogueState } from "./TutorialDialogueState";

import DraggingCannonInstructions from "./DraggingCannonInstructions";
import { TutorialState } from "./TutorialState";
import Dialogue from "../../components/dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"

export class Salutations extends TutorialDialogueState {
  
  getDialogue(): JSX.Element {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "ATTENTION!",
        "Seems like you're the newest recruit. I've heard good things from your current instructor.",
        "Well, don't think I'll be so easy to impress. It's one thing to be able to perfom in the classroom.",
        "It's a WHOLE other thing to be reliable on the battlefield.",
        "So let's see what you've got, shall we?"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[1, 0, 1, 0, 0]}
      setCompletedDialogue={this.getSetCompletedDialogue()}
    />
  }

  public completeDialogue(): TutorialState {
    return new DraggingCannonInstructions(this.getUserState(), this.getGameState(), this.getSetCompletedDialogue());
  }

  public checkIfCompletedTask(): TutorialState {
    return this;
  }

  
}