import { JSX, useState } from "react"
import "./CSS/LevelSelector.css"

import LevelPanel from "./LevelPanel"
import LevelPlaySlider from "./LevelPlaySlider";
interface LevelSelectionProps {
  levels: Level[]
  setProjectileMotionPage: React.Dispatch<React.SetStateAction<JSX.Element>>

}
export default function LevelSelection({levels, setProjectileMotionPage}: LevelSelectionProps) {

  const [levelFocus, setLevelFocus] = useState<Level | null>(null);
  const [levelSelectionVisible, setLevelSelectionVisible] = useState<boolean>(true);


  return (
    <>
      <div id="levelSelectionWrapper">
        <button id="levelSelectionVisibility" onClick={() => setLevelSelectionVisible(b => !b)}>Toggle Visibility</button>
      
        { levelSelectionVisible && levelFocus === null &&
          <div id="levelSelectionContainer">
            <div id="levelSelect_Title"><span>Level Select</span></div>
            {levels.map((l) => (<LevelPanel level={l} setLevelFocus={setLevelFocus}
              />))
            }
          </div>
        }
        {
          levelSelectionVisible && levelFocus !== null && 
          <LevelPlaySlider 
            level={levelFocus} 
            setLevelFocus={setLevelFocus} setProjectileMotionPage={setProjectileMotionPage}
          />
        }
      </div>
    </>
  )
}