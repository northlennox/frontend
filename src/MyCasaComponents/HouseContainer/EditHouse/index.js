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
    let userId = localStorage.getItem('userId');
    try{
      const response = await fetch(`http://localhost:9000/api/v1/users/${userId}`, {
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
          //여기서 부터 시작할것, 이 위에 코드가 망가진 것이다.
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

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        console.log('here data', data);

        axios.put(`http://localhost:9000/api/v1/house/${userId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {

          console.log(res.statusText, "here???", res.data.msg);
          this.props.history.push(`/mycasa/${userId}`);
        })
    }

  render(){
    const houseImgState = `http://localhost:9000/` + this.state.house.houseImg;
    return(
      <div>
        <Nav />
        <h1>Edit House</h1>
        <form onSubmit={this.updateHouse}>
          <div>
            <img className="frames"
                 id="photoOne"
                 src={this.state.preview1 === null ? houseImgState : this.state.preview1}
                 onClick={this.handleClick} />
          </div>
          <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>

          <div>
            <label htmlFor="address">ADDRESS</label>
              <input name="address" id="address" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.address} />
          </div>
          <div>
            <label htmlFor="city">CITY</label>
              <input name="city" id="city" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.city} />
          </div>
          <div>
            <label htmlFor="state">STATE</label>
              <input name="state" id="state" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.state} />
          </div>
          <div>
            <label htmlFor="zipcode">ZIPCODE</label>
              <input name="zipcode" id="zipcode" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.zipcode} />
          </div>
          <div>
            <label htmlFor="houseYear">YEAR BUILT</label>
              <input name="houseYear" id="houseYear" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.houseYear} />
          </div>
          <div>
            <label htmlFor="houseSqft">SQUARE FEET</label>
              <input name="houseSqft" id="houseSqft" type="text" className="form-control" onChange={this.handleEditFormInput} value={this.state.house.houseSqft}  />
          </div>
          <button type="submit">Edit/update</button>
        </form>
      </div>
    )
  }
}
export default EditHouse
