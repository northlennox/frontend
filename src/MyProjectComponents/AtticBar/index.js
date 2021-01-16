import React from 'react';
import { Link } from 'react-router-dom';

const AtticBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props)

  return(
    <div className="progressbar">
      <div className="indicator" style={{marginLeft: `${props.atticDepth / 15 * 100}%`}}><img src="../../indicator.svg"/></div>
      <div className="bar">
        <div className="symbol"></div>
        <div className="red"></div>
        <div className="orange"><p>Attic Insulation</p></div>
        <div className="yellow"></div>
        <div className="green"></div>
      </div>
      <div className="inches">
        <div className="redIn h5">0"</div>
        <div className="orangeIn h5">1 - 5"</div>
        <div className="yellowIn h5">6 - 10"</div>
        <div className="greenIn h5">11 - 15"</div>
      </div>
    </div>
  )
}
export default AtticBar
