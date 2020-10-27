import React, { Component }  from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import MainContainer from './MainContainer';
import RegisterLoginContainer from './RegisterLoginContainer';
import HomeContainer from './HomeContainer';
import MyCasaDashboard from './MyCasaComponents/MyCasaDashboard';

import HouseContainer from './MyCasaComponents/HouseContainer';
import CreateAttic from './MyCasaComponents/AtticContainer/CreateAttic';
import EditAttic from './MyCasaComponents/AtticContainer/EditAttic';

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
        <Route exact path="/mycasa" component = { MyCasaDashboard } />
        <Route exact path="/mycasa/house/create" component = { HouseContainer } />
        <Route exact path="/mycasa/attic/create" component = { CreateAttic } />
        <Route exact path="/mycasa/attic/edit" component = { EditAttic } />


      </Switch>
    </main>
  )
}

export default withRouter(App);
