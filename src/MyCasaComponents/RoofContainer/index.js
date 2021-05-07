import React, { Component } from 'react';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from './../../Nav'
// import './HouseDetailContainer.css';

class RoofContainer extends Component {
  constructor(){
    super()
    this.state = {
      roof : {
        roofImg: [],
        exterior : '',
        roofColor:'',
        pvSystem:'',
        panels:'',
        dcCapacity:'',
        userId: '',
        postingTime:''
      },
      preview1: null,
      selectedFile : null,
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

    var h = document.getElementById(`input-${e.target.id}`)
    h.click();
    //once click the box,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedRoof = {
      ...this.state.roof
    }

    this.addRoof(updatedRoof)

    this.setState({
      roof : {
        roofImg : null,
        exterior : '',
        roofColor : '',
        pvSystem : '',
        panels : '',
        dcCapacity: '',
        userId: '',
      },
    })
  }

    fileSelectHandler = (e) => {
      var file2

      switch (e.target.id) {
        case 'input-photoTwo':
            file2 = e.target.files[0];
          break;

        default:
          console.log('errorrrrr');
          return 0;
      }


      var reader2 = new FileReader();


      var url2 = typeof file2 !== 'undefined'? reader2.readAsDataURL(file2):null;


      reader2.onloadend = function(e){
        this.setState({
          preview2: [reader2.result || null],
        })
      }.bind(this)


      this.setState({
        roof : {
          ...this.state.roof,
          roofImg : [...this.state.roof.roofImg, e.target.files[0]]
        }
      })
    }


    addRoof = async(updatedRoof) => {

        const data = new FormData();

        for(let i = 0; i < this.state.roof.roofImg.length; i++){
            data.append('roofImg', this.state.roof.roofImg[i]);
        }
        console.log(this.state.roof.exterior);
        data.append('exterior', this.state.roof.exterior);
        data.append('roofColor', this.state.roof.roofColor);
        data.append('pvSystem', this.state.roof.pvSystem);
        data.append('panels', this.state.roof.panels);
        data.append('dcCapacity', this.state.roof.dcCapacity);
        //data.append('postingTime', this.state.house.postingTime);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/roof`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          // console.log(res.statusText, "here???", res.data.msg);
          this.props.history.push('/mycasa/start');
        })
    }


  render(){

    return(

      <div>
        <Nav />
          <form onSubmit={this.handleSubmit} className="createForm">
            <div className="">
                <div className="">

                  <div className="">
                    <div><img className="frames" id="photoTwo" src={this.state.preview2}  onClick={this.handleClick } height={100} width={100} /></div>
                      <input name="photoTwo" className="hide" id="input-photoTwo" onChange={this.fileSelectHandler} type="file"/>
                  </div>
                </div>
                <div className="container-form-group">
                  <div className="form-group">
                    <label htmlFor="exterior">EXTERIOR</label>
                    <input name="exterior" id="exterior" type="text" className="form-control" onChange={this.handleInput} value={this.state.roof.exterior} placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="roofColor">COLOR</label>
                    <input name="roofColor" id="roofColor" type="text" className="form-control" onChange={this.handleInput} value={this.state.roof.roofColor} placeholder="" />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="state">IS THERE SOLAR PV SYSTEM INSTALLED?*</label>
                    <input name="pvSystem" id="pvSystem" type="text" className="form-control" value={this.state.roof.pvSystem} onChange={this.handleInput} placeholder=""/>
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="panels">NUMBER OF PANELS</label>
                    <input name="panels" id="panels" type="text" className="form-control" value={this.state.roof.panels} onChange={this.handleInput} placeholder="" />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="dcCapacity">SIZE(KW)</label>
                    <input name="dcCapacity" id="dcCapacity" type="text" className="form-control" onChange={this.handleInput} value={this.state.roof.dcCapacity} placeholder="" />
                  </div>
                </div>
              <div className="">
                <button type="submit" className="submitBtn">NEXT</button>
              </div>
            </div>
          </form>
      </div>
    )
  }
}
export default RoofContainer
