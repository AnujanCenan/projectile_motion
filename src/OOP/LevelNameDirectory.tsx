import { JSX, SetStateAction } from "react";
import Tutorial from "../components/tutorial/Tutorial";

export class LevelNameDirectory {
  getElement(levelName: string): JSX.Element {
    switch (levelName) {
      case "Tutorial":
        return <Tutorial/>
      default:
        throw new Error(
          `Error thrown in class LevelNameDirectory - 
          it seems the level name ${levelName} is not in 
          the switch statement for the getElement method`
        )
    }
  }
}