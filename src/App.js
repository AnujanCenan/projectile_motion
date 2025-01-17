// import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas';
import Dialogue from './components/dialogue/Dialogue';

import GeneralPaddy_neutral from "./images/characters/GeneralPaddy/GeneralPaddy_neutral.png"
import GeneralPaddy_angry from "./images/characters/GeneralPaddy/GeneralPaddy_angry.png"
import GeneralPaddy_happy from "./images/characters/GeneralPaddy/GeneralPaddy_happy.png"


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    <Canvas />
    <Dialogue
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
    />
    </>
  );
}

export default App;
