import React from "react";

//Bootstrap

import "bootstrap/dist/css/bootstrap.css";

// import logo from './logo.svg';
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
//Components
import MainContainer from "./MainContainer";
import WelcomeComponent from "./WelcomeComponent";
import RegisterLoginContainer from "./RegisterLoginContainer";
//Landing Page
import { LandingPage } from "./LandingPage/LandingPage";
//Home Components
import HomeContainer from "./HomeContainer";
import ClothesDrying from "./ElectrifyComponents/ClothesDrying";
import Cooking from "./ElectrifyComponents/Cooking";
import ElectricalPanel from "./ElectrifyComponents/ElectricalPanel";
import ElectricVehicle from "./ElectrifyComponents/ElectricVehicle";
import EnergyGeneration from "./ElectrifyComponents/EnergyGeneration";
import HeatingCooling from "./ElectrifyComponents/HeatingCooling";
import HotWater from "./ElectrifyComponents/HotWater";
import Weatherization from "./ElectrifyComponents/Weatherization";

import MyCasaComponent from "./MyCasaComponents/MyCasaComponent";
import MyCasaContainer from "./MyCasaComponents/MyCasaContainer";
import CreateContainer from "./MyCasaComponents/CreateContainer";
import RoofContainer from "./MyCasaComponents/RoofContainer";
import AtticContainer from "./MyCasaComponents/AtticContainer";
import WaHeaterContainer from "./MyCasaComponents/WaHeaterContainer";
import SpHeaterContainer from "./MyCasaComponents/SpHeaterContainer";
import UtilityContainer from "./MyCasaComponents/UtilityContainer";

//show components
import HouseContainer from "./ShowCasaComponents/HouseContainer";

// edit Components
import EditHouseContainer from "./EditCasaComponents/EditHouseContainer";

import ProjectComponent from "./ProjectComponents/ProjectComponent";

import MyAccountContainer from "./MyAccountComponents/MyAccountContainer";

import Nav from "./Nav";

const My404 = () => {
  return <div>...error...</div>;
};

//find way to not access through links...
const App = (props) => {
  // if (localStorage.getItem('userId') !== null) {
  //   console.log('USER IS LOGGED IN')
  // } else if(props.location.pathname !== '/') {
  //   props.history.push('/')
  // }

  return (
    <>
      <Nav />
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/old" component={MainContainer} />
          <Route exact path="/welcome" component={WelcomeComponent} />
          <Route exact path="/login" component={RegisterLoginContainer} />
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/home/clothesdrying" component={ClothesDrying} />
          <Route exact path="/home/cooking" component={Cooking} />
          <Route
            exact
            path="/home/electricalpanel"
            component={ElectricalPanel}
          />
          <Route
            exact
            path="/home/electrivehicle"
            component={ElectricVehicle}
          />
          <Route
            exact
            path="/home/energygeneration"
            component={EnergyGeneration}
          />
          <Route exact path="/home/heatingcooling" component={HeatingCooling} />
          <Route exact path="/home/hotwater" component={HotWater} />
          <Route exact path="/home/weatherization" component={Weatherization} />

          <Route exact path="/mycasa" component={MyCasaComponent} />
          <Route exact path="/mycasa/start" component={MyCasaContainer} />
          <Route exact path="/mycasa/create/home" component={CreateContainer} />
          <Route exact path="/mycasa/create/roof" component={RoofContainer} />
          <Route exact path="/mycasa/create/attic" component={AtticContainer} />
          <Route
            exact
            path="/mycasa/create/waheater"
            component={WaHeaterContainer}
          />
          <Route
            exact
            path="/mycasa/create/spheater"
            component={SpHeaterContainer}
          />
          <Route
            exact
            path="/mycasa/create/utility"
            component={UtilityContainer}
          />

          <Route exact path="/mycasa/show/house" component={HouseContainer} />
          <Route
            exact
            path="/mycasa/edit/house"
            component={EditHouseContainer}
          />
          <Route exact path="/project" component={ProjectComponent} />

          <Route exact path="/myaccount/:id" component={MyAccountContainer} />

          <Route component={My404} />
        </Switch>
      </main>
    </>
  );
};

export default withRouter(App);
