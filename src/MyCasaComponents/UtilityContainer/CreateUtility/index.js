import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class CreateUtility extends Component {
  constructor(){
    super()
    this.state = {
      utility : {
        utilityImg: [],
        utilityName : '',
        electricityUsageKwh: '',
        electricityUsageDollar: '',
        gasUsageTherms: '',
        gasUsageDollar: '',
        highBilling:'',
        oldEquipment:'',
        userId: '',
      },
      preview: null,
      selectedFile : null,
    }
  }


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.utility
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      utility: updatedChange
    })
  }

  handleClick = (e) => {
    var frame = document.getElementById(`input-${e.target.id}`)
    frame.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedUtility = {
      ...this.state.utility
    }

    this.addAttic(updatedUtility)

    this.setState({
      utility : {
        utilityImg: null,
        utilityName : '',
        electricityUsageKwh: '',
        electricityUsageDollar: '',
        gasUsageTherms: '',
        gasUsageDollar: '',
        highBilling:'',
        oldEquipment:'',
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
        utility: {
          ...this.state.utility,
          utilityImg: [...this.state.utility.utilityImg, e.target.files[0]]
        }
      })
    }


    addAttic = async(updatedUtility) => {
        const data = new FormData();
        for(let i = 0; i < this.state.utility.utilityImg.length; i++){
            data.append('utilityImg', this.state.utility.utilityImg[i]);
        }

        data.append('utilityName', this.state.utility.utilityName);
        data.append('electricityUsageKwh', this.state.utility.electricityUsageKwh);
        data.append('electricityUsageDollar', this.state.utility.electricityUsageDollar);
        data.append('gasUsageTherms', this.state.utility.gasUsageTherms);
        data.append('gasUsageDollar', this.state.utility.gasUsageDollar);
        data.append('highBilling', this.state.utility.highBilling);
        data.append('oldEquipment', this.state.utility.oldEquipment);
        // data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/utility`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/' +  userId);
        })
    }


  render(){
    let upload = "./../../../upload.svg";
    return(

      <div>
        <Nav />
        <div className="createContainer">
          <div className="createTitle">Utility Bills Details</div>
          <form onSubmit={this.handleSubmit}>
            <div className="createBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img className="help" src="./../../help.svg"/>
              </div>
              <div className="frames" >
                <img className={this.state.preview1 ? "imgAttached" : "placer"} id="photoOne" src={this.state.preview1 ? this.state.preview1 :  upload}  onClick={this.handleClick } />
                <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="utilityName">UTILITY NAME</label>
                <input name="utilityName" id="utilityName" type="text" onChange={this.handleInput} value={this.state.utility.utilityName} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="electricityUsageKwh">ELECTRICITY USAGE, KWH</label>
                <input name="electricityUsageKwh" id="electricityUsageKwh" type="text" onChange={this.handleInput} value={this.state.utility.electricityUsageKwh} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="electricityUsageDollar">ELECTRICITY USAGE, $</label>
                <input name="electricityUsageDollar" id="electricityUsageDollar" type="text" onChange={this.handleInput} value={this.state.utility.electricityUsageDollar} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="gasUsageTherms">GAS USAGE, THERMS</label>
                <input name="gasUsageTherms" id="gasUsageTherms" type="text" onChange={this.handleInput} value={this.state.utility.gasUsageTherms} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="gasUsageDollar">GAS USAGE, $</label>
                <input name="gasUsageDollar" id="gasUsageDollar" type="text" onChange={this.handleInput} value={this.state.utility.gasUsageDollar} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="highBilling">ARE YOUR ENERGY BILLS TOO HIGH?</label>
                <div id="highBilling" >
                  <input name="highBilling" type="radio" checked={this.state.utility.highBilling === "YES"} value="YES" onChange={this.handleInput}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="highBilling" type="radio" checked={this.state.utility.highBilling === "NO"} value="NO" onChange={this.handleInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="oldEquipment">DO YOU HAVE ANY EQUIPMENT OLDER THAN 25 YEARS EG. AN OLD FREEZER?</label>
                <div id="oldEquipment" >
                  <input name="oldEquipment" type="radio" checked={this.state.utility.oldEquipment === "YES"} value="YES" onChange={this.handleInput}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="oldEquipment" type="radio" checked={this.state.utility.oldEquipment === "NO"} value="NO" onChange={this.handleInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">SAVE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateUtility)
