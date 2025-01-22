import { useEffect, useRef, useState } from "react"
import "./CSS/Dialogue.css"

interface DialogueProps {
  name: string;
  speeches: string[];
  expressions: string[];
  orderOfExpressions: number[];
  setCompletionVariable: Function|null
}
export default function Dialogue({
  name, 
  speeches, 
  expressions, 
  orderOfExpressions,
  setCompletionVariable

}: DialogueProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(new Image());

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const [currSpeechIndex, setCurrSpeechIndex] = useState(0);
  

  function continueDialogue() {
    if (!speechRef.current || !containerRef.current) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    speechRef.current.innerHTML = "";
    if (currSpeechIndex + 1 === speeches.length) {
      containerRef.current.style.visibility = "hidden";
    } 
    setCurrSpeechIndex(currSpeechIndex + 1);
    
  }
  
  var c = 0;
  useEffect(() => { 
    function typewriter(speech: string) {
      var speed = 20;
      writeCharacter();
      function writeCharacter() {
        if (!speechRef.current) {
          return
        };

        if (c < speech.length) {
          speechRef.current.innerHTML += speech.charAt(c);
          c++;
          timeoutRef.current = setTimeout(writeCharacter, speed);
        }
      }
    }

    if (currSpeechIndex === speeches.length) return;
    if (profilePicRef.current) {
      profilePicRef.current.src = expressions[orderOfExpressions[currSpeechIndex]]
      typewriter(speeches[currSpeechIndex]);
    } 
  }, [currSpeechIndex])
  

  useEffect(() => {
    console.log(`currSpeech Index = ${currSpeechIndex}; speeches.length = ${speeches.length}`)
    if (setCompletionVariable !== null && currSpeechIndex === speeches.length) {
      console.log("Jimmy jim junior")
      setCompletionVariable(true);
    }
  })
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