import React, { Component } from 'react';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from './../../Nav'
// import './HouseDetailContainer.css';

class UtilityContainer extends Component {
  constructor(){
    super()
    this.state = {
      utility : {
        utilityImg: [],
        utilityName : '',
        electricityUsageKwh:'',
        electricityUsageDollar:'',
        gasUsageTherms:'',
        gasUsageDollar: '',
        highBilling: '',
        oldEquipment: '',
        userId: '',
        postingTime:''
      },
      preview3: null,
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

    var h = document.getElementById(`input-${e.target.id}`)
    h.click();
    //once click the box,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedUtility = {
      ...this.state.utility
    }

    this.addUtility(updatedUtility)

    this.setState({
      utility : {
        utilityImg: null,
        utilityName : '',
        electricityUsageKwh:'',
        electricityUsageDollar:'',
        gasUsageTherms:'',
        gasUsageDollar: '',
        highBilling: '',
        oldEquipment: '',
        userId: '',
      },
    })
  }

    fileSelectHandler = (e) => {
      var file6
      console.log('here?');
      switch (e.target.id) {
        case 'input-photoSix':
            file6 = e.target.files[0];
          break;

        default:
          console.log('errorrrrr');
          return 0;
      }


      var reader6 = new FileReader();


      var url6 = typeof file6 !== 'undefined'? reader6.readAsDataURL(file6):null;


      reader6.onloadend = function(e){
        this.setState({
          preview6: [reader6.result || null],
        })
      }.bind(this)


      this.setState({
        utility : {
          ...this.state.utility,
          utilityImg : [...this.state.utility.utilityImg, e.target.files[0]]
        }
      })
    }


    addUtility = async(updatedUtility) => {

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
        //data.append('postingTime', this.state.house.postingTime);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/utility`, data, {
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
                    <div><img className="frames" id="photoSix" src={this.state.preview6}  onClick={this.handleClick} height={100} width={100} /></div>
                      <input name="photoSix" className="hide" id="input-photoSix" onChange={this.fileSelectHandler} type="file"/>
                  </div>
                </div>
                <div className="container-form-group">
                  <div className="form-group">
                    <label htmlFor="utilityName">UTILITY NAME</label>
                    <input name="utilityName" id="utilityName" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.utilityName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="electricityUsageKwh">ELECTRICITY USAGE, KWH</label>
                    <input name="electricityUsageKwh" id="electricityUsageKwh" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.electricityUsageKwh} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="electricityUsageDollar">ELECTRICITY USAGE, $</label>
                    <input name="electricityUsageDollar" id="electricityUsageDollar" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.electricityUsageDollar} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="gasUsageTherms">GAS USAGE, THERMS</label>
                    <input name="gasUsageTherms" id="gasUsageTherms" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.gasUsageTherms} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="gasUsageDollar">GAS USAGE, $</label>
                    <input name="gasUsageDollar" id="gasUsageDollar" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.gasUsageDollar} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="highBilling">ARE YOUR ENERGY BILLS TOO HIGH?</label>
                    <input name="highBilling" id="highBilling" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.highBilling} />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="oldEquipment">DO YOU HAVE ANY EQUIPMENT OLDER THAN 25 YEARS EG.AN OLD FREEAER?</label>
                    <input name="oldEquipment" id="oldEquipment" type="text" className="form-control" onChange={this.handleInput} value={this.state.utility.oldEquipment} />
                  </div>
                </div>
              <div className="">
                <button type="submit" className="submitBtn">SAVE</button>
              </div>
            </div>
          </form>
      </div>
    )
  }
}
export default UtilityContainer
