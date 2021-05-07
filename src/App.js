import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";

//Landing Page
import { LandingPage } from "./LandingPage/LandingPage";

//Nav
import Nav from "./Nav/index";
// Footer
import Footer from "./Footer/index";

import MainContainer from "./MainContainer";
import WelcomeComponent from "./WelcomeComponent";
import RegisterLoginContainer from "./RegisterLoginContainer";
import Register from "./RegisterLoginContainer/Register.js";
import HomeContainer from "./HomeContainer";
import MyCasaDashboard from "./MyCasaComponents/MyCasaDashboard";
import MyProjectComponent from "./MyProjectComponents";
// import ProjectPlan from './MyProjectComponents/ProjectPlan';
import MyAccountContainer from "./MyAccountComponents/MyAccountContainer";
import EditMyAccount from "./MyAccountComponents/EditMyAccount";
import ViewTermsOfUse from "./MyAccountComponents/ViewTermsOfUse";

import ClothesDrying from "./ElectrifyComponents/ClothesDrying";
import Cooking from "./ElectrifyComponents/Cooking";
import ElectricalPanel from "./ElectrifyComponents/ElectricalPanel";
import ElectricVehicle from "./ElectrifyComponents/ElectricVehicle";
import EnergyGeneration from "./ElectrifyComponents/EnergyGeneration";
import HeatingCooling from "./ElectrifyComponents/HeatingCooling";
import HotWater from "./ElectrifyComponents/HotWater";
import Weatherization from "./ElectrifyComponents/Weatherization";

import CreateHouse from "./MyCasaComponents/HouseContainer/CreateHouse";
import CreateRoof from "./MyCasaComponents/RoofContainer/CreateRoof";
import CreateAttic from "./MyCasaComponents/AtticContainer/CreateAttic";
import CreateWaHeater from "./MyCasaComponents/WaHeaterContainer/CreateWaHeater";
import CreateSpHeater from "./MyCasaComponents/SpHeaterContainer/CreateSpHeater";
import CreateUtility from "./MyCasaComponents/UtilityContainer/CreateUtility";

import EditHouse from "./MyCasaComponents/HouseContainer/EditHouse";
import EditRoof from "./MyCasaComponents/RoofContainer/EditRoof";
import EditAttic from "./MyCasaComponents/AtticContainer/EditAttic";
import EditWaHeater from "./MyCasaComponents/WaHeaterContainer/EditWaHeater";
import EditSpHeater from "./MyCasaComponents/SpHeaterContainer/EditSpHeater";
import EditUtility from "./MyCasaComponents/UtilityContainer/EditUtility";

import AdminContainer from "./Admin/AdminHome";

const My404 = () => {
  return <div>It cho ke!</div>;
};

const App = (props) => {
  // if (sessionStorage.getItem('userId') !== null) {
  //   console.log('USER IS LOGGED IN')
  // } else if(props.location.pathname !== '/') {
  //   props.history.push('/')
  // }
  /** 
 //Landing Page


*/

  return (
    <main>
      <Nav />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={RegisterLoginContainer} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/home/welcome" component={WelcomeComponent} />
        <Route exact path="/myaccount/:id" component={MyAccountContainer} />
        <Route exact path="/myaccount/:id/edit" component={EditMyAccount} />
        <Route exact path="/agreement" component={ViewTermsOfUse} />
        <Route exact path="/admin/home" component={AdminContainer} />
        //Elecctrify
        <Route exact path="/home/clothesdrying" component={ClothesDrying} />
        <Route exact path="/home/cooking" component={Cooking} />
        <Route exact path="/home/electricalpanel" component={ElectricalPanel} />
        <Route exact path="/home/electrivehicle" component={ElectricVehicle} />
        <Route
          exact
          path="/home/energygeneration"
          component={EnergyGeneration}
        />
        <Route exact path="/home/heatingcooling" component={HeatingCooling} />
        <Route exact path="/home/hotwater" component={HotWater} />
        <Route exact path="/home/weatherization" component={Weatherization} />
        //MyCasa
        <Route exact path="/mycasa/:id" component={MyCasaDashboard} />
        <Route exact path="/mycasa/house/create" component={CreateHouse} />
        <Route exact path="/mycasa/roof/create" component={CreateRoof} />
        <Route exact path="/mycasa/attic/create" component={CreateAttic} />
        <Route
          exact
          path="/mycasa/waheater/create"
          component={CreateWaHeater}
        />
        <Route
          exact
          path="/mycasa/spheater/create"
          component={CreateSpHeater}
        />
        <Route exact path="/mycasa/utility/create" component={CreateUtility} />
        <Route exact path="/mycasa/house/edit" component={EditHouse} />
        <Route exact path="/mycasa/roof/edit" component={EditRoof} />
        <Route exact path="/mycasa/attic/edit" component={EditAttic} />
        <Route exact path="/mycasa/waheater/edit" component={EditWaHeater} />
        <Route exact path="/mycasa/spheater/edit" component={EditSpHeater} />
        <Route exact path="/mycasa/utility/edit" component={EditUtility} />
        //MyProject
        <Route exact path="/MyProject/:id" component={MyProjectComponent} />
      </Switch>
      <Footer />
    </main>
  );
};

export default withRouter(App);
// <Route exact path="/MyProject/:id/plan" component = { ProjectPlan} />

//
