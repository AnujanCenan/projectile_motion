import { useEffect, useRef, useState } from "react"
import "./CSS/Dialogue.css"

export default function Dialogue({name, speeches, expressions, orderOfExpressions}) {

  const containerRef = useRef(null);
  const speechRef = useRef(null);
  const profilePicRef = useRef(null);

  const timeoutRef = useRef(null);

  const [currSpeechIndex, setCurrSpeechIndex] = useState(0);
  

  function continueDialogue() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    speechRef.current.innerHTML = "";
    if (currSpeechIndex + 1 === speeches.length) {
      setCurrSpeechIndex(0);
      containerRef.current.style.visibility = "hidden";
    } else {
      setCurrSpeechIndex(currSpeechIndex + 1);
    }
  }
  
  var i = 0;
  useEffect(() => {  
    function typewriter(speech) {
      var speed = 30;
      writeCharacter();
      function writeCharacter() {
        if (i < speech.length) {
          speechRef.current.innerHTML += speech.charAt(i);
          i++;
          timeoutRef.current = setTimeout(writeCharacter, speed);
        }
      }
    }

    if (speechRef) {
      profilePicRef.current.src = expressions[orderOfExpressions[currSpeechIndex]]
      console.log(profilePicRef.current.style)
      console.log(expressions[orderOfExpressions[currSpeechIndex]])
      typewriter(speeches[currSpeechIndex]);
    } 
  }, [currSpeechIndex, speeches, i, expressions, orderOfExpressions])
  
  return (
    <div ref={containerRef} id="dialogue_container">
      <div id="dialouge_profile_pic">
        <img ref={profilePicRef} alt="character expression"/>
        <span>{name}</span>
      </div>
      <div ref={speechRef} id="dialogue_speech"></div>
      <div id="dialogue_button_container">
        <button 
          onClick={() => continueDialogue()}
          id="dialogue_continue_button"
        >
          <b>CONTINUE</b>
        </button>
      </div>

    </div>
  )
}