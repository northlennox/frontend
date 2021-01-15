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
      open: false,
      waGrade : {
        waHeaterAge : '',
        waHeatertype : '',
        waEfficency: '',
        waGradeColor: '',
        waGradeLetter: '',
      },
      spGrade : {
        spHeaterAge : '',
        spHeatertype : '',
        spEfficency: '',
        spGradeColor: '',
        spGradeLetter: '',
      }
    }
  }

  componentDidMount(){
    this.getHouseInfo();
  }


    getHouseInfo = async() => {

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

        this.setState({
            house: userParsed.house,
            attic: userParsed.attic,
            roof: userParsed.roof,
            waHeater: userParsed.waHeater,
            spHeater: userParsed.spHeater,
            utility: userParsed.utility,
        })

        console.log('$$$',(this.state.house !== null && this.state.attic !== null && this.state.waHeater !== null));
        if(this.state.house !== null && this.state.attic !== null && this.state.waHeater !== null){
          this.setState({
            open : true
          })
          this.getWaGrade();
          this.getSpGrade();
        }

      }catch(err){
        return err
      }
    }

    getWaGrade = async() => {
      let waHeatertype = this.state.waHeater.waHeatertype;
      let waHeaterAge = 2020 - Number(this.state.waHeater.waHeaterYear);
      let waEfficency = '';
      let waGradeColor = '';
      let waGradeLetter = '';

      if(waHeatertype === "Natural Gas Storage"){
        waEfficency = 0.55;
        waGradeColor = 'red';
        if(waHeaterAge < 10){
          waGradeLetter = 'C';
        }else{
          waGradeLetter = 'D';
        }
      }else if(waHeatertype === "Natural Gas Tankless"){
        waEfficency = 0.9;
        waGradeColor = 'red';
        if(waHeaterAge < 15){
          waGradeLetter = 'C';
        }else{
          waGradeLetter = 'D';
        }
      }else if(waHeatertype === "Electric Storage"){
        waEfficency = 0.9;
        waGradeColor = 'green';
        if(waHeaterAge < 10){
          waGradeLetter = 'C';
        }else{
          waGradeLetter = 'D';
        }
      }else if(waHeatertype === "Electric Heat Pump"){
        waEfficency = 2.5;
        waGradeColor = 'green';
        if(waHeaterAge < 10){
          waGradeLetter = 'A';
        }else{
          waGradeLetter = 'B';
        }
      }
      this.setState({
        waGrade : {
          waHeaterAge : waHeaterAge,
          waHeatertype : waHeatertype,
          waEfficency: waEfficency,
          waGradeColor: waGradeColor,
          waGradeLetter: waGradeLetter,
        }
      })
    }

    getSpGrade = async() => {
      let spHeatertype = this.state.spHeater.spHeaterType;
      let spHeaterAge = 2020 - Number(this.state.spHeater.spHeaterYear);
      let spEfficency = '';
      let spGradeColor = '';
      let spGradeLetter = '';

      this.setState({
        spGrade : {
          spHeaterAge : spHeaterAge,
          spHeatertype : spHeatertype,
          spEfficency: spEfficency,
          spGradeColor: spGradeColor,
          spGradeLetter: spGradeLetter,
        }
      })
    }

  render(){
    const userId = sessionStorage.getItem('userId')

    return(
      <>
        <Nav />
          {
            !this.state.open ?
            <div className="projectContainer">
              <div className="titleContainer">
                <div className="title h2">My Project</div>
                <div className="subtitle h4">Schedule repairs and upgrades at optimal times to maximize savings and prior to emergencies.</div>
              </div>
              <div className="addMessage">
                <span style={{marginRight: '0.5vw'}}>Please, create a house first on</span>
                <span style={{marginRight: '0.5vw'}}><Link to={`/mycasa/${userId}`} className="links">My Casa</Link></span>
                <span>page</span>
              </div>
            </div>
            :
            <Exam
              waHeaterAge={this.state.waGrade.waHeaterAge}
              waHeatertype={this.state.waGrade.waHeatertype}
              waEfficency={this.state.waGrade.waEfficency}
              waGradeColor={this.state.waGrade.waGradeColor}
              waGradeLetter={this.state.waGrade.waGradeLetter}
              spHeaterAge={this.state.spGrade.spHeaterAge}
              spHeatertype={this.state.spGrade.spHeatertype}
              spEfficency={this.state.spGrade.spEfficency}
              spGradeColor={this.state.spGrade.spGradeColor}
              spGradeLetter={this.state.spGrade.spGradeLetter}
             />
          }
      </>
    )
  }
}
export default MyProjectComponent
