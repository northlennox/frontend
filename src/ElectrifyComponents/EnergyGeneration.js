import React from 'react';
import Nav from './../Nav';
<<<<<<< HEAD
import './ElectrifyComponents.scss';


const EnergyGeneration = (props) => {

    return(
          <div>
            <Nav />
            <div className="electrify_container">
              <div className="title">Energy Generation</div>
              <div className="item_container">
                <div className="img_sub">
                  <div className="electri_box"><img src="./../web/EnergyGeneration_web.png" /></div>
                  <div className="electri_text">Impacts Carbon Footprint Rating</div>
                </div>
                <div className="text_sub">
                  <div className="p1">Rooftop solar is often the first thing people consider when trying to find ways to reduce their carbon footprint, and it makes sense.</div>
                  <div className="p2"> At Electricasa, we like to think big, and that’s why we recommend that solar actually be the last decision a homeowner makes. The reason for this is that solar is sized based on current energy consumption. If over half of your energy consumption is fossil fuels, the size of the solar array designed and installed will actually only cover part of your carbon footprint. Better to first electrify your house, and then consider solar. That way, the solar power system can be sized to meet 100% of your energy needs and not just a fraction. By then, you may have an electric car to charge as well.</div>
                  <div className="p3">The estimated cost range is $3-4 per kW.</div>
                </div>
              </div>
            </div>
          </div>
        )

}


export default EnergyGeneration
=======
// import './ElectrifyComponents.scss';

const EnergyGeneration = () => {

  return(
    <div>
      <Nav />
      <div className="electrify_container">
        <div className="h3">Energy Generation</div>
        <div className="item_container">
          <div className="img_sub">
            <div className="electri_box"><img className="img" src="../Electrify/EnergyGeneration.svg" /></div>
            <div className="electri_text">Impacts Electrification Rating</div>
          </div>
          <div className="text_sub">
            <div className="p1">Rooftop solar is often the first thing people consider when trying to find ways to reduce their carbon footprint, and it makes sense.</div>
            <div className="p2"> At Electricasa, we like to think big, and that’s why we recommend that solar actually be the last decision a homeowner makes. The reason for this is that solar is sized based on current energy consumption. If over half of your energy consumption is fossil fuels, the size of the solar array designed and installed will actually only cover part of your carbon footprint. Better to first electrify your house, and then consider solar. That way, the solar power system can be sized to meet 100% of your energy needs and not just a fraction. By then, you may have an electric car to charge as well.</div>
            <div className="p3">The estimated cost range is $3-4 per kW.</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EnergyGeneration;
>>>>>>> 2fbb785c0c6f29901581b02c45551440a3e4b70c
