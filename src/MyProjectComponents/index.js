import React, { Component } from 'react';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import Exam from './Exam';
import ProjectPlan from './ProjectPlan';
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
        waGradeNumber: '',
        waHeatertypeShort: '',
        waRecommendation:''
      },
      spGrade : {
        spHeaterAge : '',
        spHeaterType : '',
        spEfficency: '',
        spGradeColor: '',
        spGradeLetter: '',
        spGradeNumber: '',
        spHeaterTypeShort: '',
        spRecommendation: ''
      },
      atticGrade : {
        atticDepth : '',
        atticGrade: '',
        atticGradeColor: '',
        atticInsulation: '',
        atticRecommendation: ''
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


        if(this.state.house !== null && this.state.attic !== null && this.state.waHeater !== null){
          this.setState({
            open : true
          })
          this.getWaGrade();
          this.getSpGrade();
          this.getAtticGrade();
          this.getCarbonFootprint();
        }


      }catch(err){
        return err
      }
    }

    getWaGrade = async() => {
      let today = new Date()
      let currentYear = today.getFullYear();
      let waHeatertype = this.state.waHeater.waHeatertype;
      let waHeaterAge = currentYear - Number(this.state.waHeater.waHeaterYear);
      let waHeaterCondition = this.state.waHeater.waHeaterCondition;
      let waEfficency = '';
      let waGradeColor = '';
      let waGradeLetter = '';
      let waGradeNumber = 0;
      let waHeatertypeShort = '';
      let waRecommendation ='';

      if(waHeatertype === "Natural Gas Storage"){
        waEfficency = 0.55;
        waHeatertypeShort = "Gas"

        if(waHeaterAge < 10){
          waGradeLetter = 'C';
          waGradeNumber = 2
          waGradeColor = 'orange';
        }else{
          waGradeLetter = 'D';
          waGradeNumber = 1
          waGradeColor = 'red';
        }
      }else if(waHeatertype === "Natural Gas Tankless"){
        waEfficency = 0.9;
        waHeatertypeShort = "Gas"

        if(waHeaterAge < 15){
          waGradeLetter = 'C';
          waGradeNumber = 2
          waGradeColor = 'orange';
        }else{
          waGradeLetter = 'D';
          waGradeNumber = 1
          waGradeColor = 'red';
        }
      }else if(waHeatertype === "Electric Storage"){
        waEfficency = 0.9;
        waHeatertypeShort = "Electric";

        if(waHeaterAge < 10){
          waGradeLetter = 'C';
          waGradeNumber = 2;
          waGradeColor = 'orange';
        }else{
          waGradeLetter = 'D';
          waGradeNumber = 1
          waGradeColor = 'red';
        }
      }else if(waHeatertype === "Electric Heat Pump"){
        waEfficency = 2.5;
        waHeatertypeShort = "Electric"

        if(waHeaterAge < 10){
          waGradeLetter = 'A';
          waGradeNumber = 4;
          waGradeColor = 'green';
        }else{
          waGradeLetter = 'B';
          waGradeNumber = 3;
          waGradeColor = 'yellow';
        }
      }

      if(waHeaterCondition === 'No'){
          waRecommendation = currentYear;
      }else{
        if(waHeaterAge >= 10){
          waRecommendation = currentYear;
        }else if(waHeaterAge < 10) {
          waRecommendation = (10 - waHeaterAge) + currentYear
        }
      }
      this.setState({
        waGrade : {
          waHeaterAge : waHeaterAge,
          waHeatertype : waHeatertype,
          waEfficency: waEfficency,
          waGradeColor: waGradeColor,
          waGradeLetter: waGradeLetter,
          waGradeNumber: waGradeNumber,
          waHeatertypeShort: waHeatertypeShort,
          waRecommendation: waRecommendation
        }
      })
    }

    getSpGrade = async() => {
      let today = new Date()
      let currentYear = today.getFullYear();
      let spHeaterType = this.state.spHeater.spHeaterType;
      let spHeaterCondition = this.state.spHeater.spHeaterCondition;
      let spHeaterAge = currentYear - Number(this.state.spHeater.spHeaterYear);
      let spEfficency = '';
      let spGradeColor = '';
      let spGradeLetter = '';
      let spGradeNumber = 0;
      let spHeaterTypeShort='';
      let spRecommendation = ''


      if(spHeaterType === "Central Gas Furnace" || spHeaterType === "Room Gas Furnace" || spHeaterType === "Oil Furnace" || spHeaterType === "Electric Furnace") {
        spEfficency = 0.8;


        if(spHeaterAge < 10){
          spGradeLetter = "C"
          spGradeNumber = 2
          spGradeColor = '#FA910B';
        }else{
          spGradeLetter = "D"
          spGradeNumber = 1
          spGradeColor = '#D22E2E';
          // spRecommendation = currentYear;
        }
      }else{
        spEfficency = 3.0;


        if(spHeaterAge > 10){
          spGradeLetter = "A"
          spGradeNumber = 4
          spGradeColor = '#139929';
          // spRecommendation = currentYear;
        }else{
          spGradeLetter = "B"
          spGradeNumber = 3
          spGradeColor = '#FDC825';
        }
      }


      if(spHeaterCondition === 'No'){
          spRecommendation = currentYear;
      }else{
        if(spHeaterAge >= 15){
          spRecommendation = currentYear;
        }else if(spHeaterAge < 15) {
          spRecommendation = (15 - spHeaterAge) + currentYear
        }
      }

      this.setState({
        spGrade : {
          spHeaterAge : spHeaterAge,
          spHeaterType : spHeaterType,
          spEfficency: spEfficency,
          spGradeColor: spGradeColor,
          spGradeLetter: spGradeLetter,
          spGradeNumber: spGradeNumber,
          spHeaterTypeShort: spHeaterTypeShort,
          spRecommendation: spRecommendation
        }
      })
    }

    getAtticGrade = () => {
      let today = new Date()
      let currentYear = today.getFullYear();
      let atticDepth = Number(this.state.attic.atticDepth);
      let atticGrade = '';
      let atticGradeColor = '';
      let atticInsulation = '';
      let atticRecommendation = ''

      if(atticDepth === 0){
        atticGrade = 'D';
        atticGradeColor = '#D22E2E';
        atticInsulation = 'Zero';
        atticRecommendation = currentYear
      }else if(1 <= atticDepth && atticDepth < 6){
        atticGrade = 'C';
        atticGradeColor = '#FA910B';
        atticInsulation = 'Low';
        atticRecommendation = currentYear
      }else if(6 <= atticDepth && atticDepth < 10){
        atticGrade = 'B';
        atticGradeColor = '#FDC825';
        atticInsulation = 'Medium';
        atticRecommendation = this.state.spGrade.spRecommendation;
      }else if(10 <= atticDepth && atticDepth <= 15){
        atticGrade = 'B';
        atticGradeColor = '#FDC825';
        atticInsulation = 'High';
        atticRecommendation ="-"
      }



      this.setState({
        atticGrade : {
          atticDepth : atticDepth,
          atticGrade : atticGrade,
          atticGradeColor : atticGradeColor,
          atticInsulation : atticInsulation,
          atticRecommendation : atticRecommendation
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

    getCarbonFootprint = () => {
      let total = this.state.waGrade.waGradeNumber + this.state.spGrade.spGradeNumber;

      // this.setState({
      //   carbonFootScore: carbonFootScore
      // })

    }



  render(){
    const userId = sessionStorage.getItem('userId')

    return(
      <>
        <Nav />
          {
            this.state.house && this.state.attic && this.state.waHeater && this.state.spHeater ?
            <Exam
              house = {this.state.house}
              attic = {this.state.attic}
              roof={this.state.roof}
              waHeater = {this.state.waHeater}
              waHeaterAge={this.state.waGrade.waHeaterAge}
              waHeatertype={this.state.waGrade.waHeatertype}
              waEfficency={this.state.waGrade.waEfficency}
              waGradeColor={this.state.waGrade.waGradeColor}
              waGradeLetter={this.state.waGrade.waGradeLetter}
              waHeatertypeShort={this.state.waGrade.waHeatertypeShort}
              waRecommendation={this.state.waGrade.waRecommendation}
              spHeaterAge={this.state.spGrade.spHeaterAge}
              spHeaterType={this.state.spGrade.spHeaterType}
              spEfficency={this.state.spGrade.spEfficency}
              spGradeColor={this.state.spGrade.spGradeColor}
              spGradeLetter={this.state.spGrade.spGradeLetter}
              spHeaterTypeShort={this.state.spGrade.spHeaterTypeShort}
              spRecommendation={this.state.spGrade.spRecommendation}
              atticDepth={this.state.atticGrade.atticDepth}
              atticGrade={this.state.atticGrade.atticGrade}
              atticGradeColor={this.state.atticGrade.atticGradeColor}
              atticInsulation={this.state.atticGrade.atticInsulation}
              atticRecommendation={this.state.atticGrade.atticRecommendation}
             />

           :
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
          }
      </>
    )
  }
}
export default MyProjectComponent
