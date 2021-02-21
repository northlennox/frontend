import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav';
import ReactTooltip from "react-tooltip";


class EditSpHeater extends Component {
  constructor(){
    super()
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
      preview1: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };



  getHouseInfo = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = sessionStorage.getItem('userId');

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
            spHeaterBrand: userParsed.spHeater.spHeaterBrand,
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
        spHeaterBrand: '',
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
        data.append('spHeaterBrand', this.state.spHeater.spHeaterBrand);
        data.append('spHeaterYear', this.state.spHeater.spHeaterYear);
        data.append('spHeaterCondition', this.state.spHeater.spHeaterCondition);
        data.append('coolingSystem', this.state.spHeater.coolingSystem);
        // data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
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



    deleteMySpHeater = async(id, e) => {
      e.preventDefault()

      try{
        // const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/spheater/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        // this.setState({
        //   spHeater : null
        // })

        this.props.history.push('/mycasa/' + id);

      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }

  render(){
    const userId = sessionStorage.getItem('userId');
    const spHeaterTypeOptions = ["Select", "Central Gas Furnace", "Room Gas Furnace", "Oil Furnace", "Electric Furnace", "Electric Heat Pump", "Electric Mini-Split", "Gas Boiler/Radiant", "Geothermal Heat Pump", "Wood Stove", "Pellet Stove"];
    const coolingSystemOptions = ["Select", "None", "Room Unit", "Central Air"];
    const spHeaterYearOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];
    let today = new Date()
    let cuttentYear = today.getFullYear();

    for(let i = 1980; i <= cuttentYear; i++){
        spHeaterYearOptions.push(i)
    }
    const upload = "./../../../upload.svg"
    const sampleSpHeaterImg = "./../../SampleImages/WaHeaterSample.png";
    return(

      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Heating and Cooling Details</div>
          <form onSubmit={this.editspHeater}>
            <div className="editBox">
            <div className="helpContainer">
              <span className="inputLabel">PHOTO</span>
              <img data-tip data-for="helpTip" className="help" src="./../../help.svg"/>
              <ReactTooltip id="helpTip" place="bottom" effect="solid" className="tooltipContainer">
                <img className="sampleImg" src={sampleSpHeaterImg}/>
                <div className="sampleText">Use your flash if needed to take a photo of your space heater, making sure to capture the serial number.</div>
              </ReactTooltip>
            </div>
              <div className="frames">
                <img id="photoOne"
                     className={this.state.preview1 ? "imgAttached" : "placer"}
                     src={this.state.preview1 ? this.state.preview1 :  upload}
                     onClick={this.handleClick} />
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
                <select className="selectInput" name="spHeaterType" id="spHeaterType" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.spHeaterType}>
                  {spHeaterTypeOptions.map(spHeaterTypeOption => {
                      return <option value={spHeaterTypeOption} key={spHeaterTypeOption} >{spHeaterTypeOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="spHeaterBrand">BRAND</label>
                <input name="spHeaterBrand" id="spHeaterBrand" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.spHeaterBrand} />
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
                <select className="selectInput" name="spHeaterYear" id="spHeaterYear" type="text" onChange={this.handleEditFormInput} value={this.state.spHeater.spHeaterYear}>
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
                <div id="spHeaterCondition" >
                  <input name="spHeaterCondition" type="radio" checked={this.state.spHeater.spHeaterCondition === "Yes"} value="Yes" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input name="spHeaterCondition" className="radioInput-right" type="radio" checked={this.state.spHeater.spHeaterCondition === "No"} value="No" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
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
                <button type="submit" className="btn">SAVE</button>
                <button className="deleteBtn" onClick={this.deleteMySpHeater.bind(null, userId)}>DELETE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditSpHeater)
