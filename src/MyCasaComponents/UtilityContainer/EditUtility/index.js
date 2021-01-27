import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import Moment from 'react-moment';
import Nav from '../../../Nav'


class EditUtility extends Component {
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
      preview1: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };



  getHouseInfo = async() => {
    // const userId = window.location.pathname.split('/')[2];
    const userId = sessionStorage.getItem('userId');

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();
      console.log(userParsed.utility);
      this.setState({
          utility: {
            utilityImg: userParsed.utility.utilityImg,
            utilityName: userParsed.utility.utilityName,
            electricityUsageKwh: userParsed.utility.electricityUsageKwh,
            electricityUsageDollar: userParsed.utility.electricityUsageDollar,
            gasUsageTherms: userParsed.utility.gasUsageTherms,
            gasUsageDollar: userParsed.utility.gasUsageDollar,
            highBilling: userParsed.utility.highBilling,
            oldEquipment: userParsed.utility.oldEquipment
          },

      })
    }catch(err){
      return err
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

    this.editUtility(updatedUtility)
    //set empty after call the function
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
      }
    })
  }

    fileSelectHandler = (e) => {
      var file1
        console.log('files', e.target.files);
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
          utilityImg: e.target.files[0]
        }
      })

    }

    handleEditFormInput = (e) => {
      e.preventDefault()
      this.setState({
        utility: {
          ...this.state.utility,
          [e.target.name]:  e.target.value
        }
      })
    }

    editUtility = async(e) => {
      e.preventDefault();

        const data = new FormData();
        data.append('utilityImg', this.state.utility.utilityImg);
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

        // const time = new Date();
        // data.append('postingTime', time)
        console.log('put request');
        axios.put(`${process.env.REACT_APP_API}/api/v1/utility/${userId}`, data, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(userId);
          this.props.history.push(`/mycasa/${userId}` );
        })
    }


    deleteMyUtility = async(id, e) => {
      e.preventDefault()

      try{

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/utility/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.props.history.push('/mycasa/' + id);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }


  render(){
    const userId = sessionStorage.getItem('userId');
    const utilityImgState = `${process.env.REACT_APP_API}/` + this.state.utility.utilityImg;
    let upload = "./../../../upload.svg";

    return(

      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Utility Bills Details</div>
          <form onSubmit={this.editUtility}>
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
              <input name="photoOne" className="fileUpload" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
              <div className="inputContainer">
                <label htmlFor="utilityName">UTILITY NAME</label>
                <input name="utilityName" id="utilityName" type="text" onChange={this.handleEditFormInput} value={this.state.utility.utilityName} />
              </div>
              <div className="inputContainer">
                <label htmlFor="electricityUsageKwh">ELECTRICITY USAGE, KWH</label>
                <input name="electricityUsageKwh" id="electricityUsageKwh" type="text" onChange={this.handleEditFormInput} value={this.state.utility.electricityUsageKwh} />
              </div>
              <div className="inputContainer">
                <label htmlFor="electricityUsageDollar">ELECTRICITY USAGE, $</label>
                <input name="electricityUsageDollar" id="electricityUsageDollar" type="text" onChange={this.handleEditFormInput} value={this.state.utility.electricityUsageDollar} />
              </div>
              <div className="inputContainer">
                <label htmlFor="gasUsageTherms">GAS USAGE, THERMS</label>
                <input name="gasUsageTherms" id="gasUsageTherms" type="text" onChange={this.handleEditFormInput} value={this.state.utility.gasUsageTherms} />
              </div>
              <div className="inputContainer">
                <label htmlFor="gasUsageDollar">GAS USAGE, $</label>
                <input name="gasUsageDollar" id="gasUsageDollar" type="text" onChange={this.handleEditFormInput} value={this.state.utility.gasUsageDollar} />
              </div>
              <div className="inputContainer">
                <label htmlFor="highBilling">ARE YOUR ENERGY BILLS TOO HIGH?</label>
                <div id="highBilling" >
                  <input name="highBilling" type="radio" checked={this.state.utility.highBilling === "YES"} value="YES" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input name="highBilling" className="radioInput-right" type="radio" checked={this.state.utility.highBilling === "NO"} value="NO" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label htmlFor="oldEquipment">DO YOU HAVE ANY EQUIPMENT OLDER THAN 25 YEARS EG. AN OLD FREEZER?</label>
                <div id="oldEquipment" >
                  <input name="oldEquipment" type="radio" checked={this.state.utility.oldEquipment === "YES"} value="YES" onChange={this.handleEditFormInput}/><span className="radioNext">YES</span>
                  <input name="oldEquipment" className="radioInput-right" type="radio" checked={this.state.utility.oldEquipment === "NO"} value="NO" onChange={this.handleEditFormInput}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button type="submit" className="btn">SAVE</button>
                <button className="deleteBtn" onClick={this.deleteMyUtility.bind(null, userId)}>DELETE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(EditUtility)
