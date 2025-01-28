import { JSX, useState } from "react"
import "./CSS/LevelSelection.css"

import LevelPanel from "./LevelPanel"
import LevelPlaySlider from "./LevelPlaySlider";
interface LevelSelectionProps {
  levels: Level[]
  setProjectileMotionPage: React.Dispatch<React.SetStateAction<JSX.Element>>

}
export default function LevelSelection({levels, setProjectileMotionPage}: LevelSelectionProps) {

  const [levelFocus, setLevelFocus] = useState<Level | null>(levels[1]);
  return (
    <>
      <div id="levelSelectionWrapper">
        { levelFocus === null &&
          <div id="levelSelectionContainer">
            <div id="levelSelect_Title"><span>Level Select</span></div>
            {levels.map((l) => (<LevelPanel level={l} setLevelFocus={setLevelFocus}
              />))
            }
          </div>
        }
        {
          levelFocus !== null && 
          <LevelPlaySlider 
            level={levelFocus} 
            setLevelFocus={setLevelFocus} setProjectileMotionPage={setProjectileMotionPage}
          />
        }
      </div>
    </>
  )
}