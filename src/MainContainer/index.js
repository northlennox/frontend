import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
// import Footer from '../Footer';
import './Main.scss';

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {}
  }

  render(){
    return (
      <div className="mainContainer">
        <div className="readfirst">
          <Link to="home/welcome" style={{ textDecoration: "none", color: "white", fontWeight: "600"}}>
            Read first >
          </Link>
        </div>
        <div className="section_one_container">
          <img className="col_one" src="../MainImg/ph6.png"/>
          <div className="col_two">
            <div id="h1">Your Home Electrification Advisor</div>
            <div id="text">If you want to increase comfort and lower your carbon footprint, Electricasa is the leading app to guide you toward a better house with zero emissions.</div>
            <div id="btn"><Link to="/login" style={{ textDecoration: "none", color: "white", fontWeight: "600"}}>SIGN UP</Link></div>
          </div>
        </div>
        <div className="section_two_container left">
          <img className="col_one" src="./MainImg/ph1.png"/>
          <div className="col_two">
            <div id="h1">Your Energy Assets</div>
            <div id="text">Track the quality, age and efficiency of the key factors that impact home energy performance. Discover your energy efficiency and carbon footprint ratings relative to other houses.</div>
          </div>
        </div>
        <div className="section_two_container right">
          <img className="col_one" src="./MainImg/ph2.png"/>
          <div className="col_two">
            <div id="h1">Easy To Get Analysis</div>
            <div id="text">Instead of an expensive, in-person energy audit, use your smart phone to take photos of your house to get accurate and actionable insights quickly.</div>
          </div>
        </div>
        <div className="section_two_container left">
          <img className="col_one" src="./MainImg/ph3.png"/>
          <div className="col_two">
            <div id="h1">Plan Your Electrification</div>
            <div id="text">Get a customized timeline that shows you when to do asset upgrades at the end of their useful life. Make a plan that is ready to go, prior to emergencies.</div>
          </div>
        </div>
        <div className="section_two_container right">
          <img className="col_one" src="./MainImg/ph4.png"/>
          <div className="col_two">
            <div id="h1">Resources to Help</div>
            <div id="text">Learn about all the ways to electrify your house, including the expected cost, impact and optimal timing of different upgrades to lower your carbon footprint.</div>
          </div>
        </div>
        <div className="section_two_container left">
          <img className="col_one" src="./MainImg/ph5.png"/>
          <div className="col_two">
            <div id="h1">Stay Current on Rebates and Incentives </div>
            <div id="text">Know when financial incentives change, and be aware of special offers to get electrification upgrades.</div>
          </div>
        </div>
      </div>
    );
  };
};

export default MainContainer;
