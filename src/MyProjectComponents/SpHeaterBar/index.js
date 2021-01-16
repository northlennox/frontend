import React from 'react';
import { Link } from 'react-router-dom';

const SpHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props)

  return(
    <div className="progressbar3">
      <div className="indicator" style={{marginLeft: `${props.atticDepth / 15 * 100}%`}}><img src="../../indicator.svg"/></div>
      <div className="bar">
        <div className="orange"><p>Space Heater</p></div>
        <div className="yellow"></div>
        <div className="green"></div>
      </div>
      <div className="inches">
        <div className="orangeIn h5">Gas Purnace</div>
        <div className="yellowIn h5">Heat Pump</div>
        <div className="greenIn h5">Mini-Split Heat Pump</div>
      </div>
    </div>
  )
}
export default SpHeaterBar
