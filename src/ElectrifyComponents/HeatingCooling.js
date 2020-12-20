import React from 'react';
import Nav from './../Nav';
// import './ElectrifyComponents.scss';


const HeatingCooling = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Heating and Cooling</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img src="./../web/HeatingCooling_web.png" /></div>
                  <div className="electri_text">Impacts Carbon Footprint Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">Approximately 31-47% of residential home energy usage is for heating and cooling. Heating can be provided either by gas or electricity.</div>
                  <div className="p2">Most room and central heaters use gas, because it has been, until recently, the least expensive fuel, however, new heat pumps are 3-8x more efficient than gas. They also offer better ventilation.</div>
                  <div className="p3">The advantage of heat pumps is that they can be powered by electricity generated from renewable sources such as rooftop solar. Switching to a heat pump is essential to lower your carbon footprint.</div>
                  <div className="p4">The estimated cost range is: $7-$9k for mini-splits and $12-15k for ducted heat pumps.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default HeatingCooling
