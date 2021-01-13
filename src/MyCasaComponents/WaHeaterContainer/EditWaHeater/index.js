import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


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


  render(){
    const waHeaterTypeOptions = ["Select", "Natural Gas Storage", "Natural Gas Tankless", "Electric Storage", "Electric Heat Pump"];
    const waHeaterYearOptions = ["Select", "2020", "2019", "2018", "2017", "2016", "2015"];
    const waHeaterImgState = `${process.env.REACT_APP_API}/` + this.state.waHeater.waHeaterImg;

    return(

      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Water Heater Edit page</div>
          <form onSubmit={this.editwaHeater}>
            <div className="editBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames">
                <img className="imgAttached"
                     id="photoOne"
                     src={this.state.preview1 === null ? waHeaterImgState : this.state.preview1}
                     onClick={this.handleClick} />
              </div>
              <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeatertype">TYPE OF WATER HEATER</label>
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
                <label className="inputLabel" htmlFor="waHeaterYear">YEAR OF MANUFACTURE*</label>
                <select className="selectInput" name="waHeaterYear" id="waHeaterYear" type="text" onChange={this.handleEditFormInput} value={this.state.waHeater.waHeaterYear}>
                  {waHeaterYearOptions.map(waHeaterYearOption => {
                      return <option value={waHeaterYearOption} key={waHeaterYearOption} >{waHeaterYearOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterCondition">IS THE SYSTEM WORKING WELL?</label>
                <div id="waHeaterCondition" >
                  <input name="waHeaterCondition" type="radio" checked={this.state.waHeater.waHeaterCondition === "YES"} value="YES" onChange={this.handleEditFormInput}/>YES
                  <input name="waHeaterCondition" className="radioInput-right" type="radio" checked={this.state.waHeater.waHeaterCondition === "NO"} value="NO" onChange={this.handleEditFormInput}/>NO
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="waHeaterSingle">IS THERE MORE THAN ONE WATER HEATER?</label>
                <div id="waHeaterSingle" >
                  <input name="waHeaterSingle" type="radio" checked={this.state.waHeater.waHeaterSingle === "YES"} value="YES" onChange={this.handleEditFormInput}/>YES
                  <input name="waHeaterSingle" className="radioInput-right" type="radio" checked={this.state.waHeater.waHeaterSingle === "NO"} value="NO" onChange={this.handleEditFormInput}/>NO
                </div>
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
export default withRouter(EditWaHeater)
