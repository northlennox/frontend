import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class EditAttic extends Component {
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
      preview1: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };



  getHouseInfo = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = localStorage.getItem('userId');

    try{
      const response = await fetch(`http://localhost:9000/api/v1/users/` + `${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();
      this.setState({
          attic: {
            atticImg: userParsed.attic.atticImg,
            atticType: userParsed.attic.atticType,
            atticSqft: userParsed.attic.atticSqft,
            atticDepth: userParsed.attic.atticDepth,
            insulMaterial: userParsed.attic.insulMaterial,
            airSealed: userParsed.attic.airSealed
          },

      })
    }catch(err){
      return err
    }
  }

  handleInput = (e) => {

    const updatedChange = {
      ...this.state.attic
    }
    updatedChange[e.target.name] = e.target.value;

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

    this.editAttic(updatedAttic)
    //set empty after call the function
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

      console.log('1', e.target.files[0]);

      this.setState({
        attic: {
          ...this.state.attic,
          atticImg: [...this.state.attic.atticImg, e.target.files[0]]
          // atticImg: e.target.files[0]
        }
      })

      console.log('2', this.state.attic.atticImg);
    }

    handleEditFormInput = (e) => {

      e.preventDefault()
      this.setState({
        attic: {
          ...this.state.attic,
          [e.target.name]:  e.target.value
        }
      })
    }

    editAttic = async(e) => {
      e.preventDefault();
        const data = new FormData();

        for(let i = 0; i < this.state.attic.atticImg.length; i++){
            data.append('atticImg', this.state.attic.atticImg[i]);
        }
        // console.log('---->', this.state.attic.atticType);
        // data.append('atticImg', this.state.attic.atticImg);
        data.append('atticType', this.state.attic.atticType);
        console.log('why?', data);
        data.append('atticSqft', this.state.attic.atticSqft);
        data.append('atticDepth', this.state.attic.atticDepth);
        data.append('insulMaterial', this.state.attic.insulMaterial);
        data.append('airSealed', this.state.attic.airSealed);
        // data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        // const time = new Date();
        // data.append('postingTime', time)
        console.log('999999', data);
        axios.put(`http://localhost:9000/api/v1/attic/${userId}`, data, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(userId);
          // this.props.history.push(`/mycasa/${userId}` );
        })
    }


  render(){
    const atticTypeOptions = ["Select", "Unconditioned Attic", "Conditioned Attic", "Cathedral Ceiling"];
    const atticDepthOptions = ["Select", "1", "2", "3", "4"];
    const insulMaterialOptions = ["Select", "Fiberglass Batt", "Fiberglass Blown", "Cellulose", "Not Sure"];
    const atticImgState = `http://localhost:9000/` + this.state.attic.atticImg;
    console.log('preview1', this.state.preview1 )
    return(

      <div>
        <Nav />
          <div>Attic Insulation Edit page</div>
          <form onSubmit={this.editAttic}>
              <div>PHOTO</div>
              <div>
                <img className="frames"
                     id="photoOne"
                     src={this.state.preview1 === null ? atticImgState : this.state.preview1}
                     onClick={this.handleClick} /></div>
              <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

              <label htmlFor="atticType">PRIMARY ATTIC TYPE</label>
              <select name="atticType" id="atticType" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticType}>
                {atticTypeOptions.map(atticTypeOption => {
                    return <option value={atticTypeOption} key={atticTypeOption} >{atticTypeOption}</option>
                })}
              </select>

              <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
              <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticSqft} />

              <label htmlFor="atticDepth">ESTIMATED AVERAGE DEPTH(INCHES)*</label>
              <select name="atticDepth" id="atticDepth" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticDepth}>
                {atticDepthOptions.map(atticDepthOption => {
                    return <option value={atticDepthOption} key={atticDepthOption} >{atticDepthOption}</option>
                })}
              </select>

              <label htmlFor="insulMaterial">INSULATION MATERIAL</label>
              <select name="insulMaterial" id="insulMaterial" type="text" onChange={this.handleEditFormInput} value={this.state.attic.insulMaterial}>
                {insulMaterialOptions.map(insulMaterialOption => {
                  return <option value={insulMaterialOption} key={insulMaterialOption} >{insulMaterialOption}</option>
                })}
              </select>
              <label htmlFor="airSealed">HAS THE HOUSE BEEN PROFESSIONALLY AIR SEALED?</label>
              <div id="airSealed" >
                <input name="airSealed" type="radio" checked={this.state.attic.airSealed === "yes"} value="yes" onChange={this.handleEditFormInput}/>YES
                <input name="airSealed" type="radio" checked={this.state.attic.airSealed === "no"} value="no" onChange={this.handleEditFormInput}/>NO
              </div>
              <button type="submit" className="btn">Edit</button>
          </form>
      </div>
    )
  }
}
export default withRouter(EditAttic)

// src={this.state.preview1 === null? atticImgState : this.state.preview1}
