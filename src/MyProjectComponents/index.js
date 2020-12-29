import React, { Component } from 'react';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import Exam from './Exam';
import './MyProject.scss';



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
        <div className="projectContainer">
          <div className="titleContainer">
            <div className="title h2">My Project</div>
            <div className="subtitle h4">Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
          </div>
          {
            !this.state.open?
            <div className="addMessage">
              <span style={{marginRight: '0.5vw'}}>Please, create a house first on</span>
              <span style={{marginRight: '0.5vw'}}><Link to={`/mycasa/${userId}`} className="links">My Casa</Link></span>
              <span>page</span>
            </div>
            :
            <div>
              <Exam house={this.state.house} attic={this.state.attic} spHeater={this.state.spHeater} waHeater={this.state.waHeater} />
            </div>

          }
        </div>
      </>
    )
  }
}
export default MyProjectComponent


// this.state.house && this.state.attic &&
// this.state.roof && this.state.spHeater &&
// this.state.waHeater && this.state.utility
