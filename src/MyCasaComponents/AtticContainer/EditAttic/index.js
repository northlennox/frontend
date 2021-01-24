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
        // atticImg: [this.state.attic.atticImg, e.target.files[0]]
        atticImg: e.target.files[0]
      }
    })
  }

  handleEditFormInput = (e) => {
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
      data.append('atticImg', this.state.attic.atticImg);
      data.append('atticType', this.state.attic.atticType);
      data.append('atticSqft', this.state.attic.atticSqft);
      data.append('atticDepth', this.state.attic.atticDepth);
      data.append('insulMaterial', this.state.attic.insulMaterial);
      data.append('airSealed', this.state.attic.airSealed);
      // data.append('time', this.state.house.time);

      let userId = sessionStorage.getItem('userId');
      data.append('userId', userId)
      // const time = new Date();
      // data.append('postingTime', time)
      axios.put(`${process.env.REACT_APP_API}/api/v1/attic/${userId}`, data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(userId);
        this.props.history.push(`/mycasa/${userId}` );
      })
    }

    deleteMyAttic = async(id, e) => {
      e.preventDefault()

      try{
        // const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/Attic/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        // this.setState({
        //   attic : null
        // })

        this.props.history.push('/mycasa/' + id);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }

  render(){
    const userId = sessionStorage.getItem('userId');
    const atticTypeOptions = ["Select", "Unconditioned Attic", "Conditioned Attic", "Cathedral Ceiling"];
    const atticDepthOptions = ["Select", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    const insulMaterialOptions = ["Select", "Fiberglass Batt", "Fiberglass Blown", "Cellulose", "Not Sure"];
    // const atticImgState = `http://host:9000/` + this.state.attic.atticImg;
    let upload = "./../../../upload.svg"
    return(
      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Attic Insulation Edit</div>
          <form onSubmit={this.editAttic}>
            <div className="editBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames">
                <img className="imgAttached"
                     id="photoOne"
                     className={this.state.preview1 ? "imgAttached" : "placer"}
                     src={this.state.preview1 ? this.state.preview1 :  upload}
                     onClick={this.handleClick} />
                <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="atticType">PRIMARY ATTIC TYPE</label>
                <select className="selectInput" name="atticType" id="atticType" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticType}>
                  {atticTypeOptions.map(atticTypeOption => {
                      return <option value={atticTypeOption} key={atticTypeOption} >{atticTypeOption}</option>
                    })}
                </select>
              </div>

              <div className="inputContainer">
                <label className="inputLabel" htmlFor="atticSqft">ATTIC SQUARE FOOTAGE(GUESS)</label>
                <input name="atticSqft" id="atticSqft" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticSqft} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="atticDepth">ESTIMATED AVERAGE DEPTH(INCHES)*</label>
                <select className="selectInput" name="atticDepth" id="atticDepth" type="text" onChange={this.handleEditFormInput} value={this.state.attic.atticDepth}>
                  {atticDepthOptions.map(atticDepthOption => {
                      return <option value={atticDepthOption} key={atticDepthOption} >{atticDepthOption}</option>
                    })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="insulMaterial">INSULATION MATERIAL</label>
                <select className="selectInput" name="insulMaterial" id="insulMaterial" type="text" onChange={this.handleEditFormInput} value={this.state.attic.insulMaterial}>
                  {insulMaterialOptions.map(insulMaterialOption => {
                    return <option value={insulMaterialOption} key={insulMaterialOption} >{insulMaterialOption}</option>
                  })}
                </select>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="airSealed">HAS THE HOUSE BEEN PROFESSIONALLY AIR SEALED?</label>
                <div id="airSealed" >
                  <input name="airSealed" type="radio" checked={this.state.attic.airSealed === "yes"} value="yes" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="airSealed" type="radio" checked={this.state.attic.airSealed === "no"} value="no" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">SAVE</button>
                <button className="deleteBtn" onClick={this.deleteMyAttic.bind(null, userId)}>DELETE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditAttic)
