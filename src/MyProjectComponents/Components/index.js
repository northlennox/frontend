import React from 'react';
import { Link } from 'react-router-dom';

const Components = (props) => {
  return(
    <>
      <div className="componentContainer">
        <div className="componentCol">
          <div className="markContainer">
            <img className="marks" src="../Components/atticInsulationIcon.svg"/>
            <span className="markName">Attic Insulation</span>
            <span className="markStatus">{props.atticInsulation}</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/wallInsulationIcon.svg"/>
            <span className="markName">Wall Insulation</span>
            <span className="markStatus">NR</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/floorInsulationIcon.svg"/>
            <span className="markName">Floor Insulation</span>
            <span className="markStatus">NR</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/windowsIcon.svg"/>
            <span className="markName">Windows quality</span>
            <span className="markStatus">NR</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/sealedIcon.svg"/>
            <span className="markName">Sealed?</span>
            <span className="markStatus">{props.attic.airSealed}</span>
          </div>
        </div>
        <div className="componentCol">
          <div className="markContainer">
            <img className="marks" src="../Components/waHeaterIcon.svg"/>
            <span className="markName">Water Heater</span>
            <span className="markStatus">{props.waHeatertypeShort}</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/spHeaterIcon.svg"/>
            <span className="markName">Space Heater</span>
            <span className="markStatus">{props.spHeaterTypeShort}</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/rangeIcon.svg"/>
            <span className="markName">Cooking</span>
            <span className="markStatus">NR</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/clothesDryerIcon.svg"/>
            <span className="markName">Clothes Dryer</span>
            <span className="markStatus">NR</span>
          </div>
          <div className="markContainer">
            <img className="marks" src="../Components/solarIcon.svg"/>
            <span className="markName">Solar?</span>
            <span className="markStatus">{props.roof.pvSystem}</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default Components
