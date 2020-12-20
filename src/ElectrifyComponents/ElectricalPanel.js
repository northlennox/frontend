import React from 'react';
import Nav from './../Nav';
// import './ElectrifyComponents.scss';


const ElectricalPanel = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Electrical Panel</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img src="../Electrify/ElectricalPanel.svg" /></div>
                  <div className="electri_text">Not Currently Included in Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">All this juice for electric heat pumps and appliances will need to be routed through your electrical panel. Most homes that currently are dependent on fossil fuels have relatively small electrical panels. A necessary change to enable electrification is installing a 200 amp or 400 amp electrical panel.</div>
                  <div className="p2">There is a wide range of estimates for upgrading electrical panels, however, rebates and special incentives exist to cover the cost. It often makes sense to include this upgrade at the same time as another improvement.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default ElectricalPanel
