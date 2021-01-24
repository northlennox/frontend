import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class EditRoof extends Component {
  constructor(){
    super()
    this.state = {
      roof : {
        roofImg: [],
        exterior : '',
        roofColor: '',
        pvSystem: '',
        panels: '',
        dcCapacity: '',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };

  getHouseInfo = async() => {
    const userId = sessionStorage.getItem('userId');

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();
      console.log(userParsed.roof.roofImg);
      this.setState({
          roof: {
            roofImg: userParsed.roof.roofImg,
            exterior: userParsed.roof.exterior,
            roofColor: userParsed.roof.roofColor,
            pvSystem: userParsed.roof.pvSystem,
            panels: userParsed.roof.panels,
            dcCapacity: userParsed.roof.dcCapacity
          }
        })
    }catch(err){
      return err
    }
  }

  handleInput = (e) => {
    const updatedChange = {
      ...this.state.roof
    }
    updatedChange[e.target.name] = e.target.value;
    this.setState({
      roof: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedRoof = {
      ...this.state.roof
    }

    this.editRoof(updatedRoof)
    this.setState({
      roof : {
        roofImg: null,
        exterior : '',
        roofColor: '',
        pvSystem: '',
        panels: '',
        dcCapacity: '',
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
      roof: {
        ...this.state.roof,
        roofImg: e.target.files[0]
      }
    })
  }

  handleEditFormInput = (e) => {
    this.setState({
      roof: {
        ...this.state.roof,
        [e.target.name]:  e.target.value
      }
    })
  }

    editRoof = async(e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('roofImg', this.state.roof.roofImg);
      data.append('exterior', this.state.roof.exterior);
      data.append('roofColor', this.state.roof.roofColor);
      data.append('pvSystem', this.state.roof.pvSystem);
      data.append('panels', this.state.roof.panels);
      data.append('dcCapacity', this.state.roof.dcCapacity);
      // data.append('time', this.state.house.time);

      let userId = sessionStorage.getItem('userId');
      data.append('userId', userId)
      // const time = new Date();
      // data.append('postingTime', time)
      console.log('before put request', data);
      axios.put(`${process.env.REACT_APP_API}/api/v1/roof/${userId}`, data, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(userId);
        this.props.history.push(`/mycasa/${userId}` );
      })
    }

    deleteMyRoof = async(id, e) => {
      e.preventDefault()

      try{


        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/roof/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        // this.setState({
        //   roof : null
        // })
         this.props.history.push('/mycasa/' + id);

      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }
  render(){
    const userId = sessionStorage.getItem('userId');
    const extriorOptions = ["Select", "Composition Shingles or Metal", "Wood Shakes", "Clay Title", "Concreate Title", "Tar & Gravel"];
    const colorOptions = ["Select", "White", "Light", "Medium", "Dark", "Cool Color With Reflectivity"];
    const roofImgState = `${process.env.REACT_APP_API}/` + this.state.roof.roofImg;
    let upload = "./../../../upload.svg";


    return(
      <div>
        <Nav />
        <div className="editContainer">
        <div className="editTitle">Upate Roof Detils</div>
          <form onSubmit={this.editRoof}>
            <div className="editBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames">
                <img id="photoOne"
                     className={this.state.preview1 ? "imgAttached" : "placer"}
                     src={this.state.preview1 ? this.state.preview1 :  upload}
                     onClick={this.handleClick} />
              </div>
              <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file" />

                <div className="inputContainer">
                  <label className="inputLabel" htmlFor="exterior">EXTERIOR FINISH</label>
                  <select className="selectInput" name="exterior" id="exterior" type="text" onChange={this.handleEditFormInput} value={this.state.roof.exterior}>
                    {extriorOptions.map(extriorOption => {
                        return <option value={extriorOption} key={extriorOption} >{extriorOption}</option>
                    })}
                  </select>
                </div>
                <div className="inputContainer">
                  <label className="inputLabel" htmlFor="roofColor">COLOR</label>
                  <select className="selectInput" name="roofColor" id="roofColor" type="text" onChange={this.handleEditFormInput} value={this.state.roof.roofColor}>
                    {colorOptions.map(colorOption => {
                        return <option value={colorOption} key={colorOption} >{colorOption}</option>
                    })}
                  </select>
                </div>
                <div className="inputContainer">
                  <label className="inputLabel" htmlFor="pvSystem">IS THERE SOLAR PV SYSTEM INSTALLED?*</label>
                  <div id="pvSystem" >
                    <input name="pvSystem" type="radio" checked={this.state.roof.pvSystem === "Yes"} value="Yes" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                    <input name="pvSystem" className="radioInput-right" type="radio" checked={this.state.roof.pvSystem === "No"} value="No" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                  </div>
                </div>
                <div className="inputContainer">
                  <label className="inputLabel" htmlFor="panels">NUMBER OF PANELS</label>
                  <input name="panels" id="panels" type="text" onChange={this.handleEditFormInput} value={this.state.roof.panels} />
                </div>
                <div className="inputContainer">
                  <label className="inputLabel" htmlFor="dcCapacity">SIZE(KW)</label>
                  <input name="dcCapacity" id="dcCapacity" type="text" onChange={this.handleEditFormInput} value={this.state.roof.dcCapacity} />
                </div>
                <div className="inputContainer">
                  <button type="submit" className="btn">SAVE</button>
                  <button className="deleteBtn" onClick={this.deleteMyRoof.bind(null, userId)}>DELETE</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditRoof)
