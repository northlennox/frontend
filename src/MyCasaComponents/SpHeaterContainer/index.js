import React, { Component } from 'react';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from './../../Nav'
// import './HouseDetailContainer.css';

class SpHeaterContainer extends Component {
  constructor(){
    super()
    this.state = {
      spheater : {
        spHeaterImg: [],
        spHeaterType : '',
        atticSqft:'',
        spHeaterYear:'',
        spHeaterCondition:'',
        coolingSystem:'',
        userId: '',
        postingTime:''
      },
      preview5: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.spheater
    }

    updatedChange[e.target.name] = e.target.value;

    this.setState({
      spheater: updatedChange
    })
  }


  handleClick = (e) => {

    var h = document.getElementById(`input-${e.target.id}`)
    h.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedSpheater = {
      ...this.state.spheater
    }

    this.addspheater(updatedSpheater)

    this.setState({
      spheater : {
        spHeaterImg : null,
        spHeaterType : '',
        atticSqft : '',
        spHeaterYear : '',
        spHeaterCondition : '',
        coolingSystem : '',
        userId: '',
      },
    })
  }

    fileSelectHandler = (e) => {
      var file5
      console.log('hhh');
      switch (e.target.id) {
        case 'input-photoFive':
            file5 = e.target.files[0];
          break;

        default:
          console.log('errorrrrr');
          return 0;
      }


      var reader5 = new FileReader();


      var url5 = typeof file5 !== 'undefined'? reader5.readAsDataURL(file5):null;


      reader5.onloadend = function(e){
        this.setState({
          preview5: [reader5.result || null],
        })
      }.bind(this)


      this.setState({
        spheater : {
          ...this.state.spheater,
          spHeaterImg : [...this.state.spheater.spHeaterImg, e.target.files[0]]
        }
      })
    }


    addspheater = async(updatedSpheater) => {

        const data = new FormData();
                console.log('---', this.state.spheater.spHeaterImg);
        for(let i = 0; i < this.state.spheater.spHeaterImg.length; i++){

            data.append('spHeaterImg', this.state.spheater.spHeaterImg[i]);
        }

        data.append('spHeaterType', this.state.spheater.spHeaterType);
        data.append('atticSqft', this.state.spheater.atticSqft);
        data.append('spHeaterYear', this.state.spheater.spHeaterYear);
        data.append('spHeaterCondition', this.state.spheater.spHeaterCondition);
        data.append('coolingSystem', this.state.spheater.coolingSystem);
        //data.append('postingTime', this.state.house.postingTime);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/spheater`, data, {
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
                    <div><img className="frames" id="photoFive" src={this.state.preview5}  onClick={this.handleClick } height={100} width={100} /></div>
                      <input name="photoFive" className="hide" id="input-photoFive" onChange={this.fileSelectHandler} type="file"/>
                  </div>
                </div>
                <div className="container-form-group">
                  <div className="form-group">
                    <label htmlFor="spHeaterType">TYPE OF SPACE HEATER</label>
                    <input name="spHeaterType" id="spHeaterType" type="text" className="form-control" onChange={this.handleInput} value={this.state.spheater.spHeaterType} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="atticSqft">ATTIC SQUARE FOOTAGE (GUESS)</label>
                    <input name="atticSqft" id="atticSqft" type="text" className="form-control" onChange={this.handleInput} value={this.state.spheater.atticSqft}  />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="spHeaterYear">YEAR OF MANUFACTURE*</label>
                    <input name="spHeaterYear" id="spHeaterYear" type="text" className="form-control" value={this.state.spheater.spHeaterYear} onChange={this.handleInput} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="spHeaterCondition">IS THE SYSTEM WORKING WELL?</label>
                    <input name="spHeaterCondition" id="spHeaterCondition" type="text" className="form-control" value={this.state.spheater.spHeaterCondition} onChange={this.handleInput} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="coolingSystem">IS THERE A COOLING SYSTEM?</label>
                    <input name="coolingSystem" id="coolingSystem" type="text" className="form-control" onChange={this.handleInput} value={this.state.spheater.coolingSystem} />
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
export default SpHeaterContainer
