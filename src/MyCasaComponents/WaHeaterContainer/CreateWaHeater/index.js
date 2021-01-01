import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class CreateWaHeater extends Component {
  constructor(){
    super()
    this.state = {
      waHeater : {
        waHeaterImg: [],
        waHeatertype : '',
        waHeaterBrand: '',
        waHeaterYear: '',
        waHeaterCondition: '',
        waHeaterSingle: '',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {
    const updatedChange = {
      ...this.state.waHeater
    }
    updatedChange[e.target.name] = e.target.value;
    console.log('here', updatedChange);
    this.setState({
      waHeater: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedWaHeater = {
      ...this.state.waHeater
    }

    this.addWaHeater(updatedWaHeater)

    this.setState({
      waHeater : {
        waHeaterImg: [],
        waHeatertype : '',
        waHeaterBrand: '',
        waHeaterYear: '',
        waHeaterCondition: '',
        waHeaterSingle: '',
        userId: '',
      },
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
        waHeater: {
          ...this.state.waHeater,
          waHeaterImg: [...this.state.waHeater.waHeaterImg, e.target.files[0]]
        }
      })
    }


    addWaHeater = async(updatedWaHeater) => {
        const data = new FormData();
        for(let i = 0; i < this.state.waHeater.waHeaterImg.length; i++){
            data.append('waHeaterImg', this.state.waHeater.waHeaterImg[i]);
        }

        data.append('waHeatertype', this.state.waHeater.waHeatertype);
        data.append('waHeaterBrand', this.state.waHeater.waHeaterBrand);
        data.append('waHeaterYear', this.state.waHeater.waHeaterYear);
        data.append('waHeaterCondition', this.state.waHeater.waHeaterCondition);
        data.append('waHeaterSingle', this.state.waHeater.waHeaterSingle);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/waHeater`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }


  render(){
    const waHeaterTypeOptions = ["Select", "Natural Gas Storage", "Natural Gas Thankless", "Electric Storage", "Electric Heat Pump"];
    const waHeaterYearOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];

    return(

      <div>
        <Nav />
        <div className="createContainer">
          <div className="createTitle">Water Heater Details</div>
          <form onSubmit={this.handleSubmit}>
            <div className="createBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames">
                { this.state.preview1 === undefined ?
                  <img className="upload" id="photoOne" src="./../../placer.svg" /> :
                  <img className="imgAttached" id="photoOne" src={this.state.preview1} onClick={this.handleClick } />
                }
                <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeatertype">TYPE OF WATER HEATER</label>
                <select className="selectInput" name="waHeatertype" id="waHeatertype" type="text" onChange={this.handleInput} value={this.state.waHeater.waHeatertype}>
                  {waHeaterTypeOptions.map(waHeaterTypeOption => {
                      return <option value={waHeaterTypeOption} key={waHeaterTypeOption} >{waHeaterTypeOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterBrand">BRAND</label>
                <input name="waHeaterBrand" id="waHeaterBrand" type="text" onChange={this.handleInput} value={this.state.waHeater.waHeaterBrand} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterYear">YEAR OF MANUFACTURE*</label>
                <select className="selectInput" name="waHeaterYear" id="waHeaterYear" type="text" onChange={this.handleInput} value={this.state.waHeater.waHeaterYear}>
                  {waHeaterYearOptions.map(waHeaterYearOption => {
                      return <option value={waHeaterYearOption} key={waHeaterYearOption} >{waHeaterYearOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterCondition">IS THE SYSTEM WORKING WELL?</label>
                <div id="waHeaterCondition" >
                  <input name="waHeaterCondition" type="radio" checked={this.state.waHeater.waHeaterCondition === "YES"} value="YES" onChange={this.handleInput}/>YES
                  <input className="radioInput-right" name="waHeaterCondition" type="radio" checked={this.state.waHeater.waHeaterCondition === "NO"} value="NO" onChange={this.handleInput}/>NO
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterSingle">IS THERE A COOLING SYSTEM?</label>
                <div id="waHeaterSingle" >
                  <input name="waHeaterSingle" type="radio" checked={this.state.waHeater.waHeaterSingle === "YES"} value="YES" onChange={this.handleInput}/>YES
                  <input className="radioInput-right" name="waHeaterSingle" type="radio" checked={this.state.waHeater.waHeaterSingle === "NO"} value="NO" onChange={this.handleInput}/>NO
                </div>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">SAVE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateWaHeater)
