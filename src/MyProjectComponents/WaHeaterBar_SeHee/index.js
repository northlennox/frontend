import React from 'react';
import { Link } from 'react-router-dom';

const WaHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.wather ', props.waEfficency)
  let indicator = Number(props.waEfficency) / 2.5 * 100;


  return(
    <div className="progressbar2">
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><div class="shape"><div id="grader" style={{color: `${props.waGradeColor}`}}>{props.waGradeLetter}</div></div></div>
      <div className="bar">
        <div className="red"><div className="letterIndicator"></div></div>
        <div className="orange"><div className="letterIndicator">Gas Baseline</div></div>
        <div className="yellow"><div className="letterIndicator">Heat Pump</div></div>
        <div className="green"><div className="letterIndicator">Others</div></div>
      </div>
      <div className="inches">
        <div className="startIn h5">0</div>
        <div className="orangeIn h5">0.55</div>
        <div className="yellowIn h5">0.9</div>
        <div className="greenIn h5">2.5</div>
      </div>
    </div>
  )
}
export default WaHeaterBar
