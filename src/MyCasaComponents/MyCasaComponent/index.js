import React, { Component } from 'react';
import Nav from './../../Nav';
import MyCasaContainer from './../MyCasaContainer'
import './MyCasa.scss';
import { Link, withRouter } from 'react-router-dom';

class MyCasaComponent extends Component {
  constructor(){
    super()
    this.state = {
      allHouses: [],
      house: '',

    }
  }

  componentDidMount(){
    this.getOneHouse()
    // this.getAllHouses();
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
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();
      console.log(houseParsed);
      this.setState({
          house: houseParsed.house,
          roof: houseParsed.roof,
          attic : houseParsed.attic
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

      this.props.history.push('/mycasa')

    }catch(err){
      console.log(err)
    }
  }


  render(){

    return(
      <div>

        {
            this.state.house
          ?
          <div>
          <Nav />
          <div className="myCasa_container">
            <div className="h2">My Casa</div>
            <div className="p1">See the status of your house energy assets and how they compare on quality, efficiency and age to new technologies.</div>
            <div className="center text">You did not add any house information</div>
            <div className="center"><Link to="/mycasa/start" className="submitBtn" style={{width: '490px'}}>Add House</Link></div>
          </div>
         </div>
      :
        <MyCasaContainer />

      }

      </div>
    )
  }
}

export default withRouter(MyCasaComponent)
