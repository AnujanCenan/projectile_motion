import './App.css';
import LevelSelection from './components/levelSelection/levelSelection.tsx';
import Tutorial from './components/tutorial/Tutorial.tsx';

function App() {
  
  return (
    <LevelSelection levels={["Tutorial", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]} />
  );
}

export default App;
