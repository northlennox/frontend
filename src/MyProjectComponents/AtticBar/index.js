import React from 'react';
import { Link } from 'react-router-dom';

const AtticBar = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', props)

  return(
    <div className="atticBar">
      <div className="analysisTitle">Attic Insulation</div>
      <div className="indicator" style={{marginLeft: `${props.atticDepth / 15 * 100}%`}}><img src="../../indicator.svg"/></div>
      <div className="barContainer">
        <div className="symbol"></div>
        <div className="red_level"></div>
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
      <div>The depth of your attic insulation is reported as {props.atticDepth} inches of {props.attic.insulMaterial}. It is {props.atticInsulation}compared to the recommended level of at least 11 inches. Adding attic insulation with proper air sealing is typically the single most effective action a homeowner can take to increase energy performance. Insulation is inexpensive and has a long life. Taking action is highly recommended.</div>
    </div>
  )
}
export default AtticBar
