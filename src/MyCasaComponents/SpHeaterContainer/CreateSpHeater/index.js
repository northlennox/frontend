import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Moment from 'react-moment';
import Nav from '../../../Nav';
import ReactTooltip from "react-tooltip";


class CreateSpHeater extends Component {
  constructor(){
    super();
    this.state = {
      spHeater : {
        spHeaterImg: [],
        spHeaterType : '',
        spHeaterBrand: '',
        spHeaterYear: '',
        spHeaterCondition: '',
        coolingSystem: '',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  };

  handleInput = e => {
    const updatedChange = {
      ...this.state.spHeater
    };

    updatedChange[e.target.name] = e.target.value;

    this.setState({
      spHeater: updatedChange
    });
  };

  handleClick = e => {
    var frame = document.getElementById(`input-${e.target.id}`);
    frame.click();
  }

  handleSubmit = e => {
    e.preventDefault();
    const updatedspHeater = {
      ...this.state.spHeater
    }

    this.addspHeater(updatedspHeater);

    this.setState({
      spHeater : {
        spHeaterImg: [],
        spHeaterType : '',
        spHeaterBrand: '',
        spHeaterYear: '',
        spHeaterCondition: '',
        coolingSystem: '',
        userId: '',
      }
    });
  };

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
    }.bind(this);


    this.setState({
      spHeater: {
        ...this.state.spHeater,
        spHeaterImg: [...this.state.spHeater.spHeaterImg, e.target.files[0]]
      }
    });
  };


    addspHeater = async(updatedspHeater) => {
        const data = new FormData();
        for(let i = 0; i < this.state.spHeater.spHeaterImg.length; i++){
            data.append('spHeaterImg', this.state.spHeater.spHeaterImg[i]);
        }

        data.append('spHeaterType', this.state.spHeater.spHeaterType);
        data.append('spHeaterBrand', this.state.spHeater.spHeaterBrand);
        data.append('spHeaterYear', this.state.spHeater.spHeaterYear);
        data.append('spHeaterCondition', this.state.spHeater.spHeaterCondition);
        data.append('coolingSystem', this.state.spHeater.coolingSystem);
        // data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/spHeater`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }

//"Geothermal Heat Pump", ele
//"Pellet Stove", wood

  render(){
    const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
    const coolingSystemOptions = ["Select", "None", "Room Unit", "Central Air"];
    const spHeaterYearOptions = ["Select"];
    let today = new Date()
    let cuttentYear = today.getFullYear();

    for(let i = cuttentYear; i >= 1980; i-=1){
        let yr = i
        spHeaterYearOptions.push(yr.toString())
    }

    const upload = "./../../../upload.svg"
    const sampleWaHeaterImg = "./../../SampleImages/WaHeaterSample.png";
    return(

      <div>
        <Nav />
        <div className="createContainer">
          <div className="createTitle">Heating and Cooling Details</div>
          <form onSubmit={this.handleSubmit}>
            <div className="createBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img data-tip data-for="helpTip" className="help" src="./../../help.svg"/>
                <ReactTooltip id="helpTip" place="bottom" effect="solid" className="tooltipContainer">
                  <img className="sampleImg" src={sampleWaHeaterImg}/>
                  <div className="sampleText">Use your flash if needed to take a photo of your space heater, making sure to capture the serial number.</div>
                </ReactTooltip>
              </div>
              <div className="frames">
                <img className={this.state.preview1 ? "imgAttached" : "placer"}  id="photoOne" src={this.state.preview1 ? this.state.preview1 :  upload} onClick={this.handleClick } />
                <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              </div>
               <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterType">TYPE OF SPACE HEATER*
                  <span className="tipContainer">
                    <img data-tip data-for="spHeaterType" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="spHeaterType" place="bottom" effect="solid" className="tip">
                      <div className="tipText">Email help@myelectricasa.com if you can’t determine what type of equipment you have.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <select className="selectInput" name="spHeaterType" id="spHeaterType" type="text" onChange={this.handleInput} value={this.state.spHeater.spHeaterType}>
                  {spHeaterTypeOptions.map(spHeaterTypeOption => {
                      return <option value={spHeaterTypeOption} key={spHeaterTypeOption} >{spHeaterTypeOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterBrand">BRAND</label>
                <input name="spHeaterBrand" id="spHeaterBrand" type="text" onChange={this.handleInput} value={this.state.spHeater.spHeaterBrand} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterYear">YEAR OF MANUFACTURE*
                  <span className="tipContainer">
                    <img data-tip data-for="spHeaterYear" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="spHeaterYear" place="bottom" effect="solid" className="tip">
                      <div className="tipText">Sometimes the year can be found on the device. If not, and you can read the serial number, you can look it up by visiting the website https://www.building-center.org/. For help, please email help@myelectricasa.com.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <select className="selectInput" name="spHeaterYear" id="spHeaterYear" type="text" onChange={this.handleInput} value={this.state.spHeater.spHeaterYear}>
                  {spHeaterYearOptions.map(spHeaterYearOption => {
                      return <option value={spHeaterYearOption} key={spHeaterYearOption} >{spHeaterYearOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterCondition">IS THE SYSTEM WORKING WELL?*
                  <span className="tipContainer">
                    <img data-tip data-for="spHeaterCondition" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="spHeaterCondition" place="bottom" effect="solid" className="tip">
                      <div className="tipText">If your space heater is working well, it provides enough heat to keep your house at a comfortable temperature. If your space heater is not working, there will be cold areas in the house, unusual noises or smells.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <div id="spHeaterCondition">
                  <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "Yes"} value="Yes" onChange={this.handleInput} defaultChecked/><span className="radioNext">YES</span>
                  <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "No"} value="No" onChange={this.handleInput} className="radioInput-right" /><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="coolingSystem">IS THERE A COOLING SYSTEM?</label>
                <select className="selectInput" name="coolingSystem" id="coolingSystem" type="text" onChange={this.handleInput} value={this.state.spHeater.coolingSystem}>
                  {coolingSystemOptions.map(coolingSystemOption => {
                      return <option value={coolingSystemOption} key={coolingSystemOption} >{coolingSystemOption}</option>
                  })}
                </select>
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
export default withRouter(CreateSpHeater)
