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
        spHeaterType : '',
        spEfficency: '',
        spGradeColor: '',
        spGradeLetter: '',
      },
      atticGrade : {
        atticDepth : '',
        atticGrade: '',
        atticGradeColor: ''
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
          this.getAtticGrade();
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
      let spHeaterType = this.state.spHeater.spHeaterType;
      let spHeaterAge = 2020 - Number(this.state.spHeater.spHeaterYear);
      let spEfficency = '';
      let spGradeColor = '';
      let spGradeLetter = '';


      if(spHeaterType === "Central Gas Furnace" || spHeaterType === "Room Gas Furnace" || spHeaterType === "Oil Furnace" || spHeaterType === "Electric Furnace") {
        spEfficency = 0.8;


        if(spHeaterAge < 10){
          spGradeLetter = "C"
          spGradeColor = '#FA910B';
        }else{
          spGradeLetter = "D"
          spGradeColor = '#D22E2E';
        }
      }else{
        spEfficency = 3.0;


        if(spHeaterAge > 10){
          spGradeLetter = "A"
          spGradeColor = '#139929';
        }else{
          spGradeLetter = "B"
          spGradeColor = '#FDC825';
        }
      }


      this.setState({
        spGrade : {
          spHeaterAge : spHeaterAge,
          spHeaterType : spHeaterType,
          spEfficency: spEfficency,
          spGradeColor: spGradeColor,
          spGradeLetter: spGradeLetter,
        }
      })
    }

    getAtticGrade = () => {
      let atticDepth = Number(this.state.attic.atticDepth);
      let atticGrade = '';
      let atticGradeColor = '';

      if(atticDepth === 0){
        atticGrade = 'D';
        atticGradeColor = 'Red';
      }else if(1 <= atticDepth < 6){
        atticGrade = 'C';
        atticGradeColor = 'Orange';
      }


      this.setState({
        atticGrade : {
          atticDepth : atticDepth,
          atticGrade : atticGrade,
          atticGradeColor : atticGradeColor
        }
      })
    }


    // Water heater type “gas tank” efficiency 0.55 range red grade C if year <10, else D
    // Water heater type “gas tankless” efficiency 0.9 range red grade C if year <15, else D
    // Water heater type “electric tank” efficiency 0.9 range green grade C if year <10, else D
    // Water heater type “heat pump” efficiency 2.5 range green grade A if year <10, else B


    // const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
    // Space heater type “furnace” efficiency 0.8 range red grade C if year<10, else D
    // Space heater type “heat pump” efficiency 3.0 range green grade A if year <10, else B
    //


  render(){
    const userId = sessionStorage.getItem('userId')

    return(
      <>
        <Nav />
          {
            !this.state.open ?

            <div className="projectContainer">
              <div className="titleContainer">
                <div className="title h2">Projects</div>
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
              spHeaterType={this.state.spGrade.spHeaterType}
              spEfficency={this.state.spGrade.spEfficency}
              spGradeColor={this.state.spGrade.spGradeColor}
              spGradeLetter={this.state.spGrade.spGradeLetter}
              atticDepth={this.state.atticGrade.atticDepth}
              atticGrade={this.state.atticGrade.atticGrade}
              atticGradeColor={this.state.atticGrade.atticGradeColor}
             />
          }
      </>
    )
  }
}
export default MyProjectComponent
