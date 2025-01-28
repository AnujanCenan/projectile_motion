import './App.css';
import LevelSelection from './components/levelSelection/LevelSelection';
import levelsFile from "./components/levelSelection/levels.json"
function App() {

  return (
    <LevelSelection
      levels={levelsFile.levels}
    />
  )
}
export default App;
