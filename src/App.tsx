import { JSX, useEffect, useState } from 'react';
import './App.css';
import Tutorial from './components/tutorial/Tutorial';

function App() {

  const [projectileMotionPage, setProjectileMotionPage] = useState<JSX.Element>(<div/>);

  useEffect(() => {
    setProjectileMotionPage(_ => <Tutorial setProjectileMotionPage={setProjectileMotionPage}/>)
    // setProjectileMotionPage(_ => <CompletedMission setProjectileMotionPage={setProjectileMotionPage}/>);
  }, [])

  return projectileMotionPage
}
export default App;
