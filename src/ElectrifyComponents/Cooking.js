import React from 'react';
import Nav from './../Nav';
// import './ElectrifyComponents.scss';


const Cooking = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Cooking</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img src="./../web/Cooking_web.png" /></div>
                  <div className="electri_text">Not Currently Included in Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">Some people love cooking with gas and don’t believe it’s possible there could be a better way. That is a fair opinion. From a climate perspective, cooking is not responsible for a substantial amount of emissions. Approximately 6% of residential home energy usage is for cooking. At this time, we have excluded it from our ratings.</div>
                  <div className="p2">A true all electric home with zero emissions would exclude gas for cooking. Luckily, there are excellent alternatives. Induction cooktops are more efficient than gas. They are safer and faster. If replacing your cooking appliance, we recommend looking into induction.</div>
                  <div className="p3">The estimated cost range is $100-1000.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default Cooking
