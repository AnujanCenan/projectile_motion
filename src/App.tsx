import { JSX, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import LevelSelection from './components/levelSelection/LevelSelector';
import levelsFile from "./components/levelSelection/levels.json"

function App() {

  const [projectileMotionPage, setProjectileMotionPage] = useState<JSX.Element>(<div/>);

  useEffect(() => {
    setProjectileMotionPage(_ => <LevelSelection levels={levelsFile.levels} setProjectileMotionPage={setProjectileMotionPage}/>)
  }, [])

  return projectileMotionPage
}
export default App;
