//this is where we can create Casa
import React, { Component } from 'react';
import Nav from './../../Nav';
import { Link } from 'react-router-dom';
// import axios from 'axios'
// import Moment from 'react-moment';


class MyCasaDashboard extends Component {
  constructor(){
    super()
    this.state = {
      roof: '',
      spheater:'',
      waheater:'',
      attic:'',
      house: '',
      utility: '',
      // open: false
    }
  }

  componentDidMount(){
    // this.getOneHouse();
  }

  getOneHouse = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/${userId}`,  {
        credentials: 'include'
      })

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




  render(){
    return(
      <div>
        <Nav />
        <div id="title">My Casa</div>
        <div id="subtitle">Explore home energy improvements to increase comfort, efficiency, safety and health, and lower carbon footprint.</div>


        { /*this.state.house !== null
        ?
        <Link to="/mycasa/show/house">
          <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.house.houseImg } />
        </Link>
        :
        <Link to="/mycasa/create/home"><div className="noposting"></div></Link>

        */}

        <div className="tag">Home Details</div>
      </div>
    )
  }
}
export default MyCasaDashboard
