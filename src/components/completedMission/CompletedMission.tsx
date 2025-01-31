import "./CSS/CompletedMission.css"
import checkmark from "../../images/checkMark.png"
import { JSX, SetStateAction } from "react"
import LevelSelection from "../levelSelection/LevelSelector"

import levels from "../levelSelection/levels.json"
interface CompletedMissionProps {
  setProjectileMotionPage: React.Dispatch<SetStateAction<JSX.Element>>
}
export default function CompletedMission({setProjectileMotionPage}: CompletedMissionProps) {
  return (
    <div id="completedMissionWrapper">
    <div id="completedMissionContainer">
      <span id="CompletedMission_MissionCompleteText">Mission Complete</span>
      <div className="flexBreak"/>
      <img id="checkmark" alt="checkmark" src={checkmark} />
      <div className="flexBreak"/>
      <button 
        id="completedMission_BackToHome"
        onClick={() => setProjectileMotionPage(<LevelSelection levels={levels.levels} setProjectileMotionPage={setProjectileMotionPage} />)}
      >
          Back to Level Select
      </button>
    </div>
    </div>

  )
}