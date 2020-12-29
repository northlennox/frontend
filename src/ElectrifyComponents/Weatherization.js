import React from 'react';
import Nav from './../Nav';
import './ElectrifyComponents.scss';


const Weatherization = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Weatherization</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img className="img" src="../Electrify/Weatherization.svg" /></div>
                  <div className="electri_text">Impacts Building Energy Efficiency Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">Weatherization is a bucket term that includes all the ways a house protects against the elements outside, including sunlight, precipitation, wind, cold and heat.</div>
                  <div className="p2">From an energy perspective, the measure that building professional use most frequently as a diagnostic is airtightness. A house that is relatively airtight requires less energy to mantain at a comfortable temperature than one that is not.</div>
                  <div className="p3">Airtightness is impacted by insulation levels, quality of windows and overall sealing. For older homes, the project that has the best performance for its cost is proper air sealing and insulation in the attic. A well insulated attic increases comfort and reduces energy usage for heating and cooling.</div>
                  <div className="p4">The estimated cost range is typically under $2 per square foot.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default Weatherization
