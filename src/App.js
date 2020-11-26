import React, { Component }  from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import MainContainer from './MainContainer';
import RegisterLoginContainer from './RegisterLoginContainer';
import HomeContainer from './HomeContainer';
import MyCasaDashboard from './MyCasaComponents/MyCasaDashboard';
import MyProjectComponent from './MyProjectComponents';
import ProjectPlan from './MyProjectComponents/ProjectPlan';

import CreateHouse from './MyCasaComponents/HouseContainer/CreateHouse';
import CreateRoof from './MyCasaComponents/RoofContainer/CreateRoof';
import CreateAttic from './MyCasaComponents/AtticContainer/CreateAttic';
import CreateWaHeater from './MyCasaComponents/WaHeaterContainer/CreateWaHeater';
import CreateSpHeater from './MyCasaComponents/SpHeaterContainer/CreateSpHeater';
import CreateUtility from './MyCasaComponents/UtilityContainer/CreateUtility';

import EditHouse from './MyCasaComponents/HouseContainer/EditHouse';
import EditRoof from './MyCasaComponents/RoofContainer/EditRoof';
import EditAttic from './MyCasaComponents/AtticContainer/EditAttic';
import EditWaHeater from './MyCasaComponents/WaHeaterContainer/EditWaHeater';
import EditSpHeater from './MyCasaComponents/SpHeaterContainer/EditSpHeater';
import EditUtility from './MyCasaComponents/UtilityContainer/EditUtility';




const My404 = () => {
  return (
   <div>
    It cho ke!
   </div>
  )
}

const App = (props) => {

  // if (localStorage.getItem('userId') !== null) {
  //   console.log('USER IS LOGGED IN')
  // } else if(props.location.pathname !== '/') {
  //   props.history.push('/')
  // }


  return(
    <main>
      <Switch>
        <Route exact path="/" component = { MainContainer } />
        <Route exact path="/signup" component = { RegisterLoginContainer } />
        <Route exact path="/home" component = { HomeContainer } />

        //MyCasa
        <Route exact path="/mycasa/:id" component = { MyCasaDashboard } />
        <Route exact path="/mycasa/house/create" component = { CreateHouse } />
        <Route exact path="/mycasa/roof/create" component = { CreateRoof } />
        <Route exact path="/mycasa/attic/create" component = { CreateAttic } />
        <Route exact path="/mycasa/waheater/create" component = { CreateWaHeater } />
        <Route exact path="/mycasa/spheater/create" component = { CreateSpHeater } />
        <Route exact path="/mycasa/utility/create" component = { CreateUtility } />

        <Route exact path="/mycasa/house/edit" component = { EditHouse } />
        <Route exact path="/mycasa/roof/edit" component = { EditRoof } />
        <Route exact path="/mycasa/attic/edit" component = { EditAttic } />
        <Route exact path="/mycasa/waheater/edit" component = { EditWaHeater } />
        <Route exact path="/mycasa/spheater/edit" component = { EditSpHeater } />
        <Route exact path="/mycasa/utility/edit" component = { EditUtility} />

        //MyProject
        <Route exact path="/MyProject/:id" component = { MyProjectComponent } />
        <Route exact path="/MyProject/:id/plan" component = { ProjectPlan} />
      </Switch>
    </main>
  )
}

export default withRouter(App);
