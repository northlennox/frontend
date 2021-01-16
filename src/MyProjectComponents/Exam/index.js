import React from 'react';
import { Link } from 'react-router-dom';
import AtticBar from '../AtticBar';
import WaHeaterBar from '../WaHeaterBar';
import SpHeaterBar from '../SpHeaterBar';

const Exam = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props)

  let mar = '3'
  return(
    <div className="examContainer">
      <div className="titleContainer">
        <div className="title h2">My Project</div>
        <div className="subtitle h4">See the status of your house energy assets and how they compare on quality, efficiency and age to new technologies.</div>
      </div>
      <div className="gradeContainer">
        <div className="gradeRow myGrade">
          <div className="h3">My Casa Grades</div>
          <div className="measureContainer">
            <div className="measureItem">
              <label><div className="h4">Energy Efficiency</div><div className="h4">Rating</div></label>
              <div className="atticGrade" style={{color:`${props.atticGradeColor}`}}>{props.atticGrade}</div>
              <div>graph</div>
            </div>
            <div className="measureItem">
              <label><div className="h4">Carbon Footprint</div><div className="h4">Rating</div></label>
              <div className="spGradeLetter" style={{color:`${props.spGradeColor}`}}>{props.spGradeLetter}</div>
              <div>graph</div>
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
                <span className="markStatus">N/A</span>
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
                <span className="markStatus">N/A</span>
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
              <div className="analysisName h4">EFFICIENCY</div>
                <AtticBar atticDepth={props.atticDepth} />
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
            <div className="analysisSection">
              <div className="analysisName h4">TECHNOLOGY</div>
                <WaHeaterBar atticDepth={props.atticDepth} />
              <div>Wather heater type : {props.waHeatertype}</div>
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
            <div className="analysisSection">
                <SpHeaterBar atticDepth={props.atticDepth} />
              <div>space heater type : {props.spHeaterType}</div>
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
          </div>
        </div>
        <div className="recommendations">
          <div className="h3">Recommendations</div>
          <div className="recommendation"><span className="replaceYr h5">2021</span><span className="replaceTitle">Replace Water Heater with Electric Heat Pump</span></div>
          <div className="recommendation"><span className="replaceYr h5">2021</span><span className="replaceTitle">Increase Attic Insulation</span></div>
          <div className="recommendation"><span className="replaceYr h5">2021</span><span className="replaceTitle">Replace Space Heater with Electric Heat Pump</span></div>
        </div>
    </div>
  )
}
export default Exam


// <div>Water Heater : age - {waHeaterAge}</div>
// <div>Energy Efficiency Factor: {waEfficencyGrade}</div>
// <div>Space Heater : {spHeaterAge} </div>
// <div>Energy Efficiency Factor: {spEfficency}</div>
