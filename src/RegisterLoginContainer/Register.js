import React, { Component } from 'react';
import Nav from '../Nav';

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

  render(){

    return(
      <div>
        <Nav />
        <div className="registerContainer">
          <form onSubmit={this.handleRegisterSubmit}>
            <div className="formContainer">
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="email">EMAIL</label>
                <input type="email" name="email" value={this.state.register.email} onChange={this.handleRegisterChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="password">PASSWORD</label>
                <input type="password" name="password" value={this.state.register.password} onChange={this.handleRegisterChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="firstName">FIRST NAME</label>
                <input type="text" name="firstName" value={this.state.register.firstName} onChange={this.handleRegisterChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="lastName">LAST NAME</label>
                <input type="text" name="lastName" value={this.state.register.lastName} onChange={this.handleRegisterChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="phNumber">PHONE NUMBER</label>
                <input type="text" name="phNumber" value={this.state.register.phNumber} onChange={this.handleRegisterChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="emailNotice">EMAIL NOTIFICATION</label>
                <div id="emailNotice" >
                  <input name="emailNotice" type="radio" checked={this.state.register.emailNotice === "yes"} value="yes" onChange={this.handleRegisterChange}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="emailNotice" type="radio" checked={this.state.register.emailNotice === "no"} value="no" onChange={this.handleRegisterChange}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="mobileNotice">MOBILE NOTIFICATION</label>
                <div id="mobileNotice" >
                  <input name="mobileNotice" type="radio" checked={this.state.register.mobileNotice === "yes"} value="yes" onChange={this.handleRegisterChange}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="mobileNotice" type="radio" checked={this.state.register.mobileNotice === "no"} value="no" onChange={this.handleRegisterChange}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button className="btn" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default RegisterLoginContainer
