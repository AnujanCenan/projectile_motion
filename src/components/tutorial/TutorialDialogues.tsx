// import Dialogue from "../dialogue/Dialogue";

// import GeneralPaddy_neutral from "../../images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
// import GeneralPaddy_angry from "../../images/characters/GeneralPaddy/GeneralPaddy_angry.png"
// import GeneralPaddy_happy from "../../images/characters/GeneralPaddy/GeneralPaddy_happy.png"
// import { TutorialState } from "../../types/tutorialStates";

// export class TutorialDialogues {

//   setCompletedDialogue;
//   constructor(setCompletedDialogue: Function) {
//     this.setCompletedDialogue = setCompletedDialogue;
//   }

//   factory(currTutorialState: TutorialState) {


//     if (currTutorialState === "Salutations") {
//       return this.salutations();
//     } else if (currTutorialState === "DraggingCannonInstructions") {
//       return this.dragCannonInstructions()
//     } else if (currTutorialState === "ToDragCannon") {
//       return null;
//     } else if (currTutorialState === "DraggedVelocity") {
//       return this.wellDone();
//     } else if (currTutorialState === "DragHeightArrowInstructions") {
//       return this.dragHeightArrowInstructions();
//     } else if (currTutorialState === "ToDragHeightArrow") {
//       return null;
//     } else if (currTutorialState === "DraggedHeightArrow") {
//       return this.wellDone();
//     } else if (currTutorialState === "InputPanelInstructions") {
//       return this.inputPanelInstructions();
//     } else if (currTutorialState === "ToUseInputPanel") {
//       return null;
//     } else if (currTutorialState === "UsedInputPanel") {
//       return this.wellDone();
//     } else {
//       return null;
//     }
//   }

//   salutations() {

//     return <Dialogue
//       name="General Paddy"
//       speeches={[
//         "ATTENTION!",
//         "Seems like you're the newest recruit. I've heard good things from your current instructor.",
//         "Well, don't think I'll be so easy to impress. It's one thing to be able to perfom in the classroom.",
//         "It's a WHOLE other thing to be reliable on the battlefield.",
//         "So let's see what you've got, shall we?"
//       ]}
//       expressions={[
//         GeneralPaddy_neutral,
//         GeneralPaddy_happy,
//         GeneralPaddy_angry
//       ]} 
//       orderOfExpressions={[2, 0, 2, 0, 1]}
//       setCompletedDialogue={this.setCompletedDialogue}
//     />
//   }

//   dragCannonInstructions() {
//     return <Dialogue
//       name="General Paddy"
//       speeches={[
//         "It is important to be able to change the angle of your cannon. You can click and drag the cannon to raise and lower it.",
//         "Try changing the angle so that it is greater than 50 degrees."
//       ]}
//       expressions={[
//         GeneralPaddy_neutral
//       ]} 
//       orderOfExpressions={[0, 0, 0]}
//       setCompletedDialogue={this.setCompletedDialogue}

//     />
//   }

//   wellDone() {
//     return <Dialogue
//       name="General Paddy"
//       speeches={[
//         "Well done.",
//       ]}
//       expressions={[
//         GeneralPaddy_neutral,
//       ]} 
//       orderOfExpressions={[0]}
//       setCompletedDialogue={this.setCompletedDialogue}

//     />
//   }

//   dragVelocityInstructions() {
//     return <Dialogue 
//       name="General Paddy"
//       speeches={[
//         "If you need to change the launch speed, you can draw the slider below the cannon.",
//         "Try changing the velocity so that it is greater than 30 metres per second."
//       ]}
//       expressions={[
//         GeneralPaddy_neutral,
//       ]} 
//       orderOfExpressions={[0, 0]}
//       setCompletedDialogue={this.setCompletedDialogue}
//     />
//   }

//   dragHeightArrowInstructions() { 
//     return <Dialogue 
//       name="General Paddy"
//       speeches={[
//         "Finally, to change the height of your cannon, you can drag the height arrow up and down",
//         "Move the cannon at least a quarter of a way up"
//       ]}
//       expressions={[
//         GeneralPaddy_neutral,
//       ]} 
//       orderOfExpressions={[0, 0]}
//       setCompletedDialogue={this.setCompletedDialogue}
//     />
//   }

//   inputPanelInstructions() {
//     return <Dialogue
//       name="General Paddy"
//       speeches={[
//         "Alternatively, instead of clicking and dragging, you can use the input panel",
//         "The input panel lets you provide more precise values for your angle, velocity and height",
//         "Try using the input panel now to change velocity to 40 metres per second."
//       ]}
//       expressions={[
//         GeneralPaddy_neutral,
//       ]} 
//       orderOfExpressions={[0, 0, 0]}
//       setCompletedDialogue={this.setCompletedDialogue}
//     />
//   }

//   panToTargetInstructions() {
//     return <Dialogue 
//     name={"General Paddy"} 
//     speeches={[
//       "Your target can be seen by panning to the right.", 
//       "You can do this by scrolling or using the interactive map on the top left corner",
//       "Pan all the way to the end of the training ground"
//     ]} 
//     expressions={[GeneralPaddy_neutral]}
//     orderOfExpressions={[0, 0, 0]} 
//     setCompletedDialogue={this.setCompletedDialogue}    
      
//     />
//   }

//   fireAtTargetInstructions() {
//     return <Dialogue 
//       name={"General Paddy"} 
//       speeches={[
//         "Since this is just training, I will provide you with the values to hit the target",
//         "Try having your angle at 45 degrees, your velocity at 70 metres per second and your height at 0 metres",
//         "Then click the fire button."
//       ]} 
//       expressions={[GeneralPaddy_neutral]} 
//       orderOfExpressions={[0, 0, 0]} 
//       setCompletedDialogue={this.setCompletedDialogue}    
//     />
//   }

//   completedTutorial() {
//     return <>    
//       <Dialogue 
//         names={[
//           "General Paddy", "General Paddy",
//           "Unknown Agent",
//           "General Paddy", "General Paddy"
//         ]} 
//         speeches={[
//           // character is General Paddy
//           "Congratulations. You are now ready to carry out your duties as a projectile motion specialist.",
//           "You will be sent to our covert base of operations and you should receive your first mission in 2 to 4 weeks-",
//           // character is Unknown Agent
//           "General! We have reported sightings of Doctor Flame trying to steal your nan's naan",
//           // character is General Paddy
//           "Damnit!",
//           "Buckle up kid, looks like you're going to have to put your new skills to the test..."
//         ]} 
//         expressions={[GeneralPaddy_neutral, GeneralPaddy_angry, GeneralPaddy_happy]} 
//         orderOfExpressions={[0, 0, 2, 1, 0]} 
//         setCompletedDialogue={this.setCompletedDialogue}    
//       />
//     </>

//   }




// }
