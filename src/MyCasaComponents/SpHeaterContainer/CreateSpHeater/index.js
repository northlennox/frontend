import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class CreateSpHeater extends Component {
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
      preview: null,
      selectedFile : null,
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

    this.addspHeater(updatedspHeater)

    this.setState({
      spHeater : {
        spHeaterImg: [],
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
          spHeaterImg: [...this.state.spHeater.spHeaterImg, e.target.files[0]]
        }
      })
    }


    addspHeater = async(updatedspHeater) => {
        const data = new FormData();
        for(let i = 0; i < this.state.spHeater.spHeaterImg.length; i++){
            data.append('spHeaterImg', this.state.spHeater.spHeaterImg[i]);
        }

        data.append('spHeaterType', this.state.spHeater.spHeaterType);
        data.append('atticSqft', this.state.spHeater.atticSqft);
        data.append('spHeaterYear', this.state.spHeater.spHeaterYear);
        data.append('spHeaterCondition', this.state.spHeater.spHeaterCondition);
        data.append('coolingSystem', this.state.spHeater.coolingSystem);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`http://localhost:9000/api/v1/spHeater`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }


  render(){
    const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
    const spHeaterYearOptions = ["Select", "None", "Room Unit", "Central Air"];
    const coolingSystemOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];

    return(

      <div>
        <Nav />
          <div>Primary Heater Details</div>
          <form onSubmit={this.handleSubmit}>
              <div className="photo_mark">PHOTO</div>
              <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } /></div>
              <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <label htmlFor="spHeaterType">TYPE OF SPACE HEATER</label>
              <select name="spHeaterType" id="spHeaterType" type="text" onChange={this.handleInput} value={this.state.spHeater.spHeaterType}>
                {spHeaterTypeOptions.map(spHeaterTypeOption => {
                    return <option value={spHeaterTypeOption} key={spHeaterTypeOption} >{spHeaterTypeOption}</option>
                })}
              </select>

              <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
              <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleInput} value={this.state.spHeater.atticSqft} />

              <label htmlFor="spHeaterYear">YEAR OF MANUFACTURE*</label>
              <select name="spHeaterYear" id="spHeaterYear" type="text" onChange={this.handleInput} value={this.state.spHeater.spHeaterYear}>
                {spHeaterYearOptions.map(spHeaterYearOption => {
                    return <option value={spHeaterYearOption} key={spHeaterYearOption} >{spHeaterYearOption}</option>
                })}
              </select>
              <label htmlFor="spHeaterCondition">IS THE SYSTEM WORKING WELL?</label>
              <div id="spHeaterCondition" >
                <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "YES"} value="YES" onChange={this.handleInput}/>YES
                <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "NO"} value="NO" onChange={this.handleInput}/>NO
              </div>

              <label htmlFor="coolingSystem">IS THERE A COOLING SYSTEM?</label>
              <select name="coolingSystem" id="coolingSystem" type="text" onChange={this.handleInput} value={this.state.spHeater.coolingSystem}>
                {coolingSystemOptions.map(coolingSystemOption => {
                  return <option value={coolingSystemOption} key={coolingSystemOption} >{coolingSystemOption}</option>
                })}
              </select>
              <button type="submit" className="btn">SAVE</button>
          </form>
      </div>
    )
  }
}
export default withRouter(CreateSpHeater)