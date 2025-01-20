import { useEffect, useRef, useState } from "react"
import "./CSS/Dialogue.css"

interface DialogueProps {
  name: string;
  speeches: string[];
  expressions: string[];
  orderOfExpressions: number[];
}
export default function Dialogue({name, speeches, expressions, orderOfExpressions}: DialogueProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(new Image);

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const [currSpeechIndex, setCurrSpeechIndex] = useState(0);
  

  function continueDialogue() {
    if (!speechRef.current || !containerRef.current) return
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
    function typewriter(speech: string) {
      var speed = 30;
      writeCharacter();
      function writeCharacter() {
        if (!speechRef.current) {
          return
        };

        if (i < speech.length) {
          speechRef.current.innerHTML += speech.charAt(i);
          i++;
          timeoutRef.current = setTimeout(writeCharacter, speed);
        }
      }
    }

    if (profilePicRef.current) {
      profilePicRef.current.src = expressions[orderOfExpressions[currSpeechIndex]]
      
      
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