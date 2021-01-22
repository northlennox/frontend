import React from 'react';
import { Link } from 'react-router-dom';

const AtticBar_SeHee = (props) => {
  const userId = sessionStorage.userId;
  console.log('props - ', typeof props.atticDepth)

  let indicator = 0;

  if(props.atticDepth === 0){
    indicator = 93
  }else if(props.atticDepth < 6 && props.atticDepth > 0){
    indicator = 60
  }else if(props.atticDepth < 10 && props.atticDepth > 5){
    indicator = 30
  }else{
    indicator = 0
  }


  let level = ""

  if(props.atticDepth > 11){
    level = "high"
  }else if(props.atticDepth === 11){
    level="medium"
  }else if(props.atticDepth < 11){
    level="low"
  }

  return(
    <div className="atticInsulation_Container">
      <div className="atticInsulation_row">
        <div className="indicatorContainer">
          <div className="indicator" style={{marginTop : `${indicator}%`}}><img src="../right-arrow.png" className="indicatorImg"/></div>
        </div>
        <div className="layerContainer">
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">11-15"</div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">6-10"</div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/><img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">1-5"</div>
          </div>
          <div className="level_attic">
            <div className="rating">
              <img src="../star.png" className="rating_star"/>
            </div>
            <div className="ratingText">0"</div>
          </div>
        </div>
        <div className="typeContainer">
          <div className="materialType">
            <div className="atticTypeImg"><img src="../attic.jpg" /></div>
            <div className="textBold atticTypeText">{props.attic.insulMaterial}</div>
          </div>
        </div>
      </div>
      <div className="commentContainer">
        <div>The depth of your attic insulation is reported as <span className="textBold">{props.atticDepth}</span> inches of <span className="textBold">{props.attic.insulMaterial}</span>. It is <span className="textBold">{level}</span> compared to the recommended level of at least 11 inches. Adding attic insulation with proper air sealing is typically the single most effective action a homeowner can take to increase energy performance. Insulation is inexpensive and has a long life. Taking action is highly recommended.</div>
      </div>
    </div>
  )
}
export default AtticBar_SeHee
// <div className="indicator" style={{marginLeft: `${props.atticDepth / 15 * 100}%`}}> <div class="shape"><div id="grader" style={{color: `${props.atticGradeColor}`}}>{props.atticGrade}</div></div></div>
