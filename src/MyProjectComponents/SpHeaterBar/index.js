import React from 'react';
import { Link } from 'react-router-dom';

const SpHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.spHeaterType - ', props.spHeaterType)
  let indicator = 0

  if(props.spHeaterType === "Central Gas Furnace" || props.spHeaterType === "Room Gas Furnace" || props.spHeaterType === "Oil Furnace" || props.spHeaterType === "Electric Furnace"){
    indicator = 32/2
  }else if(props.spHeaterType === "Electric Heat Pump" || props.spHeaterType === "Gas Boiler/Radiant" || props.spHeaterType === "Geothermal Heat Pump" || props.spHeaterType === "Wood Stove" || props.spHeaterType === "Pellet Stove"){
    indicator = 32/2 + 1 +32
  }else if("Electric Mini-Split"){
    indicator = 32/2 + 1 + 32 + 1 + 32
  }

  return(
    <div className="spHeaterBar">
      <div className="analysisTitle">Space Heater Efficiency</div>
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../indicator.svg"/></div>
      <div className="barContainer">
        <div className="orange_level"><div className="barText">Gas Baseline</div></div>
        <div className="yellow_level"><div className="barText">Better</div></div>
        <div className="green_level"><div className="barText">Best</div></div>
      </div>
      <div className="inches">
        <div className="orangeIn h5">Gas Purnace</div>
        <div className="yellowIn h5">Heat Pump</div>
        <div className="greenIn h5">Mini-Split Heat Pump</div>
      </div>
      <div>Your space heater is a {props.spHeaterType} with an age of {props.spHeaterAge}. It should be replaced when it exceeds its 15-year expected life. A ducted or ductless heat pump is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
    </div>
  )
}
export default SpHeaterBar
