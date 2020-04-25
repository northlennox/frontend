import React, { Component } from 'react';
import Nav from '../Nav';
//import MyHouseComponenet from '../MyHouseComponenet';
import ShowHouseContainer from '../ShowHouseContainer';
//import CreateContainer from '../CreateContainer';
import './Home.scss';



class HomeContainer extends Component {
  constructor(){
    super()
    this.state = {
      userinfo: {
        email:'',
        password: '',
        username:'',
        name: '',
      },
      house: {
        street: '',
        address: '',
        state: '',
        zipcode: '',
        year: '',
        sqft: '',
        userId: '',
      },

      myHouses: [],
      allHouses: []
    }
  }

  componentDidMount(){
    this.getUserInfo();
    this.getMyHouse();
    this.getAllHouses();
  }

  getUserInfo = async() => {
      const userId = localStorage.getItem('userId');

      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + userId, {
          credentials: 'include'
        })

        if(!response.ok){
          throw Error(response.statusText)
        }


        const parsedResponse = await response.json();

        this.setState({
          userinfo: parsedResponse.data
        })

      }catch(err){
        console.log('getuserinfo func fail', err);
      }
  }


  getAllHouses = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/allHouses`, {
        credentials: 'include'
      })

      console.log('response is? ', response);
      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();
      console.log('all houses responseParsed', responseParsed.data);
      this.setState({
        allHouses : responseParsed.data
      })

    }catch(err){
      console.log('fetching getMyhouse fail');
    }
  }


    //get my house
    getMyHouse = async() => {
      const userId = localStorage.getItem('userId');
      // const userId = localStorage.getItem('userId');
      console.log('what is u?????', userId);
      try{
        const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/house/`+ userId, {
          credentials: 'include'
        })

        // console.log('response is? ', response);
        if(!response.ok){
          throw Error(response.statusText)
        }

        const responseParsed = await response.json();
        console.log('responseParsed', responseParsed.data);
        this.setState({
          myHouses : responseParsed.data
        })

      }catch(err){
        console.log('fetching getMyhouse fail');
      }
    }




    // deleteHouse = async(id, e) => {
    //   // e.preventDefault();
    //   try {
    //     const deleteHouse = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + id, {
    //       method: 'DELETE',
    //       // credentials: 'include'
    //     })
    //
    //     // const parsedResponse = await deleteHouse.json();
    //
    //     this.setState({
    //       allHouses: this.state.allHouses.filter((house) => house._id !== id)
    //     })
    //   }catch(err){
    //     console.log(err)
    //   }
    // }



  render(){
    // let photoplace = {
    //   height: 200,
    //   width: 500
    // }

    return (
      <div className="home">
        <Nav username={this.state.userinfo.username} email={this.state.userinfo.email} name={this.state.userinfo.name}/>
        <div className="home_container">
          <div className="userinfo">
            <div className="adminMessage">Welcome!</div>
            <div className="username">{this.state.userinfo.name}</div>
        </div>
        <div className="myhouse">
          <ShowHouseContainer deleteHouse={this.deleteHouse} />
        </div>
        </div>
      </div>
    )
  }
}

export default HomeContainer

// <div className="house">
//   <MyHouseComponenet allHouses={this.state.allHouses} deleteHouse={this.deleteHouse} />
// </div>
