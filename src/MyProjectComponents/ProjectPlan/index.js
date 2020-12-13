import React, { Component } from 'react';
import Nav from '../../Nav';
import { Link } from 'react-router-dom';

class ProjectPlan extends Component {
  constructor(){
    super()
    this.state = {
      roof: '',
      spHeater:'',
      waHeater:'',
      attic:'',
      house: '',
      utility: '',
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

  render(){
    const userId = localStorage.getItem('userId')
    return(
      <>
      <Nav />
      <h1>Project</h1>
      <div>Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
      <div>house info</div>
      <h3>Recommended Timeline</h3>
      <div></div>
      </>
    )
  }
}
export default ProjectPlan
