import React from 'react';
import { Link } from 'react-router-dom';

const SpHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.spHeaterType - ', props.spHeaterType)
  let indicator = 0

  if(props.spHeaterType === "Central Gas Furnace" || props.spHeaterType === "Room Gas Furnace" || props.spHeaterType === "Oil Furnace" || props.spHeaterType === "Electric Furnace"){
    indicator = 16
  }else if(props.spHeaterType === "Electric Heat Pump" || props.spHeaterType === "Gas Boiler/Radiant" || props.spHeaterType === "Geothermal Heat Pump" || props.spHeaterType === "Wood Stove" || props.spHeaterType === "Pellet Stove"){
    indicator = 45
  }else if("Electric Mini-Split"){
    indicator = 75
  }

  return(
    <div className="progressbar3">
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../indicator.svg"/></div>
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
