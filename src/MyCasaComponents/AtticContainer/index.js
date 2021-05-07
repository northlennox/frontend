import React, { Component } from 'react';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from './../../Nav'
// import './HouseDetailContainer.css';

class AtticContainer extends Component {
  constructor(){
    super()
    this.state = {
      attic : {
        atticImg: [],
        atticType : '',
        atticSqft:'',
        atticDepth:'',
        insulMaterial:'',
        airSealed: '',
        userId: '',
        postingTime:''
      },
      preview3: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.attic
    }
    console.log(e.target.name, e.target.value);
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      attic: updatedChange
    })
  }


  handleClick = (e) => {

    var h = document.getElementById(`input-${e.target.id}`)
    h.click();
    //once click the box,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedAttic = {
      ...this.state.attic
    }

    this.addAttic(updatedAttic)

    this.setState({
      attic : {
        atticImg : null,
        atticType : '',
        atticSqft : '',
        atticDepth : '',
        insulMaterial : '',
        airSealed: '',
        userId: '',
      },
    })
  }

    fileSelectHandler = (e) => {
      var file3

      switch (e.target.id) {
        case 'input-photoThree':
            file3 = e.target.files[0];
          break;

        default:
          console.log('errorrrrr');
          return 0;
      }


      var reader3 = new FileReader();


      var url3 = typeof file3 !== 'undefined'? reader3.readAsDataURL(file3):null;


      reader3.onloadend = function(e){
        this.setState({
          preview3: [reader3.result || null],
        })
      }.bind(this)


      this.setState({
        attic : {
          ...this.state.attic,
          atticImg : [...this.state.attic.atticImg, e.target.files[0]]
        }
      })
    }


    addAttic = async(updatedAttic) => {

        const data = new FormData();

        for(let i = 0; i < this.state.attic.atticImg.length; i++){
            data.append('atticImg', this.state.attic.atticImg[i]);
        }

        data.append('atticType', this.state.attic.atticType);
        data.append('atticSqft', this.state.attic.atticSqft);
        data.append('atticDepth', this.state.attic.atticDepth);
        data.append('insulMaterial', this.state.attic.insulMaterial);
        data.append('airSealed', this.state.attic.airSealed);
        //data.append('postingTime', this.state.house.postingTime);

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
                    <div><img className="frames" id="photoThree" src={this.state.preview3}  onClick={this.handleClick} height={100} width={100} /></div>
                      <input name="photoThree" className="hide" id="input-photoThree" onChange={this.fileSelectHandler} type="file"/>
                  </div>
                </div>
                <div className="container-form-group">
                  <div className="form-group">
                    <label htmlFor="atticType">PRIMARY ATTIC TYPE</label>
                    <input name="atticType" id="atticType" type="text" className="form-control" onChange={this.handleInput} value={this.state.attic.atticType} placeholder="Unconditioned Attic" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE (GUESS)</label>
                    <input name="atticSqft" id="atticSqft" type="text" className="form-control" onChange={this.handleInput} value={this.state.attic.atticSqft} placeholder="100" />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="atticDepth">ESTIMATED AVERAGE DEPTH (INCHES)*</label>
                    <input name="atticDepth" id="atticDepth" type="text" className="form-control" onChange={this.handleInput} value={this.state.attic.atticDepth} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="insulMaterial">INSULATION MATERIAL</label>
                    <input name="insulMaterial" id="insulMaterial" type="text" className="form-control" onChange={this.handleInput} value={this.state.attic.insulMaterial} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="airSealed">HAS THE HOUSE BEEN PROFESSIONALLY AIR SEALED?</label>
                    <input name="airSealed" id="airSealed" type="text" className="form-control" onChange={this.handleInput} value={this.state.attic.airSealed} />
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
export default AtticContainer
