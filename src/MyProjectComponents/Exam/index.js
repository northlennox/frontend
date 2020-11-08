import React from 'react';
import { Link } from 'react-router-dom';

const Exam = (props) => {
  const userId = localStorage.userId;

  console.log('--', props.attic.atticDepth);
  var grade = ''
  if(props.attic.atticDepth == '2'){
    grade = 'd'
  }


  return(
    <div>
      <h1>dd</h1>
      <div>{grade}</div>

    </div>
  )
}
export default Exam
