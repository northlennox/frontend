import React, { Component }  from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import MainContainer from './MainContainer';
import RegisterLoginContainer from './RegisterLoginContainer';
import HomeContainer from './HomeContainer';
import MyCasaDashboard from './MyCasaComponents/MyCasaDashboard';

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
      </Switch>
    </main>
  )
}

export default withRouter(App);
