import React, { Component } from 'react';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../Nav'
// import './HouseDetailContainer.css';

class WaHeaterContainer extends Component {
  constructor(){
    super()
    this.state = {
      waheater : {
        waheaterImg: [],
        waheaterType : '',
        waheaterBrand:'',
        waheaterYear:'',
        waheaterCondition:'',
        waheaterSingle:'',
        userId: '',
        postingTime:''
      },
      preview3: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.waheater
    }

    updatedChange[e.target.name] = e.target.value;

    this.setState({
      waheater: updatedChange
    })
  }


  handleClick = (e) => {

    var h = document.getElementById(`input-${e.target.id}`)
    h.click();
    //once click the box,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedWaheater = {
      ...this.state.waheater
    }

    this.addWaheater(updatedWaheater)

    this.setState({
      waheater : {
        waheaterImg : null,
        waheaterType : '',
        waheaterBrand : '',
        waheaterYear : '',
        waheaterCondition : '',
        waheaterSingle: '',
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
        waheater : {
          ...this.state.waheater,
          waheaterImg : [...this.state.waheater.waheaterImg, e.target.files[0]]
        }
      })
    }


    addWaheater = async(updatedWaheater) => {

        const data = new FormData();

        for(let i = 0; i < this.state.waheater.waheaterImg.length; i++){
            data.append('waheaterImg', this.state.waheater.waheaterImg[i]);
        }

        data.append('waheaterType', this.state.waheater.waheaterType);
        data.append('waheaterBrand', this.state.waheater.waheaterBrand);
        data.append('waheaterYear', this.state.waheater.waheaterYear);
        data.append('waheaterCondition', this.state.waheater.waheaterCondition);
        data.append('waheaterSingle', this.state.waheater.waheaterSingle);
        //data.append('postingTime', this.state.house.postingTime);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/waheater`, data, {
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
                    <div><img className="frames" id="photoThree" src={this.state.preview3}  onClick={this.handleClick } height={100} width={100} /></div>
                      <input name="photoThree" className="hide" id="input-photoThree" onChange={this.fileSelectHandler} type="file"/>
                  </div>
                </div>
                <div className="container-form-group">
                  <div className="form-group">
                    <label htmlFor="waheaterType">TYPE OF WATER HEATER</label>
                    <input name="waheaterType" id="waheaterType" type="text" className="form-control" onChange={this.handleInput} value={this.state.waheater.waheaterType} placeholder="Natural Gas Storage" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="waheaterBrand">BRAND</label>
                    <input name="waheaterBrand" id="waheaterBrand" type="text" className="form-control" onChange={this.handleInput} value={this.state.waheater.waheaterBrand} placeholder="Bradford White Corporation" />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="waheaterYear">YEAR OF MANUFACTURE*</label>
                    <input name="waheaterYear" id="waheaterYear" type="text" className="form-control" value={this.state.waheater.waheaterYear} onChange={this.handleInput} placeholder="2013"/>
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="waheaterCondition">IS THE SYSTEM WORKING WELL?</label>
                    <input name="waheaterCondition" id="waheaterCondition" type="text" className="form-control" value={this.state.waheater.waheaterCondition} onChange={this.handleInput} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="waheaterSingle">IS THERE MORE THAN ONE WATER HEATER?</label>
                    <input name="waheaterSingle" id="waheaterSingle" type="text" className="form-control" onChange={this.handleInput} value={this.state.waheater.waheaterSingle} />
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
export default WaHeaterContainer
