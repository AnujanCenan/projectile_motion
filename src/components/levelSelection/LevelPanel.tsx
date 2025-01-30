import "./CSS/LevelPanel.css"

interface LevelPanelProps {
  level: Level
  setLevelFocus: React.Dispatch<React.SetStateAction<Level | null>>
}
export default function LevelPanel({level, setLevelFocus}: LevelPanelProps) {
  return (
    <>
      <div 
        className="levelPanelContainer" 
        onClick={() => setLevelFocus(level)}
      >
        <span className="levelName">{level.name}</span>
        <span className="flexBreak" />
        <span className="levelBlurb">{level.blurb}</span>
        <span className="flexBreak" />
        <span className="completionStatus">{level.completionStatus ? "Complete" : "Incomplete"}</span>
      </div>

    </>
  )
}