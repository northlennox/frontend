import React, { Component } from 'react';
import Nav from '../Nav';
import { Link } from 'react-router-dom';

class HomeContainer extends Component {
  constructor(){
    super()
    this.state = {
      userinfo: {
        email:'',
        password: '',
        name: '',
      }
    }
  }

  componentDidMount(){
    this.getUserInfo();
  }

  getUserInfo = async() => {
      const userId = localStorage.getItem('userId');

      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/` + userId, {
          credentials: 'include'
        })

        if(!response.ok){
          throw Error(response.statusText)
        }


        const parsedResponse = await response.json();

        this.setState({
          userinfo: parsedResponse.data
        })

      }catch(err){
        console.log('getuserinfo func fail', err);
      }
  }



  render(){
    console.log(this.state.userinfo);
    return (
      <div>
        <Nav />
        <div>Electrify</div>
        <div>Explore home energy improvements to increase comfort, efficiency, safety and health, and lower carbon footprint</div>
          <Link to="/home/weatherization">
            <div className="electrify_container">
              <div><img src="./web/Weatherization_web.png" /></div>
              <div className="electri_items">Weatherization</div>
            </div>
          </Link>
          <Link to="/home/hotwater">
            <div className="electrify_container">
              <div><img src="./web/HotWater_web.png"/></div>
              <div className="electri_items">Hot Water</div>
            </div>
          </Link>
          <Link to="/home/heatingcooling">
            <div className="electrify_container">
              <div><img src="./web/HeatingCooling_web.png" /></div>
              <div className="electri_items">Heating Cooling</div>
            </div>
          </Link>
          <Link to="/home/cooking">
            <div className="electrify_container">
              <div><img src="./web/Cooking_web.png"/></div>
              <div className="electri_items">Cooking</div>
            </div>
          </Link>
          <Link to="/home/clothesdrying">
            <div className="electrify_container">
              <div><img src="./web/ClothesDrying_web.png" /></div>
              <div className="electri_items">Clothes Drying</div>
            </div>
          </Link>
          <Link to="/home/energygeneration">
            <div className="electrify_container">
              <div><img src="./web/EnergyGeneration_web.png"/></div>
              <div className="electri_items">Energy Generation</div>
            </div>
          </Link>

          <Link to="/home/electricalpanel">
            <div className="electrify_container">
              <div><img src="./web/ElectricalPanel_web.png"/></div>
              <div className="electri_items">Electrical Panel</div>
            </div>
          </Link>
          <Link to="/home/electrivehicle">
            <div className="electrify_container">
              <div><img src="./web/ElectricVehicle_web.png"/></div>
              <div className="electri_items">Electric Vehicle</div>
            </div>
          </Link>
      </div>
    )
  }
}

export default HomeContainer
