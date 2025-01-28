import { useState } from 'react';
import './App.css';
import LevelSelection from './components/levelSelection/LevelSelection';
import levelsFile from "./components/levelSelection/levels.json"
import Tutorial from './components/tutorial/Tutorial';
function App() {
  const [projectileMotionPage, setProjectileMotionPage] = useState(<LevelSelection levels={levelsFile.levels} />);

  return projectileMotionPage
}
export default App;
