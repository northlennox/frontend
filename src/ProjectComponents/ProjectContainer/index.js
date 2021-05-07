import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from './../../Nav'




class ProjectContainer extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    // this.getOneHouse()
  }


  render(){


    return(
      <div>
        <div>Projects</div>
        <div> Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
        <div>
          <div>
            <div>img</div>
            <div>address</div>
            <div>CHANGE/EDIT</div>
          </div>
          <div>
            <div>Recommended Timeline</div>
          </div>

        </div>
      </div>
    )
  }
}

export default withRouter(ProjectContainer);
