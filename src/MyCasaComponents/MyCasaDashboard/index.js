//this is where we can create Casa
import React, { Component } from 'react';
import Nav from './../../Nav';
import { Link } from 'react-router-dom';
import ShowHouse from '../HouseContainer/ShowHouse';
import ShowAttic from '../AtticContainer/ShowAttic';
// import axios from 'axios'
// import Moment from 'react-moment';


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
      // open: false
    }
  }

  componentDidMount(){
    this.getHouseInfo();
  }




    getHouseInfo = async() => {
      console.log('jj');
      // const userId = window.location.pathname.split('/')[2];
      const userId = localStorage.getItem('userId')

      try{
        const response = await fetch(`http://localhost:9000/api/v1/users/` + `${userId}`,  {
          credentials: 'include'
        })
        console.log(response);

        if(!response.ok){
          throw Error(response.statusText)
        }

        const userParsed = await response.json();

        this.setState({
            house: userParsed.house,
            attic: userParsed.attic,
            roof: userParsed.roof,
            waHeater: userParsed.waHeater,
            spHeater: userParsed.spHeater,
            utility: userParsed.utility,
        })

      }catch(err){
        return err
      }
    }

    deleteMyHouse = async(id, e) => {
      e.preventDefault()

      try{
        const userId = localStorage.getItem('userId');

        const response = await fetch(`http://localhost:9000/api/v1/house/` + `${userId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        const responseParsed = await response.json();

        this.props.history.push('/mycasa/' + userId);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }



  render(){
    console.log('00', this.state.spHeater);
    return(
      <>
        <Nav />
        <div id="title">My Casa</div>
        <div id="subtitle">Explore home energy improvements to increase comfort, efficiency, safety and health, and lower carbon footprint.</div>

        <div className="container_mycasa_dashboard">
          <div className="row_mycasa_dashboard">
            <div className="items">
              { this.state.house !== null
              ?
              <div>
                <ShowHouse house={this.state.house} deleteMyHouse={this.deleteMyHouse}/>
              </div>
              :
              <Link to="/mycasa/house/create"><div className="no_posting"></div></Link>
              }
            </div>
            <div className="items">
              { this.state.attic !== null
              ?
              <div>
                <ShowAttic attic={this.state.attic} />
              </div>
              :
              <Link to="/mycasa/attic/create"><div className="no_posting"></div></Link>
              }
            </div>
            <div className="items">
              { this.state.house !== null
              ?
              <div>
              <Link to="/mycasa/house/show">
                <div><img src={`http://localhost:9000/` + this.state.house.houseImg } /></div>
              </Link>
                <div>{this.state.house.address}</div>
              </div>
              :
              <Link to="/mycasa/house/create"><div className="no_posting"></div></Link>
              }
            </div>
          </div>
          <div className="row_mycasa_dashboard">
            <div className="items">
              { this.state.house !== null
              ?
              <div>
              <Link to="/mycasa/house/show">
                <div><img src={`http://localhost:9000/` + this.state.house.houseImg } /></div>
              </Link>
                <div>{this.state.house.address}</div>
              </div>
              :
              <Link to="/mycasa/house/create"><div className="no_posting"></div></Link>
              }
            </div>
            <div className="items">
              { this.state.house !== null
              ?
              <div>
              <Link to="/mycasa/house/show">
                <div><img src={`http://localhost:9000/` + this.state.house.houseImg } /></div>
              </Link>
                <div>{this.state.house.address}</div>
              </div>
              :
              <Link to="/mycasa/house/create"><div className="no_posting"></div></Link>
              }
            </div>
            <div className="items">
              { this.state.house !== null
              ?
              <div>
              <Link to="/mycasa/house/show">
                <div><img src={`http://localhost:9000/` + this.state.house.houseImg } /></div>
              </Link>
                <div>{this.state.house.address}</div>
              </div>
              :
              <Link to="/mycasa/house/create"><div className="no_posting"></div></Link>
              }
            </div>
          </div>
        </div>

      </>
    )
  }
}
export default MyCasaDashboard
