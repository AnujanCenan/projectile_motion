import "./CSS/CurrObjective.css"
interface CurrObjectiveProps {
  currObjectives?: string[]
}
export default function CurrObjective({currObjectives}: CurrObjectiveProps) {
  return (
    <>
      <div id="currObjectiveContainer">
        <span>Helpful Hints</span>
        {currObjectives?.map((objective, i) => <li key={i}>{objective}</li>)}
        {/* <span>{currObjectives}</span> */}
      </div>
    </>
  )
}