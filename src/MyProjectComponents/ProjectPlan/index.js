import React from 'react';
import { Link } from 'react-router-dom';
import AtticBar_SeHee from '../AtticBar_SeHee';
import WaHeaterBar_SeHee from '../WaHeaterBar_SeHee';
import SpHeaterBar_SeHee from '../SpHeaterBar_SeHee';
import GradeGraph from '../GradeGraph';
import './ProjectPlan.scss';

const ProjectPlan = (props) => {
  const userId = sessionStorage.userId;
  let today = new Date()
  let cuttentYear = today.getFullYear();

  return(
    <div className="examContainer">
      <div className="titleContainer">
        <div className="title h2">My Project - SeHee version</div>
        <div className="subtitle h4">See the status of your house energy assets and how they compare on quality, efficiency and age to new technologies.</div>
      </div>
      <div className="gradeContainer">
        <div className="gradeRow myGrade">
          <div className="h3">My Casa Grades</div>
          <div className="measureContainer">
            <div className="measureItem">
              <label><div className="h4">Energy Efficiency</div><div className="h4">Rating</div></label>
              <div className="atticGrade" style={{color:`${props.atticGradeColor}`}}>{props.atticGrade}</div>
              <GradeGraph atticGrade={props.atticGrade} />
            </div>
            <div className="measureItem">
              <label><div className="h4">Carbon Footprint</div><div className="h4">Rating</div></label>
              <div className="spGradeLetter" style={{color:`${props.spGradeColor}`}}>{props.spGradeLetter}</div>
              <GradeGraph spGradeLetter={props.spGradeLetter} />
            </div>
          </div>
        </div>
        <div className="gradeRow componentsMark">
          <div className="h3">Components</div>
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
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/floorInsulationIcon.svg"/>
                <span className="markName">Floor Insulation</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/windowsIcon.svg"/>
                <span className="markName">Windows quality</span>
                <span className="markStatus">N/A</span>
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
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/spHeaterIcon.svg"/>
                <span className="markName">Space Heater</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/rangeIcon.svg"/>
                <span className="markName">Range</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/clothesDryerIcon.svg"/>
                <span className="markName">Clothes Dryer</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Components/solarIcon.svg"/>
                <span className="markName">Solar?</span>
                <span className="markStatus">N/A</span>
              </div>
            </div>
          </div>
        </div>
        <div className="gradeRow analysis">
          <div className="h3">Analysis</div>
            <div className="analysisSection">
              
              <div className="analysisTitle">Attic Insulation</div>
                <AtticBar_SeHee atticDepth={props.atticDepth} atticGradeColor={props.atticGradeColor} atticGrade={props.atticGrade}/>
              <div>The depth of your attic insulation is reported as [depth #] inches of [material]. It is [low/medium/high] compared to the recommended level of at least 11 inches. Adding attic insulation with proper air sealing is typically the single most effective action a homeowner can take to increase energy performance. Insulation is inexpensive and has a long life. Taking action is highly recommended.</div>
            </div>
            <div className="analysisSection">

              <div className="analysisTitle">Water Heater Efficiency</div>
              <WaHeaterBar_SeHee waEfficency={props.waEfficency} waGradeColor={props.waGradeColor} waGradeLetter={props.waGradeLetter}/>
              <div className="analysisContent">Your water heater is a [water heater type] with an age of [current year – year of manufacture]. It should be replaced when it exceeds its 10-year expected life. A heat pump water heater is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
            </div>
            <div className="analysisSection">
                <div className="analysisTitle">Space Heater Efficiency</div>
                <SpHeaterBar_SeHee spHeaterType={props.spEfficency} spGradeLetter={props.spGradeLetter} spGradeColor={props.spGradeColor}/>
              <div>Your space heater is a <span className="textBold">{props.spHeaterType}</span> with an age of <span className="textBold">{props.spHeaterAge}</span>. It should be replaced when it exceeds its 15-year expected life. A ducted or ductless heat pump is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
            </div>
          </div>
        </div>
        <div className="recommendations">
          <div className="h3">Recommendations</div>
          <div className="recommendation"><span className="replaceYr h5" style={{border: `solid 2px ${'#D22E2E'}`}}>{cuttentYear + 10}</span><span className="replaceTitle">Replace Water Heater with Electric Heat Pump</span></div>
          <div className="recommendation"><span className="replaceYr h5">{cuttentYear + 10}</span><span className="replaceTitle">Increase Attic Insulation</span></div>
          <div className="recommendation"><span className="replaceYr h5">{cuttentYear + 10}</span><span className="replaceTitle">Replace Space Heater with Electric Heat Pump</span></div>
        </div>
    </div>
  )
}
export default ProjectPlan
