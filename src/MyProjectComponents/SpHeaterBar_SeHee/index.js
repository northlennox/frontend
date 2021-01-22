import React from 'react';
import { Link } from 'react-router-dom';

const SpHeaterBar_SeHee = (props) => {
  const userId = sessionStorage.userId;
  console.log('props.spHeaterType - ', props.spGradeLetter)
  let indicator = 0

  if( props.spGradeLetter == "A"){
    indicator = 87.5 - 5
  }else if( props.spGradeLetter == "B"){
    indicator = 62.5 - 5
  }else if( props.spGradeLetter == "C"){
    indicator = 37.5 - 5
  }else if(props.spGradeLetter == "D"){
    indicator = 25/2 - 5
  }

  return(
    <div className="progressbar4">
      <div className="indicator" style={{marginLeft: `${indicator}%`}}> <div class="shape"><div id="grader" style={{color: `${props.spGradeColor}`}}>{props.spGradeLetter}</div></div></div>
      <div className="bar">
        <div className="redCircle">
          <div className="">Age: 10yrs.</div>
          <div>Gas Purnace</div>
          </div>
        <div className="orangeCircle">
          <div className="">Age: 10yrs.</div>
          <div>Gas Purnace</div>
        </div>
        <div className="yellowCircle">
          <div className=""></div>
          <div>Heat Pump</div>
        </div>
        <div className="greenCircle">
          <div className="">Electric Mini-Split Heat Pump</div>
        </div>
      </div>
    </div>
  )
}
export default SpHeaterBar_SeHee


// import React from 'react';
// import { Link } from 'react-router-dom';
//
// const SpHeaterBar_SeHee = (props) => {
//   const userId = sessionStorage.userId;
//   console.log('props.spHeaterType - ', props.spGradeLetter)
//   let indicator = 0
//
//   if( props.spGradeLetter == "A"){
//     indicator = 87.5 - 5
//   }else if( props.spGradeLetter == "B"){
//     indicator = 62.5 - 5
//   }else if( props.spGradeLetter == "C"){
//     indicator = 37.5 - 5
//   }else if(props.spGradeLetter == "D"){
//     indicator = 25/2 - 5
//   }
//
//   return(
//     <div className="progressbar3">
//       <div className="indicator" style={{marginLeft: `${indicator}%`}}> <div class="shape"><div id="grader" style={{color: `${props.spGradeColor}`}}>{props.spGradeLetter}</div></div></div>
//       <div className="bar">
//         <div className="red" style={{textAlign:'left'}}><div className="letterIndicator"><span style={{marginRight:'2vw', marginLeft: '2vw'}}>Age:</span> {"\< 10"}</div></div>
//         <div className="orange"><div className="letterIndicator">{"\> 10"}</div></div>
//         <div className="yellow"><div className="letterIndicator">{"\< 10"}</div></div>
//         <div className="green"><div className="letterIndicator">{"\> 10"}</div></div>
//       </div>
//       <div className="inches">
//         <div className="redIn h5">3.0</div>
//         <div className="orangeIn h5">0.8</div>
//         <div className="yellowIn h5"></div>
//         <div className="greenIn h5">0</div>
//       </div>
//     </div>
//   )
// }
// export default SpHeaterBar_SeHee
