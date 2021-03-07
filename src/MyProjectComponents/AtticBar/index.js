import React from 'react';
import { Link } from 'react-router-dom';

const AtticBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props attic- ', props)
  let indicator = 0;

  if(props.atticDepth === 0){
    indicator = 25/2
  }else if(props.atticDepth > 1 && props.atticDepth < 6){
    indicator = 25 + 25/2
  }else if(props.atticDepth >= 6 && props.atticDepth < 11){
    indicator = 50 + 25/2 - 2
  }else if(props.atticDepth >= 11){
    indicator = 75 + 25/2
  }


  return(
    <div className="atticBar">
      <div className="analysisTitle">Attic Insulation</div>
      <div className="indicator" style={{marginLeft: `${indicator}%`}}><img src="../indicator.svg"/></div>
      <div className="barContainer">
        <div className="symbol"></div>
        <div className="red_level"><div className="barText">Inefficient</div></div>
        <div className="orange_level"><div className="barText">Low</div></div>
        <div className="yellow_level"><div className="barText">Medium</div></div>
        <div className="green_level"><div className="barText">High</div></div>
      </div>
      <div className="inches">
        <div className="redIn h5">0"</div>
        <div className="orangeIn h5">1 - 5"</div>
        <div className="yellowIn h5">6 - 10"</div>
        <div className="greenIn h5">11 - 15"</div>
      </div>
      <div>The depth of your attic insulation is reported as {props.atticDepth} inches of {props.attic.insulMaterial}. It is {props.atticInsulation} compared to the recommended level of at least 11 inches. Adding attic insulation with proper air sealing is typically the single most effective action a homeowner can take to increase energy performance. Insulation is inexpensive and has a long life. Taking action is highly recommended.</div>
    </div>
  )
}
export default AtticBar
