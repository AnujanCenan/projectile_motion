import { JSX, useRef } from "react"
import "./CSS/LevelPlaySlider.css"
import { LevelNameDirectory } from "../../OOP/LevelNameDirectory"
interface LevelPlayerSliderProps {
  level: Level
  setLevelFocus: React.Dispatch<React.SetStateAction<Level | null>>
  setProjectileMotionPage: React.Dispatch<React.SetStateAction<JSX.Element>>
}
export default function LevelPlaySlider({level, setLevelFocus, setProjectileMotionPage}: LevelPlayerSliderProps) {
  const levelNameDirectoryRef = useRef(new LevelNameDirectory(setProjectileMotionPage));

  return (
    <>
      <div id="LevelPlaySlider_container">
        <div id="LevelPlaySlider_textContainer">
          <div id="LevelPlaySlider_title">{level.name}</div>
          <div className="flexBreak"/>
          <div id="LevelPlaySlider_blurb">{level.blurb}</div>
          <div className="flexBreak"/>
          <div id="LevelPlaySlider_description">{level.description?.map((line) => <>{line}<br/><br/></>)}</div>
          
          <div id="LevelPlaySlider_buttonContainer">
            <button 
              id="LevelPlaySlider_cancelButton"
              onClick={() => setLevelFocus(null)}
            >  
              Cancel
            </button>
            <button 
              id="LevelPlaySlider_playButton"
              onClick={() => setProjectileMotionPage(_ => levelNameDirectoryRef.current.getElement(level.name))}
            >
                Begin Mission
            </button>
          </div>

        </div>
      </div>
    </>
  )

}