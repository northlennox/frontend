import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';

class AdiminHome extends Component {
  constructor(){
    super()
    this.state = {
      house: {
        houseImg: '',
        address : '',
        city: '',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
      }

    }
  }

  // componentDidMount(){
  //   this.getHouseInfo()
  // };
  //
  //   getHouseInfo = async() => {
  //     let userId = sessionStorage.getItem('userId');
  //     try{
  //       const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`, {
  //         credentials: 'include',
  //       });
  //
  //       if(!response.ok){
  //         throw Error(response.statusText)
  //       }
  //
  //       const userParsed = await response.json();
  //
  //
  //       this.setState({
  //         house: {
  //           houseImg: userParsed.house.houseImg,
  //           address : userParsed.house.address,
  //           city: userParsed.house.city,
  //           state: userParsed.house.state,
  //           zipcode: userParsed.house.zipcode,
  //           houseYear: userParsed.house.houseYear,
  //           houseSqft: userParsed.house.houseSqft,
  //         }
  //       })
  //
  //       }catch(err){
  //       return err
  //     }
  //   }
  // }
  render(){
    return(
      <div>
        <AdminNav />
        <div>dashboard?</div>
      </div>
    )
  }
}


export default AdiminHome
