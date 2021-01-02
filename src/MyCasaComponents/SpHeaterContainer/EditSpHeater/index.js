import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class EditSpHeater extends Component {
  constructor(){
    super()
    this.state = {
      spHeater : {
        spHeaterImg: [],
        spHeaterType : '',
        atticSqft: '',
        spHeaterYear: '',
        spHeaterCondition: '',
        coolingSystem: '',
        userId: '',
      },
      preview1: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };



  getHouseInfo = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId');

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + `${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();
      this.setState({
          spHeater: {
            spHeaterImg: userParsed.spHeater.spHeaterImg,
            spHeaterType: userParsed.spHeater.spHeaterType,
            atticSqft: userParsed.spHeater.atticSqft,
            spHeaterYear: userParsed.spHeater.spHeaterYear,
            spHeaterCondition: userParsed.spHeater.spHeaterCondition,
            coolingSystem: userParsed.spHeater.coolingSystem
          },

      })
    }catch(err){
      return err
    }
  }

  handleInput = (e) => {

    const updatedChange = {
      ...this.state.spHeater
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      spHeater: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedspHeater = {
      ...this.state.spHeater
    }

    this.editspHeater(updatedspHeater)
    //set empty after call the function
    this.setState({
      spHeater : {
        spHeaterImg: null,
        spHeaterType : '',
        atticSqft: '',
        spHeaterYear: '',
        spHeaterCondition: '',
        coolingSystem: '',
        userId: '',
      }
    })
  }

    fileSelectHandler = (e) => {
      var file1
        console.log('files', e.target.files);
      switch (e.target.id) {
        case 'input-photoOne':
            file1 = e.target.files[0];
          break;

        default:
          console.log('error');
          return 0;

      }

      var reader1 = new FileReader();
      var url1 = typeof file1 !== 'undefined'? reader1.readAsDataURL(file1):null;

      reader1.onloadend = function(e){

        this.setState({
          preview1: [reader1.result || null],
        })
      }.bind(this)


      this.setState({
        spHeater: {
          ...this.state.spHeater,
          spHeaterImg: e.target.files[0]
        }
      })

    }

    handleEditFormInput = (e) => {
      e.preventDefault()
      this.setState({
        spHeater: {
          ...this.state.spHeater,
          [e.target.name]:  e.target.value
        }
      })
    }

    editspHeater = async(e) => {
      e.preventDefault();

        const data = new FormData();
        data.append('spHeaterImg', this.state.spHeater.spHeaterImg);
        data.append('spHeaterType', this.state.spHeater.spHeaterType);
        data.append('atticSqft', this.state.spHeater.atticSqft);
        data.append('spHeaterYear', this.state.spHeater.spHeaterYear);
        data.append('spHeaterCondition', this.state.spHeater.spHeaterCondition);
        data.append('coolingSystem', this.state.spHeater.coolingSystem);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        // const time = new Date();
        // data.append('postingTime', time)

        axios.put(`${process.env.REACT_APP_API}/api/v1/spHeater/${userId}`, data, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(userId);
          this.props.history.push(`/mycasa/${userId}` );
        })
    }


  render(){
    const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
    const spHeaterYearOptions = ["Select", "None", "Room Unit", "Central Air"];
    const coolingSystemOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];
    const spHeaterImgState = `${process.env.REACT_APP_API}/` + this.state.spHeater.spHeaterImg;

    return(

      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Primary Heater Edit page</div>
          <form onSubmit={this.editspHeater}>
            <div className="editBox">
              <div>PHOTO</div>
              <div className="frames">
                <img className="imgAttached"
                     id="photoOne"
                     src={this.state.preview1 === null ? spHeaterImgState : this.state.preview1}
                     onClick={this.handleClick} />
              </div>
              <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterType">TYPE OF SPACE HEATER</label>
                <select className="selectInput" name="spHeaterType" id="spHeaterType" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.spHeaterType}>
                  {spHeaterTypeOptions.map(spHeaterTypeOption => {
                      return <option value={spHeaterTypeOption} key={spHeaterTypeOption} >{spHeaterTypeOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
                <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.atticSqft} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterYear">YEAR OF MANUFACTURE*</label>
                <select className="selectInput" name="spHeaterYear" id="spHeaterYear" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.spHeaterYear}>
                  {spHeaterYearOptions.map(spHeaterYearOption => {
                      return <option value={spHeaterYearOption} key={spHeaterYearOption} >{spHeaterYearOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterCondition">IS THE SYSTEM WORKING WELL?</label>
                <div id="spHeaterCondition" >
                  <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "YES"} value="YES" onChange={this.handleEditFormInput}/>YES
                  <input name="spHeaterCondition" className="radioInput-right" type="radio" checked={this.state.spHeater.spHeaterCondition === "NO"} value="NO" onChange={this.handleEditFormInput}/>NO
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="coolingSystem">IS THERE A COOLING SYSTEM?</label>
                <select className="selectInput" name="coolingSystem" id="coolingSystem" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.coolingSystem}>
                  {coolingSystemOptions.map(coolingSystemOption => {
                    return <option value={coolingSystemOption} key={coolingSystemOption} >{coolingSystemOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">Edit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditSpHeater)
