import React from 'react';
import { Link } from 'react-router-dom';
import GradeGraph from '../GradeGraph';
import Components from '../Components';
import AtticBar from '../AtticBar';
import WaHeaterBar from '../WaHeaterBar';
import SpHeaterBar from '../SpHeaterBar';

const Exam = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props.attic)

  return(
    <div className="examContainer">
      <div className="titleContainer">
        <div className="title h2">Projects</div>
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
          <Components atticInsulation={props.atticInsulation} attic={props.attic} waHeatertypeShort={props.waHeatertypeShort} spHeaterTypeShort={props.spHeaterTypeShort} roof={props.roof}/>
        </div>
        <div className="gradeRow analysis">
          <div className="h3">Analysis</div>
            <div className="analysisSection">
              <div className="analysisName h4">EFFICIENCY</div>
              <AtticBar attic={props.attic}atticDepth={props.atticDepth} atticGrade={props.atticGrade} atticGradeColor={props.atticGradeColor} atticInsulation={props.atticInsulation} />
            </div>
            <div className="analysisSection">
              <div className="analysisName h4">TECHNOLOGY</div>
              <WaHeaterBar waHeatertype={props.waHeatertype} waHeaterAge={props.waHeaterAge} waEfficency={props.waEfficency} waGradeColor={props.waGradeColor} waGradeLetter={props.waGradeLetter}/>
            </div>
            <div className="analysisSection">
              <SpHeaterBar spHeaterType={props.spHeaterType} spHeaterAge={props.spHeaterAge} spEfficency={props.spGradeLetter} spGradeColor={props.spGradeColor} spGradeLetter={props.spGradeLetter}/>
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
