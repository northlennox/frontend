import React from 'react';
import { Link } from 'react-router-dom';

const Exam = (props) => {
  const userId = sessionStorage.userId;
  const photo = props.house.houseImg;

  let grade = ''
  let waHeaterAge = 2020 - Number(props.waHeater.waHeaterYear);
  let waEfficency = ''
  let waEfficencyGrade = ''
  let spHeaterAge = 2020 - Number(props.spHeater.spHeaterYear);
  let spEfficency = ''

  let atticDep = Number(props.attic.atticDepth )
  console.log('dd', atticDep);
  if(atticDep === 0){
    grade = 'D'
  }else if(1 <= atticDep < 6){
    grade = 'C'
  }

// Water heater type “gas tank” efficiency 0.55 range red grade C if year <10, else D
// Water heater type “gas tankless” efficiency 0.9 range red grade C if year <15, else D
// Water heater type “electric tank” efficiency 0.9 range green grade C if year <10, else D
// Water heater type “heat pump” efficiency 2.5 range green grade A if year <10, else B
  console.log('ddd', waHeaterAge);

  if(props.waHeater.waHeatertype === "Natural Gas Storage"){
      waEfficency = '0.55'
    if(waHeaterAge < 10){
      waEfficencyGrade = 'C';
    }else if(waHeaterAge > 10){
      waEfficencyGrade = 'D';
    }
  }else if(props.waHeater.waHeatertype === "Natural Gas Tankless"){
    waEfficency = '0.9'
    if(waHeaterAge < 10){
      waEfficencyGrade = 'C';
    }else if(waHeaterAge > 10){
      waEfficencyGrade = 'D';
    }
  }else if(props.waHeater.waHeatertype === "Electric Storage"){
    waEfficency = '0.9'
    if(waHeaterAge < 10){
      waEfficencyGrade = 'C';
    }else if(waHeaterAge > 10){
      waEfficencyGrade = 'D';
    }
  }else if(props.waHeater.waHeatertype === "Electric Heat Pump"){
    waEfficency = '2.5'
    if(waHeaterAge < 10){
      console.log('here');
      waEfficencyGrade = 'A';
    }else if(waHeaterAge > 10){
      waEfficencyGrade = 'B';
    }
  }




  // const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
  // Space heater type “furnace” efficiency 0.8 range red grade C if year<10, else D
  // Space heater type “heat pump” efficiency 3.0 range green grade A if year <10, else B

 if(props.spHeater.spHeaterType === "Central Gas Furnace" || props.spHeater.spHeaterType === "Room Gas Furnace" || props.spHeater.spHeaterType === "Oil Furnace" || props.spHeater.spHeaterType === "Electric Furnace"){
   spEfficency = '0.8'
 }else{
   spEfficency = '3.0'
 }

  return(
    <div className="examContainer">
      <div className="titleContainer">
        <div className="title h2">My Project</div>
        <div className="subtitle h4">See the status of your house energy assets and how they compare on quality, efficiency and age to new technologies.</div>
      </div>
      <div className="gradeContainer">
        <div className="gradeRow myGrade">
          <div className="h3">My Casa Grade</div>
          <div className="measureContainer">
            <div className="measureItem">
              <label>Energy Efficiency Rating</label>
              <div>B</div>
              <div>graph</div>
            </div>
            <div className="measureItem">
              <label>Carbon Footprint Rating</label>
              <div>B</div>
              <div>graph</div>
            </div>
          </div>
        </div>
        <div className="gradeRow componentsMark">
          <div className="h3">Components</div>
          <div className="componentContainer">
            <div className="componentCol">
              <div className="markContainer">
                <img className="marks" src="../Electrify/cooking.svg"/>
                <span className="markName">Attic Insulation</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/cooking.svg"/>
                <span className="markName">Wall Insulation</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/cooking.svg"/>
                <span className="markName">Floor Insulation</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/cooking.svg"/>
                <span className="markName">Windows quality</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/Weatherization.svg"/>
                <span className="markName">Sealed?</span>
                <span className="markStatus">N/A</span>
              </div>
            </div>
            <div className="componentCol">
              <div className="markContainer">
                <img className="marks" src="../Electrify/HotWater.svg"/>
                <span className="markName">Water Heater</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/HeatingCooling.svg"/>
                <span className="markName">Space Heater</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/cooking.svg"/>
                <span className="markName">Range</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/ClothesDrying.svg"/>
                <span className="markName">Clothes Dryer</span>
                <span className="markStatus">N/A</span>
              </div>
              <div className="markContainer">
                <img className="marks" src="../Electrify/EnergyGeneration.svg"/>
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
              <div>graph</div>
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
            <div className="analysisSection">
              <div className="analysisName h4">TECHNOLOGY</div>
              <div>graph</div>
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
            <div className="analysisSection">
              <div>graph</div>
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            </div>
            <div className="analysisSection recommendations">
              <div></div>
              <div></div>
              <div></div>
            </div>
          <div>Attic Insulation : {grade}</div>
          <div>Water Heater : age - {waHeaterAge}</div>
          <div>Energy Efficiency Factor: {waEfficencyGrade}</div>
          <div>Space Heater : {spHeaterAge} </div>
          <div>Energy Efficiency Factor: {spEfficency}</div>
        </div>
      </div>
    </div>
  )
}
export default Exam
