import React, { Component } from 'react';
import Nav from '../../../Nav';
import axios from 'axios';
import ReactTooltip from "react-tooltip";

class EditHouse extends Component {
  constructor(){
    super();

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
  };

  componentDidMount(){
    this.getHouseInfo();
  };

  getHouseInfo = async() => {
    let userId = sessionStorage.getItem('userId');
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/${userId}`, {
        credentials: 'include',
      });

      if(!response.ok){
        throw Error(response.statusText)
      };

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
      });

      } catch(err) {
      return err
    };
  };

  handleInput = e => {
    const updatedChange = {
      ...this.state.house
    };

    updatedChange[e.target.name] = e.target.value;

    this.setState({
      house: updatedChange
    })
  };

  handleClick = e => {
    var h = document.getElementById(`input-${e.target.id}`);
    h.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedHouse = {
      ...this.state.house
    };

    this.addHouse(updatedHouse);

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
    });
  };

  fileSelectHandler = e => {
    var file1;

    switch (e.target.id) {
      case 'input-photoOne':
          file1 = e.target.files[0];
          console.log('jh?');
        break;
      default:
        console.log('errorrrrr');
        return 0;
    };

    var reader1 = new FileReader();
    var url1 = typeof file1 !== 'undefined'? reader1.readAsDataURL(file1):null;

    reader1.onloadend = function(e){
      this.setState({
        preview1: [reader1.result || null],
      });
    }.bind(this);

    this.setState({
      house: {
        ...this.state.house,
        houseImg: e.target.files[0]
      }
    });
  }

  handleEditFormInput = e => {
    this.setState({
      house: {
        ...this.state.house,
        [e.target.name]:  e.target.value
      }
    });
  };

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
    data.append('userId', userId);

    const time = new Date();
    data.append('postingTime', time);

    console.log('here data', data);

    axios.put(`${process.env.REACT_APP_API}/api/v1/house/${userId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      this.props.history.push(`/mycasa/${userId}`);
    });
  }

    deleteMyHouse = async(id, e) => {
      try {
        const userId = sessionStorage.getItem('userId');

        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + `${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if(!response.ok){
          throw Error(response.statusText)
        }

        this.props.history.push('/mycasa/' + userId);
      } catch(err) {
        alert('Something went wrong. Please try again')
      };
    };

  render() {
    let statesObj = [
    {
        "name": "None",
        "abbreviation": ""
    },
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
  ];

  const upload = "./../../../upload.svg";
  const sampleHouseImg = "./../../SampleImages/houseSample.jpg";
  const userId = sessionStorage.userId;
  const houseImgState = `${process.env.REACT_APP_API}/` + this.state.house.houseImg;

    return (
      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle">House Details</div>
          <form onSubmit={this.updateHouse}>
            <div className="editBox">
              <div className="helpContainer">
                <span className="inputLabel">PHOTO</span>
                <img data-tip data-for="helpTip" className="help" src="./../../help.svg"/>
                <ReactTooltip id="helpTip" place="bottom" effect="solid" className="tooltipContainer">
                  <img className="sampleImg" src={sampleHouseImg}/>
                  <div className="sampleText">Take a photo of the front of your house.</div>
                </ReactTooltip>
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
                      {statesObj.map(st => {
                          return <option value={st.abbreviation} key={st}>{st.name}</option>
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
    );
  };
};

export default EditHouse;
