import "./CSS/LevelPlaySlider.css"
interface LevelPlayerSliderProps {
  level: Level
  setLevelFocus: React.Dispatch<React.SetStateAction<Level | null>>

}
export default function LevelPlaySlider({level, setLevelFocus}: LevelPlayerSliderProps) {
  return (
    <>
      <div id="LevelPlaySlider_container" onClick={() => setLevelFocus(null)}>
        <div id="LevelPlaySlider_title">{level.name}</div>
        <div className="flexBreak"/>
        <div id="LevelPlaySlider_blurb">{level.blurb}</div>
        <div className="flexBreak"/>
        <div id="LevelPlaySlider_description">{level.description}</div>
        <button id="LevelPlaySlider_cancelButton">Cancel</button>
        <button id="LevelPlaySlider_playButton">Begin Mission</button>
      </div>
    </>
  )

}