import "./CSS/LevelPlaySlider.css"
interface LevelPlayerSliderProps {
  level: Level
  setLevelFocus: React.Dispatch<React.SetStateAction<Level | null>>

}
export default function LevelPlaySlider({level, setLevelFocus}: LevelPlayerSliderProps) {
  return (
    <>
      <div id="LevelPlaySlider_container">
        <div id="LevelPlaySlider_textContainer" onClick={() => setLevelFocus(null)}>
          <div id="LevelPlaySlider_title">{level.name}</div>
          <div className="flexBreak"/>
          <div id="LevelPlaySlider_blurb">{level.blurb}</div>
          <div className="flexBreak"/>
          <div id="LevelPlaySlider_description">{level.description?.map((line) => <>{line}<br/><br/></>)}</div>
          
          <div id="LevelPlaySlider_buttonContainer">
            <button id="LevelPlaySlider_cancelButton">Cancel</button>
            <button id="LevelPlaySlider_playButton">Begin Mission</button>
          </div>

        </div>
      </div>
    </>
  )

}