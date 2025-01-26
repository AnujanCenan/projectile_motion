import { RefObject, useEffect, useRef, useState } from "react"
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
      containerRef.current.style.visibility = "hidden";

      
      // const child = document.getElementById('dialogue_container') as HTMLDivElement;
      // console.log(`parent = ${child.parentElement}`)
      // const parent = child.parentElement as HTMLDivElement;
      // console.log(`child = ${child}`)

      // parent.removeChild(child);

      setCompletedDialogue(true);
    } 
    setCurrSpeechIndex(currSpeechIndex + 1);
  }
  
  useEffect(() => { 


    function typewriter(speech: string) {
      // var speed = 30;
      // writeCharacter();
      // function writeCharacter() {
      //   if (!speechRef.current) {
      //     return
      //   };

      //   if (c < speech.length) {
      //     speechRef.current.innerHTML += speech.charAt(c);
      //     c++;
      //     timeoutRef.current = setTimeout(writeCharacter, speed);
      //   }
      // }
      speechRef.current!.innerHTML = speech;
    }

    if (currSpeechIndex === speeches.length) return;
    if (profilePicRef.current) {
      profilePicRef.current.src = expressions[orderOfExpressions[currSpeechIndex]]
      typewriter(speeches[currSpeechIndex]);
    } 
  }, [currSpeechIndex])
  

  // useEffect(() => {

  //   if (setCompletionVariable !== null && completionVal !== null && currSpeechIndex === speeches.length) {

  //     setCompletionVariable(completionVal);
  //   }
  // })
  return (
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
  )
}