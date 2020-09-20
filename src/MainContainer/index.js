import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';

class MainContainer extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <Nav />
        <div>welcom page link</div>
        <div>
          <ul>
          <li>intro</li>
          <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}


export default MainContainer
