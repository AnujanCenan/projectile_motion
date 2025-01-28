import './App.css';
import LevelSelection from './components/levelSelection/levelSelection.tsx';
import Tutorial from './components/tutorial/Tutorial.tsx';

function App() {
  const levels: Level[] = [
    {
      name: "Tutorial",
      blurb: "Learn how to shoot your cannon",
      completionStatus: true
    },
    {
      name: "Level 1",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 2",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 3",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 4",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 5",
      blurb: "Meet Dr Flame",
      completionStatus: false
    }
  ]
  return (
    <LevelSelection levels={levels} />
  );
}

export default App;
