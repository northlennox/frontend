import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Nav';
import './../MyAccount.scss';

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
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/` + userId, {
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
        <div className="accountContainer">
          <div className="titleContainer">
            <div className="title h2">Account</div>
          </div>
          <div className="myInfoContainer">
            <table>
              <tr>
                <th><div>Name:</div></th>
                <th>{this.state.userinfo.firstName + ' ' +this.state.userinfo.lastName}<Link to={`/myaccount/${userId}/edit`}>Edit</Link></th>
              </tr>
              <tr>
               <th><div>Email:</div></th>
               <th>{this.state.userinfo.email}</th>
              </tr>
              <tr>
                <th><div>Phone Number:</div></th>
                <th>{this.state.userinfo.phNumber}</th>
              </tr>
              <tr>
              </tr>
              <tr>
              </tr>
              <tr>
              </tr>
              <tr>
              </tr>
              <tr>
              </tr>
              <tr>
              </tr>

            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default MyAccountContainer;



// <th><div>Email:</div></th>
// <th><div>Phone Number:</div></th>
// <th><div>Account Plan:</div></th>
// <th><div>Email Notification:</div></th>
// <th><div>Text Notication:</div></th>
// <th><div>Privacy and Setting:</div></th>
//
// <td>{this.state.userinfo.email}</td>
// <td>{this.state.userinfo.phNumber}</td>
// <td>Free Plan</td>
// <td>{this.state.userinfo.emailNotice}</td>
// <td>{this.state.userinfo.mobileNotice}</td>
// <td><Link to="">View Terms of Use</Link></td>
