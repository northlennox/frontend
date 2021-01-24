import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from '../Nav';
import './RegisterLogin.scss'

class RegisterLoginContainer extends Component {
  constructor(){
    super()

    this.state = {
      register: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phNumber: '',
        emailNotice: '',
        mobileNotice: ''
      },
      login : {
        email: '',
        password: '',
        successful: false
      }
    }
  }


  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const updatedRegister = {
      ...this.state.register
    }

    //add regex later!
    const regex =  true;

    if(regex){
      this.fetchRegister(updatedRegister)
      this.setState({
        register: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phNumber: '',
          emailNotice: '',
          mobileNotice: ''
        }
      })
    }else{
      console.log('It is bad password')
      this.setState({
        register: updatedRegister
      })
    }
  }

  handleRegisterChange = (e) => {
    const updatedChange = {
      ...this.state.register
    }
    updatedChange[e.target.name] = e.target.value;

    this.setState({
      register: updatedChange
    })
  }


  fetchRegister = async(updatedRegister) => {

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(updatedRegister),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    if(!response.ok){
      throw Error(response.statusText)
    }

    const parsedResponse = await response.json();

    sessionStorage.setItem('userId', parsedResponse.userId);

    this.props.history.push('/home')

    }catch(err){
      console.log('fetchRegister function is fail/post request is failed')
    }
  }



//------------------- LOG IN---------------------------

handleLoginSubmit = (e) => {
  e.preventDefault();
  const updatedLogin = {
    ...this.state.login
  }

  this.fetchLogin(updatedLogin)
}

handleLoginChange = (e) => {
  const updatedChange = {
    ...this.state.login
  }
  updatedChange[e.target.name] = e.target.value;

  this.setState({
    login : updatedChange
  })
}

fetchLogin = async(updatedLogin) => {

  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(updatedLogin),
      headers: {
        'Content-Type' : 'application/json'
      }
    });

    if(!response.ok){
      throw Error(response.statusText);
    }

    const parsedResponse = await response.json();
    console.log(parsedResponse.status);
    if(parsedResponse.status !== 401){
      updatedLogin.successful = true;
      this.setState({
        login: updatedLogin
      })

      sessionStorage.setItem('userId', parsedResponse.userId)
      this.props.history.push('/home');

    }else{
      alert('login fail')
    }
  }catch(err){
    alert('login fail2')
    console.log(err)

  }
}



  render(){

    return(
      <div>
        <div className="navContainer">
          <div className="navRow" id="logo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="logContainer">
                <div className="logoImg" style={{ marginRight: '20px' }}><img src={process.env.PUBLIC_URL + '/logo.png'}/></div>
                <div className="logoText"><img src={process.env.PUBLIC_URL + '/electricasa.png'}/></div>
              </div>
            </Link>
          </div>
        </div>
        <div className="loginContainer">
          <form onSubmit={this.handleLoginSubmit}>
            <div className="formContainer">
              <label style={{marginBottom: "6px", fontSize: "14px"}}>EMAIL</label>
              <input className="loginInput" type="text" name="email" onChange={this.handleLoginChange} placeholder="Email" />
              <label style={{marginBottom: "6px", fontSize: "14px"}}>PASSWORD</label>
              <input className="loginInput" type="password" name="password" onChange={this.handleLoginChange} placeholder="Password"/>
              <button className="btn" type="submit">LOGIN</button>
            </div>
          </form>
            <div id="registerBox"><div>Don't have an account? <Link to="/signup">SIGNUP</Link></div></div>
       </div>
      </div>
    )
  }
}
export default RegisterLoginContainer
