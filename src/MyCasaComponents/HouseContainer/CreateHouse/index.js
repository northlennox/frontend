import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class HouseContainer extends Component {
  constructor(){
    super()
    this.state = {
      house : {
        houseImg:[],
        address : '',
        city:'',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
      },
      preview: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.house
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      house: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedHouse = {
      ...this.state.house
    }

    this.addHouse(updatedHouse)

    this.setState({
      house : {
        houseImg: null,
        address : '',
        city: '',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
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
        house: {
          ...this.state.house,
          houseImg: [...this.state.house.houseImg, e.target.files[0]]
        }
      })
    }


    addHouse = async(updatedHouse) => {
        const data = new FormData();
        for(let i = 0; i < this.state.house.houseImg.length; i++){
            data.append('houseImg', this.state.house.houseImg[i]);
        }

        data.append('address', this.state.house.address);
        data.append('city', this.state.house.city);
        data.append('state', this.state.house.state);
        data.append('zipcode', this.state.house.zipcode);
        data.append('houseYear', this.state.house.houseYear);
        data.append('houseSqft', this.state.house.houseSqft);
        // data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/house`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' + userId);
        })
    }


  render(){
    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ]

    let upload = "./../../../upload.svg"
    return(

      <div>
        <Nav />
        <div className="createContainer">
          <div className="createTitle">Home Details</div>
          <form onSubmit={this.handleSubmit}>
            <div className="createBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames">
                <img id="photoOne" className={this.state.preview1 ? "imgAttached" : "placer"} src={this.state.preview1 ? this.state.preview1 :  upload} onClick={this.handleClick} />
                <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="address">ADDRESS</label>
                <input name="address" id="address" type="text" onChange={this.handleInput} placeholder="ex)1330 Broadway" value={this.state.house.address} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="city">CITY</label>
                <input name="city" id="city" type="text" onChange={this.handleInput} value={this.state.house.city} placeholder="ex)San Francisco" />
              </div>
              <div className="inputRow">
                <div className="inputItem">
                  <label className="inputLabel" htmlFor="state">STATE</label>
                  <select className="selectInput" name="state" id="state" type="text" onChange={this.handleInput} value={this.state.house.state}>
                    {states.map(st => {
                        return <option value={st} key={st} >{st}</option>
                    })}
                  </select>
                </div>
                <div className="inputItem">
                  <label className="inputLabel" htmlFor="zipcode">ZIPCODE</label>
                  <input name="zipcode" id="zipcode" type="text" onChange={this.handleInput} value={this.state.house.zipcode}  />
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="houseYear">YEAR BUILT</label>
                <input name="houseYear" id="houseYear" type="text" onChange={this.handleInput} value={this.state.house.houseYear}  />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="houseSqft">SQUARE FEET</label>
                <input name="houseSqft" id="houseSqft" type="text" onChange={this.handleInput} value={this.state.house.houseSqft}  />
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
export default withRouter(HouseContainer)
