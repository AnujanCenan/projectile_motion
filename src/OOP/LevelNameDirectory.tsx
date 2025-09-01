import { JSX, SetStateAction } from "react";
import Tutorial from "../components/tutorial/Tutorial";

export class LevelNameDirectory {
  private setProjectileMotionPage;
  constructor(setProjectileMotionPage: React.Dispatch<SetStateAction<JSX.Element>>) {
    this.setProjectileMotionPage = setProjectileMotionPage;
  }
  // Factory which builds a level using a switch case statement
  // Chooses which level to build based on the input levelName string
  getElement(levelName: string): JSX.Element {
    switch (levelName) {
      case "Tutorial":
        return <Tutorial setProjectileMotionPage={this.setProjectileMotionPage}/>
      default:
        throw new Error(
          `Error thrown in class LevelNameDirectory - 
          it seems the level name ${levelName} is not in 
          the switch statement for the getElement method`
        )
    }
  }
}