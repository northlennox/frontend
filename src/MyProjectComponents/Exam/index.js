import React from 'react';
import { Link } from 'react-router-dom';

const Exam = (props) => {
  const userId = localStorage.userId;
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

   console.log('-----', waEfficencyGrade)
  return(
    <div>
      <h1>My Casa</h1>
      <div>See the status of your house energy assets and how they compare on quality, efficiency and age to new technologies.</div>
      <div className="container">
        <div className="col">
          <img src={`http://localhost:9000/` + photo}/>
          <div>{props.house.address}</div>
          <div>{props.house.city}</div>
          <div>{props.house.state}</div>
          <div>{props.house.zipcode}</div>
          <div>{props.house.houseSqft}</div>
          <div>{props.house.houseYear}</div>
          <Link to={"/mycasa/house/edit"}>Edit</Link>
        </div>
        <div className="col">
          <h3>Grades and Recommendations</h3>
          <label>Energy Efficiency Rating:</label><div>?</div>
          <label>Carborn Footprint Rating:</label><div>?</div>
          <h4>Attic Insulation</h4>
          <div>{grade}</div>
          <h4>Water Heater</h4>
          <label>Age:</label><div>{waHeaterAge}</div>
          <label>Energy Efficiency Factor:</label><div>{waEfficencyGrade}</div>
          <h4>Space Heater</h4>
          <label>Age:</label><div>{spHeaterAge} - need to fix</div>
          <label>Energy Efficiency Factor:</label><div>{spEfficency}</div>
        </div>
      </div>
    </div>
  )
}
export default Exam
