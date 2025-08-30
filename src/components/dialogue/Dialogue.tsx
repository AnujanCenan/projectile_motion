import { useEffect, useRef, useState } from "react"
import "./CSS/Dialogue.css"

interface DialogueProps {
  name?: string;
  names?: string[];
  speeches: string[];
  expressions: string[];
  orderOfExpressions: number[];
  setCompletedDialogue: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Dialogue({
  name,
  names,
  speeches, 
  expressions, 
  orderOfExpressions,
  setCompletedDialogue

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
      const wrapper = containerRef.current.parentElement as HTMLDivElement;
      wrapper.style.visibility = "hidden";

      setCompletedDialogue(true);
    } 
    setCurrSpeechIndex(currSpeechIndex + 1);
  }
  
  useEffect(() => { 

    var c = 0;
    function typewriter(speech: string) {
      const time = 20;
      timeoutRef.current = setTimeout(writeCharacter, time);

      function writeCharacter() {
        if (!speechRef.current) {
          return
        };

        if (c < speech.length) {
          speechRef.current.innerHTML += speech.charAt(c);
          c++;
          timeoutRef.current = setTimeout(writeCharacter, time);
        }
      }
    }

    if (currSpeechIndex === speeches.length) return;
    if (profilePicRef.current) {
      profilePicRef.current.src = expressions[orderOfExpressions[currSpeechIndex]]
    } 
    typewriter(speeches[currSpeechIndex]);
    if (timeoutRef.current) {
      return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
    }
  }, [currSpeechIndex])
  

  return (
    <div id="dialougeWrapper">
    <div ref={containerRef} id="dialogue_container">
      <div id="dialouge_profile_pic">
        <img ref={profilePicRef} alt="character expression"/>
        <span>{names ? names[currSpeechIndex] : name}</span>
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
    </div>
  )
}