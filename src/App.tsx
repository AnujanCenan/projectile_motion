// import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas.tsx';
import Dialogue from './components/dialogue/Dialogue.tsx';

import GeneralPaddy_neutral from "./images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "./images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "./images/characters/GeneralPaddy/GeneralPaddy_happy.png"

function App() {
  
  return (
    <div>
    <Canvas MAX_RANGE={500} target_range={500} target_altitude={0}/>
    {/* <Dialogue
      name="General Paddy"
      speeches={[
        "ATTENTION!",
        "Seems like you're the newest recruit. I've heard good things from your current instructor.",
        "Well, don't think I'll be so easy to impress. It's one thing to be able to perfom in the classroom.",
        "It's a WHOLE other thing to be reliable in the battle field.",
        "So let's see what you've got, shall we?"
      ]}
      expressions={[
        GeneralPaddy_neutral,
        GeneralPaddy_happy,
        GeneralPaddy_angry
      ]} 
      orderOfExpressions={[
        2, 0, 2, 0, 1
      ]}
    /> */}
    </div>
  );
}

export default App;
