import React from "react";
import Nav from "./../Nav";

const ElectricVehicle = (props) => {
  return (
    <div>
      <Nav />
      <div className="electrify_container">
        <div className="h3">Electric Vehicle</div>
        <div className="item_container">
          <div className="img_sub">
            <div className="electri_box">
              <img className="img" src="../Electrify/ElectricVehicle.svg" />
            </div>
            <div className="electri_text">Not Included in Rating</div>
          </div>
          <div className="text_sub">
            <div className="p1">
              One of the advantages of having an all-electric home with solar is
              that, if sized correctly, the solar power system can generate
              enough electricity to charge an electric car with no energy bills
              and zero emissions.
            </div>
            <div className="p2">
              To charge an electric car, add approximately 2kw to your solar
              design and have an electrician install a Level 2 charger.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricVehicle;
