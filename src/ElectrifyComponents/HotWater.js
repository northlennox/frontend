import React from 'react';
import Nav from './../Nav';
<<<<<<< HEAD
import './ElectrifyComponents.scss';


const HotWater = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Hot Water</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img src="./../web/HotWater_web.png" /></div>
                  <div className="electri_text">Impacts Building Energy Efficiency Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">Approximately 18-30% of residential home energy usage is for hot water. Water can be heated with gas or electricity.</div>
                  <div className="p2">Most water heaters use gas, because it has been, until recently, the least expensive fuel, however, new heat pump technology water heaters are 3-8x more efficient than gas. They are also safer.</div>
                  <div className="p3">The advantage of heat pump water heaters is that they can be powered by electricity generated from renewable sources such as rooftop solar. Switching to a heat pump water heater is essential to lower your carbon footprint.</div>
                  <div className="p4">The estimated cost range is: $4-6k.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default HotWater
=======

const HotWater = () => {

  return (
      <div>
        <Nav />
        <div className="electrify_container">
          <div className="h3">Hot Water</div>
          <div className="item_container">
            <div className="img_sub">
              <div className="electri_box"><img className="img" src="../Electrify/HotWater.svg" /></div>
              <div className="electri_text">Impacts Electrification Rating</div>
            </div>
            <div className="text_sub">
              <div className="p1">Approximately 18-30% of residential home energy usage is for hot water. Water can be heated with gas or electricity.</div>
              <div className="p2">Most water heaters use gas, because it has been, until recently, the least expensive fuel, however, new heat pump technology water heaters are 3-8x more efficient than gas. They are also safer.</div>
              <div className="p3">The advantage of heat pump water heaters is that they can be powered by electricity generated from renewable sources such as rooftop solar. Switching to a heat pump water heater is essential to lower your carbon footprint.</div>
              <div className="p4">The estimated cost range is: $4-6k.</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HotWater;
>>>>>>> 2fbb785c0c6f29901581b02c45551440a3e4b70c
