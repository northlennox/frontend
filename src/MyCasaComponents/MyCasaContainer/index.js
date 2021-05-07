import React, { Component } from 'react';
import Nav from './../../Nav';
import { Link } from 'react-router-dom';
import { Collapse, Button, Accordion, Card } from 'react-bootstrap';
// import axios from 'axios'
// import Moment from 'react-moment';
import './MyCasaContainer.scss';

class MyCasaContainer extends Component {
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
    this.getOneHouse();
    this.getOneRoof();
    this.getOneAttic();
    this.getOneWaheater();
    this.getOneSpheather();
    this.getOneUtility();
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

  getOneRoof = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/roof/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          roof: houseParsed.data,
          // authorId: localStorage.getItem('authorId')
      })

    }catch(err){
      return err
    }
  }

  getOneAttic = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/attic/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          attic: houseParsed.data,
          // authorId: localStorage.getItem('authorId')
      })

    }catch(err){
      return err
    }
  }

  getOneWaheater = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/waheater/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          waheater: houseParsed.data,
          // authorId: localStorage.getItem('authorId')
      })

    }catch(err){
      return err
    }
  }

  getOneSpheather = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/spheater/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          spheater: houseParsed.data,
          // authorId: localStorage.getItem('authorId')
      })

    }catch(err){
      return err
    }
  }

  getOneUtility = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/utility/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          utility: houseParsed.data,
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
        <div className="create_container">
          <div className="create_row">
            <div className="create_items">

              { this.state.house !== null
              ?
              <Link to="/mycasa/show/house">
                <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.house.houseImg } />
              </Link>
              :
              <Link to="/mycasa/create/home"><div className="noposting"></div></Link>
              }

              <div className="tag">Home Details</div>
            </div>
            <div className="create_items">
              <Link className="link" to="/mycasa/create/roof">
                { this.state.roof !== null
                ?

                <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.roof.roofImg } />

                :
                <div className="noposting"></div>
                }
              </Link>
              <div className="tag">Roof Details</div>
            </div>
            <div className="create_items">
                <Link to="/mycasa/create/attic">
                { this.state.attic !== null
                ?
                <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.attic.atticImg } />
                :
                <div className="noposting"></div>
                }
                </Link>
              <div className="tag">Attic Insulation Details</div>
              </div>
          </div>
          <div className="create_row">
            <div className="create_items">
              <Link to="/mycasa/create/waheater">
                { this.state.waheater !== null
                ?
                <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.waheater.waheaterImg } />
                :
                <div className="noposting"></div>
                }
              </Link>
              <div className="tag">Water Heater Details</div>
            </div>
            <div className="create_items">
              <Link to="/mycasa/create/spheater">
                { this.state.spheater !== null
                ?
                <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.spheater.spHeaterImg } />
                :
                <div className="noposting"></div>
                }
              </Link>
              <div className="tag">Primary Heater Details</div>
            </div>
            <div className="create_items">
              <Link to="/mycasa/create/utility">
                { this.state.utility !== null
                ?
                <div className="frame"><img className="img" src={`${process.env.REACT_APP_API}/` + this.state.utility.utilityImg } /></div>
                :
                <div className="noposting"></div>
                }
              </Link>
              <div className="tag">Utility Bills</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MyCasaContainer

//
