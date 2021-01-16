import React from 'react';
import { Link } from 'react-router-dom';

const WaHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.wather ', props.waHeatertype)
  let indicator = 0;

  if(props.waHeatertype === "Natural Gas Storage"|| props.waHeatertype === "Natural Gas Tankless"){
    indicator = 16
  }else if(props.waHeatertype === "Electric Storage"){
    indicator = 45
  }else if(props.waHeatertype === "Electric Heat Pump"){
    indicator = 75
  }
  return(
    <div className="progressbar2">
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../indicator.svg"/></div>
      <div className="bar">
        <div className="orange"><p>Water Heater</p></div>
        <div className="yellow"></div>
        <div className="green"></div>
      </div>
      <div className="inches">
        <div className="orangeIn h5">Gas Storage / Tankless</div>
        <div className="yellowIn h5">Hybrid Electric Heat Pump</div>
        <div className="greenIn h5">Electric Heat Pump</div>
      </div>
    </div>
  )
}
export default WaHeaterBar
