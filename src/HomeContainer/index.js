import React, { Component } from "react";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import "./Home.scss";
import content from "./content.json";
import { Container, Row, Col } from 'react-bootstrap';

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
      <div className="container homeContainer">
        <div className="my-5 homeContainer__titleContainer">
          <h2 className="homeContainer__titleContainer-title">Electrify</h2>
          <p className="homeContainer__titleContainer-subtitle">
            Explore home energy improvements to increase comfort, efficiency, safety and health, and lower carbon footprint.
          </p>
        </div>
        <div className="homeContainer__contentContainer">
          <div className="row homeContainer__contentContainer--list">
            {content.map(( data, i ) => {
              return (
                <Link to={data.to} key={i} className="links col-lg-3 col-md-4 col-sm-6 my-1">
                  <div className="py-5 homeContainer__contentContainer--list--item">
                    <img src={data.img} className="homeContainer__contentContainer--list--item-img"/>
                    <div className="homeContainer__contentContainer--list--item-title">{data.title}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;

        // <div className="homeContainer__electrifyContainer row">
        //   <div className="electrifyRow" id="electrifyTop">
        //     <Link to="/home/weatherization" className="links">
        //       <div className="iconContainer">
        //         <div className="iconBox">
        //           <img
        //             className="iconImg"
        //             src="./Electrify/Weatherization.svg"
        //           />
        //         </div>
        //         <div className="iconText">Weatherization</div>
        //       </div>
        //     </Link>
