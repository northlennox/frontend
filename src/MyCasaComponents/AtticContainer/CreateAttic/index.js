import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class CreateAttic extends Component {
  constructor(){
    super()
    this.state = {
      attic : {
        atticImg: [],
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

    console.log(e.target.value);
    this.setState({
      attic: updatedChange
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
          ...this.state.attic,
          atticImg: [...this.state.attic.atticImg, e.target.files[0]]
        }
      })
    }


    addAttic = async(updatedHouse) => {
        const data = new FormData();
        for(let i = 0; i < this.state.attic.atticImg.length; i++){
            data.append('atticImg', this.state.attic.atticImg[i]);
        }

        data.append('atticType', this.state.attic.atticType);
        data.append('atticSqft', this.state.attic.atticSqft);
        data.append('atticDepth', this.state.attic.atticDepth);
        data.append('insulMaterial', this.state.attic.insulMaterial);
        data.append('airSealed', this.state.attic.airSealed);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/attic`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }


  render(){
    const atticTypeOptions = ["Select", "Unconditioned Attic", "Conditioned Attic", "Cathedral Ceiling"];
    const atticDepthOptions = ["Select", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    const insulMaterialOptions = ["Select", "Fiberglass Batt", "Fiberglass Blown", "Cellulose", "Not Sure"];

    return(

      <div>
        <Nav />
          <div>Attic Insulation Details</div>
          <form onSubmit={this.handleSubmit}>
              <div className="photo_mark">PHOTO</div>
              <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } /></div>
              <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <label htmlFor="atticType">PRIMARY ATTIC TYPE</label>
              <select name="atticType" id="atticType" type="text" onChange={this.handleInput} value={this.state.attic.atticType}>
                {atticTypeOptions.map(atticTypeOption => {
                    return <option value={atticTypeOption} key={atticTypeOption} >{atticTypeOption}</option>
                })}
              </select>

              <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
              <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleInput} value={this.state.attic.atticSqft} />

              <label htmlFor="atticDepth">ESTIMATED AVERAGE DEPTH(INCHES)*</label>
              <select name="atticDepth" id="atticDepth" type="text" onChange={this.handleInput} value={this.state.attic.atticDepth}>
                {atticDepthOptions.map(atticDepthOption => {
                    return <option value={atticDepthOption} key={atticDepthOption} >{atticDepthOption}</option>
                })}
              </select>

              <label htmlFor="insulMaterial">INSULATION MATERIAL</label>
              <select name="insulMaterial" id="insulMaterial" type="text" onChange={this.handleInput} value={this.state.attic.insulMaterial}>
                {insulMaterialOptions.map(insulMaterialOption => {
                  return <option value={insulMaterialOption} key={insulMaterialOption} >{insulMaterialOption}</option>
                })}
              </select>
              <label htmlFor="airSealed">HAS THE HOUSE BEEN PROFESSIONALLY AIR SEALED?</label>
              <div id="airSealed" >
                <input name="airSealed" type="radio" checked={this.state.attic.airSealed === "yes"} value="yes" onChange={this.handleInput}/>YES
                <input name="airSealed" type="radio" checked={this.state.attic.airSealed === "no"} value="no" onChange={this.handleInput}/>NO
              </div>
              <button type="submit" className="btn">SAVE</button>
          </form>
      </div>
    )
  }
}
export default withRouter(CreateAttic)
