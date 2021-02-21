import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav';
import ReactTooltip from "react-tooltip";


class EditWaHeater extends Component {
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
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();
      console.log(userParsed.waHeater);
      this.setState({
          waHeater: {
            waHeaterImg: userParsed.waHeater.waHeaterImg,
            waHeatertype: userParsed.waHeater.waHeatertype,
            waHeaterBrand: userParsed.waHeater.waHeaterBrand,
            waHeaterYear: userParsed.waHeater.waHeaterYear,
            waHeaterCondition: userParsed.waHeater.waHeaterCondition,
            waHeaterSingle: userParsed.waHeater.waHeaterSingle
          },

      })
    }catch(err){
      return err
    }
  }

  handleInput = (e) => {

    const updatedChange = {
      ...this.state.waHeater
    }
    updatedChange[e.target.name] = e.target.value;

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
    const updatedwaHeater = {
      ...this.state.waHeater
    }

    this.editwaHeater(updatedwaHeater)
    //set empty after call the function
    this.setState({
      waHeater : {
        waHeaterImg: null,
        waHeatertype : '',
        waHeaterBrand: '',
        waHeaterYear: '',
        waHeaterCondition: '',
        waHeaterSingle: '',
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
        waHeater: {
          ...this.state.waHeater,
          waHeaterImg: e.target.files[0]
        }
      })

    }

    handleEditFormInput = (e) => {
      e.preventDefault()
      this.setState({
        waHeater: {
          ...this.state.waHeater,
          [e.target.name]:  e.target.value
        }
      })
    }

    editwaHeater = async(e) => {
      e.preventDefault();

        const data = new FormData();
        data.append('waHeaterImg', this.state.waHeater.waHeaterImg);
        data.append('waHeatertype', this.state.waHeater.waHeatertype);
        data.append('waHeaterBrand', this.state.waHeater.waHeaterBrand);
        data.append('waHeaterYear', this.state.waHeater.waHeaterYear);
        data.append('waHeaterCondition', this.state.waHeater.waHeaterCondition);
        data.append('waHeaterSingle', this.state.waHeater.waHeaterSingle);
        // data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
        data.append('userId', userId)

        // const time = new Date();
        // data.append('postingTime', time)
        console.log('put request');
        axios.put(`${process.env.REACT_APP_API}/api/v1/waHeater/${userId}`, data, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(userId);
          this.props.history.push(`/mycasa/${userId}` );
        })
    }

    deleteMyWaHeater = async(id, e) => {
      e.preventDefault()

      try{

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/waheater/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

      this.props.history.push('/mycasa/' + id);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }

  render(){
    const userId = sessionStorage.getItem('userId');
    const waHeaterTypeOptions = ["Select", "Natural Gas Storage", "Natural Gas Tankless", "Electric Storage", "Electric Heat Pump"];
    const waHeaterYearOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];
    let today = new Date()
    let cuttentYear = today.getFullYear();

    for(let i = 1980; i <= cuttentYear; i++){
        waHeaterYearOptions.push(i)
    }
    const upload = "./../../../upload.svg";
    const sampleWaHeaterImg = "./../../SampleImages/WaHeaterSample.png"




    return(

      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Water Heater Details</div>
          <form onSubmit={this.editwaHeater}>
            <div className="editBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img data-tip data-for="helpTip" className="help" src="./../../help.svg"/>
                <ReactTooltip id="helpTip" place="bottom" effect="solid" className="tooltipContainer">
                  <img className="sampleImg" src={sampleWaHeaterImg}/>
                  <div className="sampleText">Use your flash if needed to take a photo of your water heater, making sure to capture the serial number.</div>
                </ReactTooltip>
              </div>
              <div className="frames">
                <img id="photoOne"
                     className={this.state.preview1 ? "imgAttached" : "placer"}
                     src={this.state.preview1 ? this.state.preview1 :  upload}
                     onClick={this.handleClick} />
              </div>
              <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeatertype">TYPE OF WATER HEATER
                  <span className="tipContainer">
                    <img data-tip data-for="waHeatertype" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="waHeatertype" place="bottom" effect="solid" className="tip">
                      <div className="tipText">Email help@myelectricasa.com if you can’t determine what type of equipment you have.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <select className="selectInput" name="waHeatertype" id="waHeatertype" type="text" onChange={this.handleEditFormInput} value={this.state.waHeater.waHeatertype}>
                  {waHeaterTypeOptions.map(waHeaterTypeOption => {
                      return <option value={waHeaterTypeOption} key={waHeaterTypeOption} >{waHeaterTypeOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterBrand">BRAND</label>
                <input name="waHeaterBrand" id="waHeaterBrand" type="text" onChange={this.handleEditFormInput} value={this.state.waHeater.waHeaterBrand} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterYear">YEAR OF MANUFACTURE*
                  <span className="tipContainer">
                    <img data-tip data-for="waHeaterYear" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="waHeaterYear" place="bottom" effect="solid" className="tip">
                      <div className="tipText">Sometimes the year can be found on the device. If not, and you can read the serial number, you can look it up by visiting the website https://www.building-center.org/. For help, please email help@myelectricasa.com.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <select className="selectInput" name="waHeaterYear" id="waHeaterYear" type="text" onChange={this.handleEditFormInput} value={this.state.waHeater.waHeaterYear}>
                  {waHeaterYearOptions.map(waHeaterYearOption => {
                      return <option value={waHeaterYearOption} key={waHeaterYearOption} >{waHeaterYearOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterCondition">IS THE SYSTEM WORKING WELL?*
                  <span className="tipContainer">
                    <img data-tip data-for="waHeaterCondition" className="help" src="./../../help.svg"/>
                    <ReactTooltip id="waHeaterCondition" place="bottom" effect="solid" className="tip">
                      <div className="tipText">If your water heater is working well, it produces enough hot water for your needs. If your water heater is not working well, there is not enough hot water, the water is rusty, there is rumbling or leaks.</div>
                    </ReactTooltip>
                  </span>
                </label>
                <div id="waHeaterCondition" >
                  <input name="waHeaterCondition" type="radio" checked={this.state.waHeater.waHeaterCondition === "Yes"} value="Yes" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input name="waHeaterCondition" className="radioInput-right" type="radio" checked={this.state.waHeater.waHeaterCondition === "No"} value="No" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterSingle">IS THERE MORE THAN ONE WATER HEATER?</label>
                <div id="waHeaterSingle" >
                  <input name="waHeaterSingle" type="radio" checked={this.state.waHeater.waHeaterSingle === "Yes"} value="Yes" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input name="waHeaterSingle" className="radioInput-right" type="radio" checked={this.state.waHeater.waHeaterSingle === "No"} value="No" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">SAVE</button>
                <button className="deleteBtn" onClick={this.deleteMyWaHeater.bind(null, userId)}>DELETE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditWaHeater)
