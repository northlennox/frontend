import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Nav from '../Nav';
import './RegisterLogin.scss'

class RegisterLoginContainer extends Component {
  constructor(){
    super()

    this.state = {
      login : {
        email: '',
        password: '',
        successful: false
      }
    }
  }


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
      alert('Incorrect email or password.')
    }
  }catch(err){
    alert('Incorrect email or password.')
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
              <input className="loginInput" type="email" name="email" onChange={this.handleLoginChange} placeholder="Email" />
              <label style={{marginBottom: "6px", fontSize: "14px"}}>PASSWORD</label>
              <input className="loginInput" type="password" name="password" onChange={this.handleLoginChange} placeholder="Password"/>
              <button className="btn" type="submit">LOGIN</button>
            </div>
          </form>
            <div id="registerBox"><div>Don't have an account? <Link to="/signup">SIGN UP</Link></div></div>
       </div>
      </div>
    )
  }
}
export default RegisterLoginContainer
