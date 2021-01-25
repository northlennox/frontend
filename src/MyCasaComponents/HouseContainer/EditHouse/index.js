import React, { Component } from 'react';
import Nav from '../../../Nav';
import axios from 'axios'


class EditHouse extends Component {
  constructor(){
    super()

    this.state = {
      house : {
        houseImg: null,
        address : '',
        city:'',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
      },
      preview1: null,
      selectedFile : null,
    }
  }

  componentDidMount(){
    this.getHouseInfo()
  };

  getHouseInfo = async() => {
    let userId = sessionStorage.getItem('userId');
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`, {
        credentials: 'include',
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();


      this.setState({
        house: {
          houseImg: userParsed.house.houseImg,
          address : userParsed.house.address,
          city: userParsed.house.city,
          state: userParsed.house.state,
          zipcode: userParsed.house.zipcode,
          houseYear: userParsed.house.houseYear,
          houseSqft: userParsed.house.houseSqft,
        }
      })

      }catch(err){
      return err
    }
  };


  handleInput = (e) => {

    const updatedChange = {
      ...this.state.house
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      house: updatedChange
    })
  }

  handleClick = (e) => {
    // console.log('---->',e.target.id);
    var h = document.getElementById(`input-${e.target.id}`)
    h.click();

  }

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedHouse = {
      ...this.state.house
    }

    console.log('~~~~', updatedHouse);
    this.addHouse(updatedHouse)

    this.setState({
      house : {
        houseImg: null,
        address : '',
        city: '',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
        userId: '',
      },
    })
  }



    fileSelectHandler = (e) => {

      var file1
      console.log('&&&', e.target.files[0]);

      switch (e.target.id) {
        case 'input-photoOne':
            file1 = e.target.files[0];
            console.log('jh?');
          break;
        default:
          console.log('errorrrrr');
          return 0;

      }

      var reader1 = new FileReader();
      var url1 = typeof file1 !== 'undefined'? reader1.readAsDataURL(file1):null;


      reader1.onloadend = function(e){
        this.setState({
          preview1: [reader1.result || null],
        })
      }.bind(this)

      console.log(file1, e.target.files[0]);
      console.log('0000', this.state.house.houseImg);
      this.setState({
        house: {
          ...this.state.house,
          houseImg: e.target.files[0]
        }
      })
    }




  handleEditFormInput = (e) => {

    this.setState({
      house: {
        ...this.state.house,
        [e.target.name]:  e.target.value
      }
    })
  }


    updateHouse = async(e) => {
         e.preventDefault();

        const data = new FormData();

        data.append('houseImg', this.state.house.houseImg);
        data.append('address', this.state.house.address);
        data.append('city', this.state.house.city);
        data.append('state', this.state.house.state);
        data.append('zipcode', this.state.house.zipcode);
        data.append('houseYear', this.state.house.houseYear);
        data.append('houseSqft', this.state.house.houseSqft);
        // data.append('memo', this.state.house.memo);
        data.append('time', this.state.house.time);

        let userId = sessionStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        console.log('here data', data);

        axios.put(`${process.env.REACT_APP_API}/api/v1/house/${userId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {

          console.log(res.statusText, "here???", res.data.msg);
          this.props.history.push(`/mycasa/${userId}`);
        })
    }

    deleteMyHouse = async(id, e) => {
      // e.preventDefault()

      try{
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        //
        // this.setState({
        //   house : null
        // });

        console.log('this.state.house', this.state.house);
        this.props.history.push('/mycasa/' + userId);
      }catch(err){
        alert('Something went wrong. Please try again')
      }

    }

  render(){
    const userId = sessionStorage.userId;
    const houseImgState = `${process.env.REACT_APP_API}/` + this.state.house.houseImg;
    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    let upload = "./../../../upload.svg";
    return(
      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">Update House Details</div>
          <form onSubmit={this.updateHouse}>
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
                <label className="inputLabel" htmlFor="address">ADDRESS</label>
                <input name="address" id="address" type="text" onChange={this.handleEditFormInput} value={this.state.house.address} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="city">CITY</label>
                <input name="city" id="city" type="text" onChange={this.handleEditFormInput} value={this.state.house.city} />
              </div>
              <div className="inputRow">
                <div className="inputItem">
                  <div className="inputContainer">
                    <label className="inputLabel" htmlFor="state">STATE</label>
                    <select className="selectInput" name="state" id="state" type="text" onChange={this.handleEditFormInput} value={this.state.house.state}>
                      {states.map(st => {
                          return <option value={st} key={st} >{st}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="inputItem">
                  <div className="inputContainer">
                    <label className="inputLabel" htmlFor="zipcode">ZIP CODE</label>
                    <input name="zipcode" id="zipcode" type="text"  onChange={this.handleEditFormInput} value={this.state.house.zipcode} />
                  </div>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="houseYear">YEAR BUILT</label>
                <input name="houseYear" id="houseYear" type="text" onChange={this.handleEditFormInput} value={this.state.house.houseYear} />
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="houseSqft">SQUARE FEET</label>
                <input name="houseSqft" id="houseSqft" type="text" onChange={this.handleEditFormInput} value={this.state.house.houseSqft}  />
              </div>
              <div className="inputContainer">
                <button className="btn" type="submit">SAVE</button>
                <button className="deleteBtn" onClick={this.deleteMyHouse.bind(null, userId)}>DELETE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default EditHouse
