import React from 'react';
import { Link } from 'react-router-dom';

const WaHeaterBar = (props) => {
  const userId = sessionStorage.userId;

  let indicator = 10


  return(
    <div className="atticInsulation_Container">
      <div className="atticInsulation_row">
        <div className="indicatorContainer">
          <div className="indicator" style={{marginTop : `${indicator}%`}}>
            <div className="indicatorText">{props.waHeater}</div>
            <img src="../right-arrow.png" className="indicatorImg"/>
          </div>
        </div>
        <div className="layerContainer">
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">Electric Heat Pump </div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">Hybrid Electric Heat Pump </div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">Gas Storage / Tankless </div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">No Gas </div>
          </div>
        </div>
        <div className="typeContainer">
          <div className="materialType">
            <div className="atticTypeImg"><img src="../attic.jpg" /></div>
            <div className="textBold atticTypeText">{props.waHeater.waHeatertype}</div>
          </div>
        </div>
      </div>
      <div className="commentContainer">
        <div>Your water heater is a <span className="textBold">{props.waHeater.waHeatertype}</span> with an age of [current year – year of manufacture]. It should be replaced when it exceeds its 10-year expected life. A heat pump water heater is an attractive technology. Heat pumps are more than 3x more efficient than gas, and can be powered with a renewable energy source such as rooftop solar.</div>
      </div>
    </div>
  )
}
export default WaHeaterBar
