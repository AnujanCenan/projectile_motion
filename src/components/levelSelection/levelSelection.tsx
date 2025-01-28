import { useState } from "react"
import "./CSS/LevelSelection.css"
import LevelPanel from "./LevelPanel"
interface LevelSelectionProps {
  levels: Level[]
}
export default function LevelSelection({levels}: LevelSelectionProps) {

  const [levelFocus, setLevelFocus] = useState<Level | null>(null);
  
  return (
    <>
      <div id="levelSelectionWrapper">
        <div id="levelSelectionContainer">
          {levels.map((l) => (<LevelPanel level={l} setLevelFocus={setLevelFocus}
            />))
          }

        </div>
      </div>
    </>
  )
}