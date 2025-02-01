import "./CSS/CurrObjective.css"
interface CurrObjectiveProps {
  currObjectives: string[]
}
export default function CurrObjective({currObjectives}: CurrObjectiveProps) {
  return (
    <>
      <div id="currObjectiveContainer">
        <span id="currObjective_Title">Helpful Hints</span>
        <ul>
          {currObjectives.map((objective, i) => <li key={i}>{objective}</li>)}
        </ul>
      </div>
    </>
  )
}