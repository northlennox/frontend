import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class CreateAttic extends Component {
  constructor(){
    super()
    this.state = {
      roof : {
        roofImg: [],
        exterior : '',
        roofColor: '',
        pvSystem: '',
        panels: '',
        dcCapacity: '',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {
    const updatedChange = {
      ...this.state.roof
    }
    updatedChange[e.target.name] = e.target.value;
    this.setState({
      roof: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedRoof = {
      ...this.state.roof
    }

    this.addRoof(updatedRoof)

    this.setState({
      roof : {
        roofImg: [],
        exterior : '',
        roofColor: '',
        pvSystem: '',
        panels: '',
        dcCapacity: '',
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
        roof: {
          ...this.state.roof,
          roofImg: [...this.state.roof.roofImg, e.target.files[0]]
        }
      })
    }


    addRoof = async(updatedRoof) => {
        const data = new FormData();
        for(let i = 0; i < this.state.roof.roofImg.length; i++){
            data.append('roofImg', this.state.roof.roofImg[i]);
        }

        data.append('exterior', this.state.roof.exterior);
        data.append('roofColor', this.state.roof.roofColor);
        data.append('pvSystem', this.state.roof.pvSystem);
        data.append('panels', this.state.roof.panels);
        data.append('dcCapacity', this.state.roof.dcCapacity);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/roof`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }


  render(){
    const extriorOptions = ["Select", "Composition Shingles or Metal", "Wood Shakes", "Clay Title", "Concreate Title", "Tar & Gravel"];
    const colorOptions = ["Select", "White", "Light", "Medium", "Dark", "Cool Color With Reflectivity"];
    return(

      <div>
        <Nav />
        <div className="createContainer">
          <div className="createTitle">Roof Details</div>
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
              <label className="inputLabel" htmlFor="exterior">EXTERIOR FINISH</label>
              <select className="selectInput" name="exterior" id="exterior" type="text" onChange={this.handleInput} value={this.state.roof.exterior}>
                {extriorOptions.map(extriorOption => {
                    return <option value={extriorOption} key={extriorOption} >{extriorOption}</option>
                })}
              </select>
            </div>
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="roofColor">COLOR</label>
              <select className="selectInput" name="roofColor" id="roofColor" type="text" onChange={this.handleInput} value={this.state.roof.roofColor}>
                {colorOptions.map(colorOption => {
                    return <option value={colorOption} key={colorOption} >{colorOption}</option>
                })}
              </select>
            </div>
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="pvSystem">IS THERE SOLAR PV SYSTEM INSTALLED?*</label>
              <div id="pvSystem" >
                <input className="radioInput" name="pvSystem" type="radio" checked={this.state.roof.pvSystem === "YES"} value="YES" onChange={this.handleInput}/>YES
                <input className="radioInput-right" name="pvSystem" type="radio" checked={this.state.roof.pvSystem === "NO"} value="NO" onChange={this.handleInput}/>NO
              </div>
            </div>
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="panels">NUMBER OF PANELS</label>
              <input name="panels" id="panels" type="text" onChange={this.handleInput} value={this.state.roof.panels} />
            </div>
            <div className="inputContainer">
              <label className="inputLabel" htmlFor="dcCapacity">SIZE(KW)</label>
              <input name="dcCapacity" id="dcCapacity" type="text" onChange={this.handleInput} value={this.state.roof.dcCapacity} />
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
export default withRouter(CreateAttic)
