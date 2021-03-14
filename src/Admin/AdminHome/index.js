import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';

class AdiminHome extends Component {
  constructor(){
    super()
    this.state = {
      houses: [],
      attic: [],

    }
  }

  componentDidMount(){
    this.getAllHouses();
    this.getAttics();
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

    getAttics = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/attic`, {
          credentials: 'include',
        });

        if(!response.ok){
          throw Error(response.statusText)
        }
        const userParsed = await response.json();

        console.log('hh', userParsed)
        this.setState({
          attic: userParsed.data
        })

        }catch(err){
          return err
      }
    }

  render(){
    const houses = this.state.houses;
    const attic = this.state.attic;
    console.log(attic)
    console.log(houses);
    return(
      <div>
        <AdminNav />
        <div>dashboard?</div>
        <ul>
          {
            houses.map(house => {
              return (<li>
                      <p>{house.address}/{house.city}/{house.state}/{house.zipcode}</p>
                      <p>{attic.atticType}</p>
                      </li>
            )
            })
          }
        </ul>
      </div>
    )
  }
}


export default AdiminHome
