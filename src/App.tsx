import './App.css';
import LevelSelection from './components/levelSelection/LevelSelection';

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
    },
    {
      name: "Level 6",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 7",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 8",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 9",
      blurb: "Meet Dr Flame",
      completionStatus: false
    },
    {
      name: "Level 10",
      blurb: "Meet Dr Flame",
      completionStatus: false
    }
  ]
  return (
    <LevelSelection
      levels={levels}
    />
  )
}
export default App;
