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

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`http://localhost:9000/api/v1/house`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' + userId);
        })
    }


  render(){

    return(

      <div>
        <Nav />
          <div>Home Details</div>
          <form onSubmit={this.handleSubmit}>
              <div className="photo_mark">PHOTO</div>
              <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } /></div>
              <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <label htmlFor="address">ADDRESS</label>
              <input name="address" id="address" type="text" onChange={this.handleInput} placeholder="ex)1330 Broadway" value={this.state.house.address} />

              <label htmlFor="city">CITY</label>
              <input name="city" id="city" type="text" onChange={this.handleInput} value={this.state.house.city} placeholder="ex)San Francisco" />

              <label className="" htmlFor="state">STATE</label>
              <input name="state" id="state" type="text" onChange={this.handleInput} value={this.state.house.state} />

              <label className="" htmlFor="zipcode">ZIPCODE</label>
              <input name="zipcode" id="zipcode" type="text" onChange={this.handleInput} value={this.state.house.zipcode}  />

              <label htmlFor="houseYear">YEAR BUILT</label>
              <input name="houseYear" id="houseYear" type="text" onChange={this.handleInput} value={this.state.house.houseYear}  />

              <label className="" htmlFor="houseSqft">SQUARE FEET</label>
              <input name="houseSqft" id="houseSqft" type="text" onChange={this.handleInput} value={this.state.house.houseSqft}  />

              <button type="submit" className="btn">SAVE</button>

          </form>
      </div>
    )
  }
}
export default withRouter(HouseContainer)
