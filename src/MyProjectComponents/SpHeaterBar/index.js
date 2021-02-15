import React from 'react';
import { Link } from 'react-router-dom';

const SpHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  // console.log('props.spHeaterType - ', props.spHeaterType)
  let indicator = 0

  if(props.spHeaterType === "Central Gas Furnace" || props.spHeaterType === "Room Gas Furnace" || props.spHeaterType === "Oil Furnace" || props.spHeaterType === "Electric Furnace"){
    indicator = 25 + 25/2
  }else if(props.spHeaterType === "Electric Heat Pump" || props.spHeaterType === "Gas Boiler/Radiant" || props.spHeaterType === "Geothermal Heat Pump" || props.spHeaterType === "Wood Stove" || props.spHeaterType === "Pellet Stove"){
    indicator = 50 + 25/2
  }else if("Electric Mini-Split"){
    indicator = 75 + 25/2
  }else{
    indicator = 25/2
  }

  return(
    <div className="spHeaterBar">
      <div className="analysisTitle">Space Heater</div>
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../indicator.svg"/></div>
      <div className="barContainer">
        <div className="red_level"><div className="barText">Old Technology</div></div>
        <div className="orange_level"><div className="barText">Gas Baseline</div></div>
        <div className="yellow_level"><div className="barText">Better</div></div>
        <div className="green_level"><div className="barText">Best</div></div>
      </div>
      <div className="inches">
        <div className="redIn h5">Near Burnout Age or Other Type</div>
        <div className="orangeIn h5">Gas Furnace</div>
        <div className="yellowIn h5">Heat Pump</div>
        <div className="greenIn h5">Mini-Split Heat Pump</div>
      </div>
      <div>Your space heater is a {props.spHeaterType} with an age of {props.spHeaterAge}. It should be replaced when it exceeds its 15-year expected life. A ducted or ductless heat pump is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
    </div>
  )
}
export default SpHeaterBar
