import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class AtticContainer extends Component {
  constructor(){
    super()
    this.state = {
      attic : {
        atticImg: null,
        atticType : '',
        atticSqft: '',
        atticDepth: '',
        insulMaterial: '',
        airSealed: '',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.attic
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
    const updatedAttic = {
      ...this.state.attic
    }

    this.addAttic(updatedAttic)

    this.setState({
      attic : {
        atticImg: null,
        atticType : '',
        atticSqft: '',
        atticDepth: '',
        insulMaterial: '',
        airSealed: '',
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
        attic: {
          ...this.state.house,
          houseImg: [...this.state.attic.atticImg, e.target.files[0]]
        }
      })
    }


    addAttic = async(updatedHouse) => {
        const data = new FormData();
        for(let i = 0; i < this.state.attic.atticImg.length; i++){
            data.append('houseImg', this.state.attic.atticImg[i]);
        }

        data.append('atticType', this.state.house.atticType);
        data.append('atticSqft', this.state.house.atticSqft);
        data.append('atticDepth', this.state.house.atticDepth);
        data.append('insulMaterial', this.state.house.insulMaterial);
        data.append('airSealed', this.state.house.airSealed);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`http://localhost:9000/api/v1/attic`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa');
        })
    }


  render(){

    return(

      <div>
        <Nav />
          <div>Attic Insulation Details</div>
          <form onSubmit={this.handleSubmit}>
              <div className="photo_mark">PHOTO</div>
              <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } /></div>
              <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <label htmlFor="atticType">PRIMARY ATTIC TYPE</label>
              <input name="atticType" id="atticType" type="text" onChange={this.handleInput} value={this.state.attic.atticType} />

              <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
              <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleInput} value={this.state.attic.atticSqft} />

              <label htmlFor="atticDepth">ESTIMATED AVERAGE DEPTH(INCHES)*</label>
              <input name="atticDepth" id="atticDepth" type="text" onChange={this.handleInput} value={this.state.attic.atticDepth} />

              <label htmlFor="insulMaterial">INSULATION MATERIAL</label>
              <input name="insulMaterial" id="insulMaterial" type="text" onChange={this.handleInput} value={this.state.attic.insulMaterial}  />

              <label htmlFor="airSealed">HAS THE HOUSE BEEN PROFESSIONALLY AIR SEALED?</label>
              <select name="airSealed" id="airSealed" type="text" onChange={this.handleInput} value={this.state.attic.airSealed}>
                <option value="yes">YES</option>
                <option value="no">NO</option>
              </select>
              <button type="submit" className="btn">SAVE</button>

          </form>
      </div>
    )
  }
}
export default withRouter(AtticContainer)
