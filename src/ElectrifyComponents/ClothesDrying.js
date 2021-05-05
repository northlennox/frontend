import React from 'react';
import Nav from './../Nav';

const ClothesDrying = () => {

  return(
    <div>
      <Nav />
      <div className="electrify_container">
        <div className="h3">Clothes Drying</div>
        <div className="item_container">
          <div className="img_sub">
            <div className="electri_box"><img className="img" src="../Electrify/ClothesDrying.svg" /></div>
            <div className="electri_text">Not Currently Included in Rating</div>
          </div>
          <div className="text_sub">
            <div className="p1">Drying clothes requires a lot of dry heat. Gas is a good fuel for that. From a climate perspective, clothes drying is not responsible for a substantial amount of emissions. Approximately 4% of residential home energy usage is for laundry. At this time, we have excluded it from our ratings.</div>
            <div className="p2">A true all electric home with zero emissions would exclude gas for clothes drying. Luckily, there are excellent alternatives. The same heat pump technology for water heating and space heating has been applied to clothes drying. The units today still take longer to dry clothes than gas, but they are rapidly improving</div>
            <div className="p3">The estimated cost range is $1000-$2000.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothesDrying;
