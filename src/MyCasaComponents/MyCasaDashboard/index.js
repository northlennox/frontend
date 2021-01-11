//this is where we can create Casa
import React, { Component } from 'react';
import Nav from './../../Nav';
import { Link } from 'react-router-dom';
import ShowHouse from '../HouseContainer/ShowHouse';
import ShowAttic from '../AtticContainer/ShowAttic';
import ShowRoof from '../RoofContainer/ShowRoof';
import ShowSpHeater from '../SpHeaterContainer/ShowSpHeater';
import ShowWaHeater from '../WaHeaterContainer/ShowWaHeater';
import ShowUtility from '../UtilityContainer/ShowUtility';
import './MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';
// import axios from 'axios'
// import Moment from 'react-moment';
import Accordions from './Accordion'


class MyCasaDashboard extends Component {
  constructor(){
    super()
    this.state = {
      roof: '',
      spHeater:'',
      waHeater:'',
      attic:'',
      house: '',
      utility: '',
      myHouse: [],

    }
  }

  componentDidMount(){
    this.getHouseInfo();
  }




    getHouseInfo = async() => {
      console.log('jj');
      // const userId = window.location.pathname.split('/')[2];
      const userId = sessionStorage.getItem('userId')

      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + `${userId}`,  {
          credentials: 'include'
        })
        console.log(response);

        if(!response.ok){
          throw Error(response.statusText)
        }

        const userParsed = await response.json();

        console.log('userParsed', userParsed);

        this.setState({
            house: userParsed.house,
            attic: userParsed.attic,
            roof: userParsed.roof,
            waHeater: userParsed.waHeater,
            spHeater: userParsed.spHeater,
            utility: userParsed.utility,
            myHouse: userParsed.house
        });



      }catch(err){
        return err
      }
    }


    deleteMyHouse = async(id, e) => {
      // e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }


        this.setState({
          house : null
        });
        console.log('this.state.house', this.state.house);
        // this.props.history.push('/mycasa/' + userId);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }

    deleteMyAttic = async(id, e) => {
      e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/Attic/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.setState({
          attic : null
        })

        // this.props.history.push('/mycasa/' + userId);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }
    deleteMyRoof = async(id, e) => {

      e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/roof/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.setState({
          roof : null
        })

      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }
    deleteMyWaHeater = async(id, e) => {
      e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/waheater/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.setState({
          waHeater : null
        })

      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }
    deleteMySpHeater = async(id, e) => {
      e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/spheater/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.setState({
          spHeater : null
        })

      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }
    deleteMyUtility = async(id, e) => {
      e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/utility/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.setState({
          utility : null
        })
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }


  render(){
      const userId = sessionStorage.userId;
      console.log('hihi', this.state.house);
    return(
      <>
        <Nav />
        <div className="myCasaContainer">
          <div className="titleContainer myCasaTitle">
            <div className="title h2">My Casa</div>
            <div className="subtitle h4">Explore home energy improvements to increase comfort, efficiency, safety and health, and lower carbon footprint.</div>
          </div>
        <div className="showContainer">
          <div className="showRow">
            <div className="items">
              { this.state.house !== null
              ?

               <ShowHouse house={this.state.house} deleteMyHouse={this.deleteMyHouse}/>

              :

              <Link to="/mycasa/house/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">House Details</div>
              </Link>
              }
            </div>
            <div className="items">
              { this.state.roof !== null
              ?
              <ShowRoof roof={this.state.roof} deleteMyRoof={this.deleteMyRoof} />
              :
              <Link to="/mycasa/roof/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">Roof Details</div>
              </Link>
              }
            </div>
            <div className="items">
              { this.state.attic !== null
              ?
              <ShowAttic attic={this.state.attic} deleteMyAttic={this.deleteMyAttic}/>
              :
              <Link to="/mycasa/attic/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">Attic Insulation Details</div>
              </Link>
              }
            </div>
          </div>
          <div className="showRow">
            <div className="items">
              { this.state.waHeater !== null
              ?
              <ShowWaHeater waHeater={this.state.waHeater} deleteMyWaHeater={this.deleteMyWaHeater}/>
              :
              <Link to="/mycasa/waheater/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">Water Heater Details</div>
              </Link>
              }
            </div>
            <div className="items">
              { this.state.spHeater !== null
              ?
              <ShowSpHeater spHeater={this.state.spHeater} deleteMySpHeater={this.deleteMySpHeater}/>
              :
              <Link to="/mycasa/spheater/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">Primary Heater Details</div>
              </Link>
              }
            </div>
            <div className="items">
              { this.state.utility !== null
              ?
              <ShowUtility utility={this.state.utility} deleteMyUtility={this.deleteMyUtility}/>
              :
              <Link to="/mycasa/utility/create" className="blankContainer">
                <div className="blankFrame"><img className="placer" src="./../../upload.svg" /></div>
                <div className="blankLabel">Utility Bills</div>
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}
export default MyCasaDashboard




// <ShowHouse house={this.state.house} deleteMyHouse={this.deleteMyHouse}/>
