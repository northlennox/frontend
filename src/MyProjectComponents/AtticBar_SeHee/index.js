import React from 'react';
import { Link } from 'react-router-dom';

const AtticBar_SeHee = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props)

  return(
    <div className="progressbar">
      <div className="indicator" style={{marginLeft: `${props.atticDepth / 15 * 100}%`}}> <div class="shape"><div id="grader" style={{color: `${props.atticGradeColor}`}}>{props.atticGrade}</div></div></div>
      <div className="bar">
        <div className="red"><div className="letterIndicator">Zero</div></div>
        <div className="orange"><div className="letterIndicator">Low</div></div>
        <div className="yellow"><div className="letterIndicator">Medium</div></div>
        <div className="green"><div className="letterIndicator">High</div></div>
        <div className="last"></div>
      </div>
      <div className="inches">
        <div className="redIn h5">0"</div>
        <div className="orangeIn h5">1"</div>
        <div className="yellowIn h5">6"</div>
        <div className="greenIn h5">11"</div>
        <div className="lastIn h5">15"</div>
      </div>
    </div>
  )
}
export default AtticBar_SeHee
