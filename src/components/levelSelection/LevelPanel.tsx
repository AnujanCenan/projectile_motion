import "./CSS/LevelPanel.css"

interface LevelPanelProps {
  name: string;
  description: string;
  completionStatus: boolean;
}
export default function LevelPanel({name, description, completionStatus}: LevelPanelProps) {
  return (
    <>
      <div className="levelPanelContainer">
        <div className="levelName">{name}</div>
        <div className="flexBreak" />
        <div className="levelDescription">{description}</div>
        <div className="flexBreak" />
        <div className="completionStatus">{completionStatus ? "Complete" : "Incomplete"}</div>
      </div>

    </>
  )
}