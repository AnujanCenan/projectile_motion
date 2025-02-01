import "./CSS/PauseMenu.css"

import play from "../../images/play.png"
import home from "../../images/home.png"
import restart from "../../images/restart.png"
import { JSX, RefObject, SetStateAction } from "react"
import LevelSelection from "../levelSelection/LevelSelector"
import levels from "../levelSelection/levels.json"
import { GROUND_LEVEL_SCALAR } from "../../globalConstants/groundLevelScalar"
import Tutorial from "../tutorial/Tutorial"
import { UserGameAction } from "../../states/userGameActions/UserGameAction"
import { Restarting } from "../../states/userGameActions/Restarting"
interface PauseMenuProps {
  setProjectileMotionPage: React.Dispatch<React.SetStateAction<JSX.Element>>
  setPaused: React.Dispatch<React.SetStateAction<boolean>>
  setLevelState: Function;
  levelState: any;
  userGameActionRef: RefObject<UserGameAction>

}
export default function PauseMenu({setProjectileMotionPage, setPaused, setLevelState, levelState, userGameActionRef}: PauseMenuProps) {
  return (
    <>
      <div id="pauseMenuWrapper">
        <div id="pauseMenuContainer">
          <div id="buttonsContainer">
            <button id="PauseMenu_Home" onClick={() => setProjectileMotionPage(<LevelSelection levels={levels.levels} setProjectileMotionPage={setProjectileMotionPage} />)}> 
              <img src={home} alt="home"/>
            </button>

            <button id="PauseMenu_Play" onClick={() => setPaused(false)}>
              <img src={play} alt="play"/>
            </button>

            <button id="PauseMenu_Restart" onClick={() => {
              setLevelState(levelState);
              setPaused(false);
              userGameActionRef.current = new Restarting();

              // set user action to restarting
            }}>
              <img src={restart} alt="restart"/>
            </button>

          </div>
        </div>
      </div>
    </>
  )
}