import { JSX, RefObject, SetStateAction, useState } from "react"
import "./CSS/pauseButton.css"
import pause from "../../images/pause.png"
import PauseMenu from "./PauseMenu";
import { UserGameAction } from "../../states/userGameActions/UserGameAction";
interface PauseButtonProps {
  startingLevelState: any;
  setLevelState: Function;
  setProjectileMotionPage: React.Dispatch<React.SetStateAction<JSX.Element>>;
  userGameActionRef: RefObject<UserGameAction>
}

export default function PauseButton({startingLevelState, setLevelState, setProjectileMotionPage, userGameActionRef}: PauseButtonProps) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      {
        paused && 
        <PauseMenu 
          setProjectileMotionPage={setProjectileMotionPage} 
          setPaused={setPaused} 
          setLevelState={setLevelState} 
          levelState={startingLevelState} 
          userGameActionRef={userGameActionRef}
        />
      }
      <div id="pauseButtonContainer" onClick={() => setPaused(p => !p)}>
        <img id="pauseImg" src={pause} alt="pause"/>
      </div>
    </>
  )
}

