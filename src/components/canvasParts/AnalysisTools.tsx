import { useState } from "react"
import "./CSS/AnalysisTools.css"
interface AnalysisToolsProps {
  time: number;
  xVel: number;
  xDis: number;
  yVel: number;
  yDis: number;
}

export default function AnalysisTools({time, xVel, xDis, yVel, yDis}: AnalysisToolsProps) {

  return (
    <>
      <div className="AnalysisToolsContainer">

        <h1>Analysis Tools</h1>

        <div>Time: {Math.round(time * 100) / 100} s</div>

        <div>Horizontal Velocity: {Math.round(xVel * 100) / 100} ms<sup>-1</sup></div>
        <div>Horizontal Displacement: {Math.round(xDis * 100) / 100} m</div>
        
        <div>Vertical Velocity: {Math.round(yVel * 100) / 100} ms<sup>-1</sup></div>
        <div>Height off the ground: {Math.round(yDis * 100) / 100} m</div>


      </div>
    
    
    </>
  )
}