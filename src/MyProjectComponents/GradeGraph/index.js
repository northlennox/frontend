import React from 'react';
import { Link } from 'react-router-dom';

const GradeGraph = (props) => {
  const userId = sessionStorage.userId;
  let indicator = 0;

  if(props.atticGrade === "D"){
    indicator = 4
  }else if(props.atticGrade === "C"){
    indicator = 25 + 4
  }else if(props.atticGrade === "B"){
    indicator = 50 + 4
  }else if(props.atticGrade === "A"){
    indicator = 75 + 4
  }

  if(props.spGradeLetter === "D"){
    indicator = 4
  }else if(props.spGradeLetter === "C"){
    indicator = 25 + 4
  }else if(props.spGradeLetter === "B"){
    indicator = 50 + 4
  }else if(props.spGradeLetter === "A"){
    indicator = 75 + 4
  }



  return(
    <div className="progressbar_grade">
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../../abcd_indicator.svg"/></div>
      <div className="bar gradeGraphBar">
        <div className="red gradeGraph">D</div>
        <div className="orange gradeGraph">C</div>
        <div className="yellow gradeGraph">B</div>
        <div className="green gradeGraph">A</div>
      </div>
    </div>
  )
}
export default GradeGraph
