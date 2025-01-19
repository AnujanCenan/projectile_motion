import "./CSS/FireButton.css"

interface FireButtonProps {
  fireCannon: Function
}
export default function FireButton({fireCannon}: FireButtonProps) {
  return (
    <button id="fireButton" onClick={() => fireCannon()}>
      Fire
    </button>
  )
}