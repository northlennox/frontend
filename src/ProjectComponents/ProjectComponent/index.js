import React, { Component } from 'react';
import Nav from './../../Nav';
import ProjectContainer from './../ProjectContainer'

import { Link, withRouter } from 'react-router-dom';

class ProjectComponent extends Component {
  constructor(){
    super()
    this.state = {
      allHouses: [],
      house: '',

    }
  }

  componentDidMount(){
    this.getOneHouse()
    this.getAllHouses();
  }



  getAllHouses = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/allHouses`, {
          credentials: 'include'
        })


        if(!response.ok){
          throw Error(response.statusText)
        }

        const responseParsed = await response.json();

        this.setState({
          allHouses : responseParsed.data
        })

      }catch(err){
        console.log('fetching getMyhouse fail');
      }
    }

  getOneHouse = async() => {
    const userId = window.location.pathname.split('/')[2];

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/${userId}`,  {
        credentials: 'include'
      })
          console.log('dfdfd', response);
      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          house: houseParsed.data,
          // authorId: localStorage.getItem('authorId')
      })

    }catch(err){
      return err
    }
  }


  deleteHouse = async(id, e) => {
    // e.preventDefault();
    try {
      const deleteHouse = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + id, {
        method: 'DELETE',
        // credentials: 'include'
      })


      // const parsedResponse = await deleteHouse.json();
      this.setState({
        allHouses: this.state.allHouses.filter((house) => house._id !== id)
      })

      this.props.history.push('/mycasa/start')

    }catch(err){
      console.log(err)
    }
  }


  render(){

    return(
      <div>
        <Nav />
        {
          // this.state.house === undefined
          false
          ?
          <div className="project_container">
            <div className="h2">Projects</div>
            <div className="p1">Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
            <div className="center text">YPlease, create a house first on My Casa page</div>

         </div>
      :
        <ProjectContainer />

      }

      </div>
    )
  }
}

export default withRouter(ProjectComponent)
