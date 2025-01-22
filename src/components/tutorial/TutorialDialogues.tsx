import Dialogue from "../dialogue/Dialogue";

import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"
import { TutorialState } from "../../types/tutorialStates";

export class TutorialDialogues {

  setCompletedDialogue;
  constructor(setCompletedDialogue: Function) {
    this.setCompletedDialogue = setCompletedDialogue;
  }

  factory(currTutorialState: TutorialState) {
    console.log("In factory; currTutorialState = ", currTutorialState)

    if (currTutorialState === "Salutations") {
      return this.salutations();
    } else if (currTutorialState === "DraggingCannonInstructions") {
      console.log("Hit the correct branch")
      return this.dragCannonInstructions()
    } else if (currTutorialState === "ToDragCannon") {
      return null;
    } else if (currTutorialState === "DraggedVelocity") {
      return this.wellDone();
    } else if (currTutorialState === "DragHeightArrowInstructions") {
      return this.dragHeightArrowInstructions();
    } else if (currTutorialState === "ToDragHeightArrow") {
      return null;
    } else if (currTutorialState === "DraggedHeightArrow") {
      return this.wellDone();
    } else if (currTutorialState === "InputPanelInstructions") {
      return this.inputPanelInstructions();
    } else if (currTutorialState === "ToUseInputPanel") {
      return null;
    } else if (currTutorialState === "UsedInputPanel") {
      return this.wellDone();
    } else {
      return null;
    }
  }

  salutations() {

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
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[2, 0, 2, 0, 1]}
      setCompletedDialogue={this.setCompletedDialogue}
    />
  }

  dragCannonInstructions() {
    console.log("Returning dragCannonInstructions:")
    return <Dialogue
      name="General Paddy"
      speeches={[
        "It is important to be able to change the angle of your cannon. You can click and drag the cannon to raise and lower it.",
        "Try changing the angle so that it is greater than 50 degrees."
      ]}
      expressions={[
        GeneralPaddy_neutral
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletedDialogue={this.setCompletedDialogue}

    />
  }

  wellDone() {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "Well done.",
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0]}
      setCompletedDialogue={this.setCompletedDialogue}

    />
  }

  dragVelocityInstructions() {
    return <Dialogue 
      name="General Paddy"
      speeches={[
        "If you need to change the launch speed, you can draw the slider below the cannon.",
        "Try changing the velocity so that it is greater than 30 metres per second."
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletedDialogue={this.setCompletedDialogue}
    />
  }

  dragHeightArrowInstructions() { 
    return <Dialogue 
      name="General Paddy"
      speeches={[
        "Finally, to change the height of your cannon, you can drag the height arrow up and down",
        "Move the cannon at least a quarter of a way up"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0]}
      setCompletedDialogue={this.setCompletedDialogue}
    />
  }

  inputPanelInstructions() {
    return <Dialogue
      name="General Paddy"
      speeches={[
        "Alternatively, instead of clicking and dragging, you can use the input panel",
        "The input panel lets you provide more precise values for your angle, velocity and height",
        "Try using the input panel now to change velocity to 40 metres per second."
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[0, 0, 0]}
      setCompletedDialogue={this.setCompletedDialogue}
    />
  }




}
