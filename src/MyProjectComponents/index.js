//if no house, add house please page
//otherwise, exam result
//show -> edit button ->  MyCasaDashboard
//this is where we can create Casa
import React, { Component } from 'react';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import Exam from './Exam';



class MyProjectComponent extends Component {
  constructor(){
    super()
    this.state = {
      roof: '',
      spHeater:'',
      waHeater:'',
      attic:'',
      house: '',
      utility: '',
      open: false
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

        console.log('$$$',this.state.house);
        if(this.state.house !== null && this.state.attic !== null && this.state.waHeater !== null){
          this.state.open = true
        }

      }catch(err){
        return err
      }
    }

  render(){
    const userId = localStorage.getItem('userId')

    return(
      <>
        <Nav />
        <div id="title">My Project</div>
        <div id="subtitle">Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
        {
          !this.state.open
          ?
          <div>
            <div>Please add house info</div>
            <Link to={`/mycasa/${userId}`}>My Casa</Link>
          </div>
          :
          <div>
            <Exam house={this.state.house} attic={this.state.attic} spHeater={this.state.spHeater} waHeater={this.state.waHeater} />
          </div>

        }

      </>
    )
  }
}
export default MyProjectComponent


// this.state.house && this.state.attic &&
// this.state.roof && this.state.spHeater &&
// this.state.waHeater && this.state.utility
