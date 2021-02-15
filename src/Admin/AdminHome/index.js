import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';

class AdiminHome extends Component {
  constructor(){
    super()
    this.state = {
      houses: []

    }
  }

  componentDidMount(){
    this.getAllHouses()
  };

    getAllHouses = async() => {

      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house`, {
          credentials: 'include',
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        const userParsed = await response.json();


        this.setState({
          houses: userParsed.data
        })

        }catch(err){
        return err
      }
    }

  render(){
    const houses = this.state.houses
    console.log(houses);
    return(
      <div>
        <AdminNav />
        <div>dashboard?</div>
      </div>
    )
  }
}


export default AdiminHome
