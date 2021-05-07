import React, { Component } from 'react';
import Nav from './../../Nav';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Moment from 'react-moment';
import './Create.scss';

class CreateContainer extends Component {
  constructor(){
    super()
    this.state = {
      house : {
        houseImg:[],
        address : '',
        city:'',
        state: '',
        zipcode: '',
        houseYear: '',
        houseSqft: '',
        // pic1: [],
        // memo: '',
      },
      preview1: null,
      // preview2: null,
      // preview3: null,
      // preview4: null,
      selectedFile : null,
    }
  }


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
        // pic1: null,
        // memo: '',
        userId: '',
      },
    })
  }



    fileSelectHandler = (e) => {
      // var file1, file2, file3, file4;
      var file1
      console.log('&&&', e.target.files[0]);
      // var singleFile = ''
      switch (e.target.id) {
        case 'input-photoOne':
            file1 = e.target.files[0];
          break;
       //  case 'input-photoTwo':
       //     file2 = e.target.files[0]; // ?? index
       //     break;
       // case 'input-photoThree':
       //    file3 = e.target.files[0];
       //    break;
       //
       // case 'input-photoFour':
       //     file4 = e.target.files[0];
       //     break;
        default:
          console.log('errorrrrr');
          return 0;

      }

      var reader1 = new FileReader();
      // var reader2 = new FileReader();
      // var reader3 = new FileReader();
      // var reader4 = new FileReader();

      var url1 = typeof file1 !== 'undefined'? reader1.readAsDataURL(file1):null;
      // var url2 = typeof file2 !== 'undefined'? reader2.readAsDataURL(file2):null;
      // var url3 = typeof file3 !== 'undefined'? reader3.readAsDataURL(file3):null;
      // var url4 = typeof file4 !== 'undefined'? reader4.readAsDataURL(file4):null;


      reader1.onloadend = function(e){
        this.setState({
          preview1: [reader1.result || null],
        })
      }.bind(this)

      // reader2.onloadend = function(e){
      //   this.setState({
      //     preview2: [reader2.result || null],
      //   })
      // }.bind(this)
      //
      // reader3.onloadend = function(e){
      //   this.setState({
      //     preview3: [reader3.result || null],
      //   })
      // }.bind(this)
      //
      // reader4.onloadend = function(e){
      //   this.setState({
      //     preview4: [reader4.result || null],
      //   })
      // }.bind(this)



      this.setState({
        house: {
          ...this.state.house,
          houseImg: [...this.state.house.houseImg, e.target.files[0]]
        }
      })
    }


    addHouse = async(updatedHouse) => {


        const data = new FormData();

        for(let i = 0; i < this.state.house.houseImg.length; i++){
            data.append('houseImg', this.state.house.houseImg[i]);
        }

        data.append('address', this.state.house.address);
        data.append('city', this.state.house.city);
        data.append('state', this.state.house.state);
        data.append('zipcode', this.state.house.zipcode);
        data.append('houseYear', this.state.house.houseYear);
        data.append('houseSqft', this.state.house.houseSqft);
        data.append('time', this.state.house.time);

        let userId = localStorage.getItem('userId');
        data.append('userId', userId)

        const time = new Date();
        data.append('postingTime', time)

        axios.post(`${process.env.REACT_APP_API}/api/v1/house`, data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          this.props.history.push('/mycasa/start');
        })
    }


  render(){

    return(

      <div>
        <Nav />
          <div className="title">Home Details</div>
          <form onSubmit={this.handleSubmit} className="homedetails_container">
                <div className="photo_mark">PHOTO</div>
                <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } /></div>
                  <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
                <div className="form_box">
                  <div className="form-group">
                    <label htmlFor="address">ADDRESS</label>
                    <input name="address" id="address" type="text" className="form-control" onChange={this.handleInput} placeholder="ex)1330 Broadway" value={this.state.house.address} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">CITY</label>
                    <input name="city" id="city" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.city} placeholder="ex)San Francisco" />
                  </div>
                  <div className="col">
                    <div className="form-group" id="col-left">
                      <label className="" htmlFor="state">STATE</label>
                      <input name="state" id="state" type="text" className="form-control" value={this.state.house.state} onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                      <label className="" htmlFor="zipcode">ZIPCODE</label>
                      <input name="zipcode" id="zipcode" type="text" className="form-control" value={this.state.house.zipcode} onChange={this.handleInput}  />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="houseYear">YEAR BUILT</label>
                    <input name="houseYear" id="houseYear" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.houseYear}  />
                  </div>
                  <div className="form-group">
                    <label className="" htmlFor="houseSqft">SQUARE FEET</label>
                    <input name="houseSqft" id="houseSqft" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.houseSqft}  />
                  </div>

                </div>

              <div className="form-group">
                <button type="submit" className="btn">SAVE</button>
              </div>

          </form>
      </div>
    )
  }
}
export default withRouter(CreateContainer)

// import React, { Component } from 'react';
// import Nav from '../../Nav'
// import axios from 'axios'
// import Moment from 'react-moment';
// import './Create.css';
//
// class CreateContainer extends Component {
//   constructor(){
//     super()
//     this.state = {
//       house : {
//         address : '',
//         city:'',
//         state: '',
//         zipcode: '',
//         year: '',
//         sqft: '',
//         pic1: [],
//         memo: '',
//       },
//       preview1: null,
//       preview2: null,
//       preview3: null,
//       preview4: null,
//       selectedFile : null,
//     }
//   }
//
//
//   componentDidMount(){
//
//   }
//
//   handleInput = (e) => {
//
//     const updatedChange = {
//       ...this.state.house
//     }
//     updatedChange[e.target.name] = e.target.value;
//
//     this.setState({
//       house: updatedChange
//     })
//   }
//
//   handleClick = (e) => {
//
//     var h = document.getElementById(`input-${e.target.id}`)
//     h.click();
//
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedHouse = {
//       ...this.state.house
//     }
//
//     this.addHouse(updatedHouse)
//
//
//     this.setState({
//       house : {
//         address : '',
//         // address2 : '',
//         city: '',
//         state: '',
//         zipcode: '',
//         year: '',
//         sqft: '',
//         pic1: null,//null
//         // pic2: null,
//         // pic3: null,
//         // pic4: null,
//         memo: '',
//         userId: '',
//         // postingTime: time,
//       },
//     })
//   }
//   //
//   // addHouse2 = async(updatedHouse) => {
//   //   try{
//   //       const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house`, {
//   //         method: 'POST',
//   //         credentials: 'include',
//   //         body: JSON.stringify(updatedHouse),
//   //         headers: {
//   //           'Content-Type' : 'application/json'
//   //         }
//   //       });
//   //       console.log("response", response);
//   //
//   //       if(!response.ok){
//   //         throw Error(response.statusText)
//   //       }
//   //       console.log("3");
//   //       // console.log('addreport=>', response);
//   //       const parsedCreateHouse = await response.json();
//   //       // console.log('out....', parsedCreateReport);
//   //       // console.log(parsedCreateReport.data._id);
//   //       // console.log('parsedCreateHouse ===>', parsedCreateHouse.data);
//   //       localStorage.setItem('houseId', parsedCreateHouse.data._id)
//   //       localStorage.setItem('authorId', parsedCreateHouse.data.authorId)
//   //       localStorage.setItem('authorname', parsedCreateHouse.data.authorname)
//   //
//   //       this.props.history.push('/home');
//   //
//   //     } catch(err) {
//   //       console.log('cannot make house');
//   //     }
//   //   }
//
//
//     fileSelectHandler = (e) => {
//       var file1, file2, file3, file4;
//
//       // var singleFile = ''
//       switch (e.target.id) {
//         case 'input-photoOne':
//             file1 = e.target.files[0];
//           break;
//         case 'input-photoTwo':
//            file2 = e.target.files[0]; // ?? index
//            break;
//        case 'input-photoThree':
//           file3 = e.target.files[0];
//           break;
//
//        case 'input-photoFour':
//            file4 = e.target.files[0];
//            break;
//         default:
//           console.log('errorrrrr');
//           return 0;
//
//       }
//
//       var reader1 = new FileReader();
//       var reader2 = new FileReader();
//       var reader3 = new FileReader();
//       var reader4 = new FileReader();
//
//       var url1 = typeof file1 !== 'undefined'? reader1.readAsDataURL(file1):null;
//       var url2 = typeof file2 !== 'undefined'? reader2.readAsDataURL(file2):null;
//       var url3 = typeof file3 !== 'undefined'? reader3.readAsDataURL(file3):null;
//       var url4 = typeof file4 !== 'undefined'? reader4.readAsDataURL(file4):null;
//
//
//       reader1.onloadend = function(e){
//         this.setState({
//           preview1: [reader1.result || null],
//         })
//       }.bind(this)
//
//       reader2.onloadend = function(e){
//         this.setState({
//           preview2: [reader2.result || null],
//         })
//       }.bind(this)
//
//       reader3.onloadend = function(e){
//         this.setState({
//           preview3: [reader3.result || null],
//         })
//       }.bind(this)
//
//       reader4.onloadend = function(e){
//         this.setState({
//           preview4: [reader4.result || null],
//         })
//       }.bind(this)
//
//
//
//       this.setState({
//         house: {
//           ...this.state.house,
//           pic1: [...this.state.house.pic1, e.target.files[0]]
//         }
//       })
//     }
//
//
//     addHouse = async(updatedHouse) => {
//
//         const data = new FormData();
//
//         for(let i = 0; i < this.state.house.pic1.length; i++){
//             data.append('photo', this.state.house.pic1[i]);
//         }
//
//         data.append('address', this.state.house.address);
//         data.append('city', this.state.house.city);
//         data.append('state', this.state.house.state);
//         data.append('zipcode', this.state.house.zipcode);
//         data.append('year', this.state.house.year);
//         data.append('sqft', this.state.house.sqft);
//         data.append('memo', this.state.house.memo);
//         data.append('time', this.state.house.time);
//
//         let userId = localStorage.getItem('userId');
//         data.append('userId', userId)
//
//         let username = localStorage.getItem('username');
//         data.append('username', username)
//
//         const time = new Date();
//         data.append('postingTime', time)
//
//         axios.post(`${process.env.REACT_APP_API}/api/v1/house`, data, {
//           headers: {
//             'content-type': 'multipart/form-data'
//           }
//         })
//         .then(res => {
//           // console.log(res.statusText, "here???", res.data.msg);
//           this.props.history.push('/home/' + userId);
//         })
//     }
//
//
//   render(){
//
//     return(
//
//       <div>
//         <Nav />
//           <form onSubmit={this.handleSubmit} className="createForm">
//             <div className="createContainer">
//                 <div className="container-panel">
//
//                   <div className="container-photos">
//                     <div><img className="frames" id="photoOne" src={this.state.preview1} onClick={this.handleClick } height={100} width={100} /></div>
//                       <input name="photoOne" className="hide" id="input-photoOne" onChange={this.fileSelectHandler} type="file"/>
//                     <div><img className="frames" id="photoTwo" src={this.state.preview2}  onClick={this.handleClick } height={100} width={100} /></div>
//                       <input name="photoTwo" className="hide" id="input-photoTwo" onChange={this.fileSelectHandler} type="file"/>
//                     <div><img className="frames" id="photoThree" src={this.state.preview3} onClick={this.handleClick } height={100} width={100} /></div>
//                       <input name="photoThree" className="hide" id="input-photoThree" onChange={this.fileSelectHandler} type="file"/>
//                     <div><img className="frames" id="photoFour" src={this.state.preview4} onClick={this.handleClick } height={100} width={100} /></div>
//                       <input name="photoFour" className="hide" id="input-photoFour" onChange={this.fileSelectHandler} type="file"/>
//                   </div>
//                 </div>
//                 <div className="container-form-group">
//                   <div>
//                     <label htmlFor="address">Address:</label>
//                     <input name="address" id="address" type="text" className="form-control" onChange={this.handleInput} placeholder="ex)1330 Broadway" value={this.state.house.address} required/>
//                   </div>
//                   <div>
//                     <label htmlFor="city">City:</label>
//                     <input name="city" id="city" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.city} placeholder="ex)San Francisco" required/>
//                   </div>
//                   <div>
//                     <label className="" htmlFor="state">State:</label>
//                     <input name="state" id="state" type="text" className="form-control" placeholder="ex)CA" value={this.state.house.state} onChange={this.handleInput} required/>
//                   </div>
//                   <div className="form-group">
//                     <label className="" htmlFor="zipcode">Zipcode:</label>
//                     <input name="zipcode" id="zipcode" type="text" className="form-control" placeholder="ex)94612" value={this.state.house.zipcode} onChange={this.handleInput} required />
//                   </div>
//                   <div className="form-group">
//                     <label className="" htmlFor="year">Year:</label>
//                     <input name="year" id="year" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.year} placeholder="ex)YYYY" required/>
//                   </div>
//                   <div className="form-group">
//                     <label className="" htmlFor="sqft">Sq.ft.:</label>
//                     <input name="sqft" id="sqft" type="text" className="form-control" onChange={this.handleInput} value={this.state.house.sqft} placeholder="ex)960" required/>
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="memo">Memo:</label>
//                     <textarea name="memo" id="memo" className="form-control" rows="3" cols="10" onChange={this.handleInput} value={this.state.house.memo} placeholder="ex)Any memo">
//                     </textarea>
//                   </div>
//                 </div>
//
//               <div className="container-submitBtn">
//                 <input type="submit" className="submitBtn" />
//               </div>
//             </div>
//           </form>
//       </div>
//     )
//   }
// }
// export default CreateContainer
