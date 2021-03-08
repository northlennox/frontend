import React from 'react';
import { Link } from 'react-router-dom';

const WaHeaterBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.water ', props.waHeaterAge)
  let indicator = 0;

  if((props.waHeatertype === "Electric Storage")|| (props.waHeatertype === "Natural Gas Storage" && props.waHeaterAge > 10)|| (props.waHeatertype === "Natural Gas Tankless" && props.waHeaterAge > 10)){
    indicator = 25/2
  }else if((props.waHeatertype === "Natural Gas Storage" && props.waHeaterAge < 10)|| (props.waHeatertype === "Natural Gas Tankless" && props.waHeaterAge < 10)){
    indicator = 25 + 25/2
  }else if(props.waHeatertype === "Electric Heat Pump" && props.waHeaterAge > 10){
    indicator = 50 + 25/2
  }else if(props.waHeatertype === "Electric Heat Pump" && props.waHeaterAge < 10){
    indicator = 75 + 25/2
  }


  return(
    <div className="waHeaterBar">
      <div className="analysisTitle">Water Heater</div>
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../abcd_indicator.svg"/></div>
      <div className="barContainer">
        <div className="red_level"><div className="barText">Old Technology</div></div>
        <div className="orange_level"><div className="barText">Gas Baseline</div></div>
        <div className="yellow_level"><div className="barText">Better</div></div>
        <div className="green_level"><div className="barText">Best</div></div>
      </div>
      <div className="inches">
        <div className="redIn h5">Near Burnout Age</div>
        <div className="orangeIn h5">Gas Storage / Tankless</div>
        <div className="yellowIn h5">Hybrid Electric Heat Pump</div>
        <div className="greenIn h5">Electric Heat Pump</div>
      </div>
      <div>Your water heater is a {props.waHeatertype} with an age of {props.waHeaterAge}. It should be replaced when it exceeds its 10-year expected life. A heat pump water heater is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
    </div>
  )
}
export default WaHeaterBar
