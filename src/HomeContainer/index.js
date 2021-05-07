import React, { Component } from "react";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import "./Home.scss";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      userinfo: {
        email: "",
        password: "",
        name: "",
      },
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userId = sessionStorage.getItem("userId");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/` + userId,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const parsedResponse = await response.json();

      this.setState({
        userinfo: parsedResponse.data,
      });
    } catch (err) {
      console.log("getuserinfo func fail", err);
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="homeContainer">
          <div className="titleContainer">
            <div className="title h2">Electrify</div>
            <div className="subtitle h4">
              Explore home energy improvements to increase comfort, efficiency,
              safety and health, and lower carbon footprint.
            </div>
          </div>
          <div className="electrifyContainer">
            <div className="electrifyRow" id="electrifyTop">
              <Link to="/home/weatherization" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      className="iconImg"
                      src="./Electrify/Weatherization.svg"
                    />
                  </div>
                  <div className="iconText">Weatherization</div>
                </div>
              </Link>
              <Link to="/home/hotwater" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img className="iconImg" src="./Electrify/HotWater.svg" />
                  </div>
                  <div className="iconText">Hot Water</div>
                </div>
              </Link>
              <Link to="/home/heatingcooling" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      className="iconImg"
                      src="./Electrify/HeatingCooling.svg"
                    />
                  </div>
                  <div className="iconText">Heating and Cooling</div>
                </div>
              </Link>
              <Link to="/home/cooking" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img className="iconImg" src="./Electrify/Cooking.svg" />
                  </div>
                  <div className="iconText">Cooking</div>
                </div>
              </Link>
            </div>
            <div className="electrifyRow" id="electrifyBtm">
              <Link to="/home/clothesdrying" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      img
                      className="iconImg"
                      src="./Electrify/ClothesDrying.svg"
                    />
                  </div>
                  <div className="iconText">Clothes Drying</div>
                </div>
              </Link>
              <Link to="/home/energygeneration" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      img
                      className="iconImg"
                      src="./Electrify/EnergyGeneration.svg"
                    />
                  </div>
                  <div className="iconText">Energy Generation</div>
                </div>
              </Link>
              <Link to="/home/electricalpanel" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      img
                      className="iconImg"
                      src="./Electrify/ElectricalPanel.svg"
                    />
                  </div>
                  <div className="iconText">Electrical Panel</div>
                </div>
              </Link>
              <Link to="/home/electrivehicle" className="links">
                <div className="iconContainer">
                  <div className="iconBox">
                    <img
                      img
                      className="iconImg"
                      src="./Electrify/ElectricVehicle.svg"
                    />
                  </div>
                  <div className="iconText">Electric Vehicle</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
