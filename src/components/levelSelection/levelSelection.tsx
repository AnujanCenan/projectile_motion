import { useState } from "react"
import "./CSS/LevelSelection.css"

import LevelPanel from "./LevelPanel"
import LevelPlaySlider from "./LevelPlaySlider";
interface LevelSelectionProps {
  levels: Level[]
}
export default function LevelSelection({levels}: LevelSelectionProps) {

  const [levelFocus, setLevelFocus] = useState<Level | null>(levels[1]);
  return (
    <>
      <div id="levelSelectionWrapper">
        <div id="levelSelectionContainer">
          {levels.map((l) => (<LevelPanel level={l} setLevelFocus={setLevelFocus}
            />))
          }
        </div>
        {levelFocus !== null && 
            <LevelPlaySlider level={levelFocus} setLevelFocus={setLevelFocus}/>
          }
      </div>
    </>
  )
}