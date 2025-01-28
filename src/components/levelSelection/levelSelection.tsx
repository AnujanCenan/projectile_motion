import { useState } from "react"
import "./CSS/LevelSelection.css"
import LevelPanel from "./LevelPanel"
interface LevelSelectionProps {
  levels: string[]
}
export default function LevelSelection({levels}: LevelSelectionProps) {

  const [levelFocus, setLevelFocus] = useState(null);
  
  return (
    <>
      <div id="levelSelectionWrapper">
        <div id="levelSelectionContainer">
          {levels.map((l) => (<LevelPanel name={l} 
            description={"Meet Dr Flame"} 
            completionStatus={false}/>))}

        </div>
      </div>
    
    </>
  )
}