import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Nav';

class MyAccountContainer extends Component {
  constructor(){
    super()
    this.state = {
      userinfo : {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phNumber: '',
          emailNotice: '',
          mobileNotice: ''
        }
    }
  }

  componentDidMount(){
    this.getMyinfo()
  }

  getMyinfo = async() => {
    const userId = localStorage.getItem('userId');

    try{
      const response = await fetch(`http://localhost:9000/api/v1/auth/` + userId, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const userParsed = await response.json();

      this.setState({
          userinfo: userParsed.data
      })

    }catch(err){
      console.log('get myinfo is failed?')
      return err
    }
  }

  render(){
    const userId = localStorage.getItem('userId');
    if(!userId) {
      this.props.history.push('/');
    }
    console.log(this.state.userinfo);

    return(
      <div>
        <Nav />
        <h1>Account</h1>
        <label>Name:</label><div>{this.state.userinfo.firstName + ' ' +this.state.userinfo.lastName}</div><Link to={`/myaccount/${userId}/edit`}>Edit</Link>
        <label>Email:</label><div>{this.state.userinfo.email}</div>
        <label>Phone Number:</label><div>{this.state.userinfo.phNumber}</div>
        <label>Account Plan:</label><div>Free Plan</div>
        <label>Email Notification:</label><div>{this.state.userinfo.emailNotice}</div>
        <label>Text Notication:</label><div>{this.state.userinfo.mobileNotice}</div>
        <label>Privacy and Setting:</label><Link to="">View Terms of Use</Link>
      </div>
    )
  }
}

export default MyAccountContainer;
