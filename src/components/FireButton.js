import "./CSS/FireButton.css"

export default function FireButton({fireCannon}) {
  return (
    <button id="fireButton" onClick={() => fireCannon()}>
      Fire
    </button>
  )
}