import React, { Component } from 'react';

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

    localStorage.setItem('userId', parsedResponse.userId);

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

      localStorage.setItem('userId', parsedResponse.userId)
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
        <div>Login</div>
        <form onSubmit={this.handleLoginSubmit}>
          <input type="text" name="email" onChange={this.handleLoginChange} placeholder="email" />
          <input type="password" name="password" onChange={this.handleLoginChange} placeholder="Password"/>
          <button type="submit">Login</button>
        </form>

        <div>Register</div>
        <form onSubmit={this.handleRegisterSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.register.email} onChange={this.handleRegisterChange}/>
          <input type="password" name="password" placeholder="Password" value={this.state.register.password} onChange={this.handleRegisterChange}/>
          <input type="text" name="firstName" placeholder="firstName" value={this.state.register.firstName} onChange={this.handleRegisterChange}/>
          <input type="text" name="lastName" placeholder="lastName" value={this.state.register.lastName} onChange={this.handleRegisterChange}/>
          <input type="text" name="phNumber" placeholder="phNumber" value={this.state.register.phNumber} onChange={this.handleRegisterChange}/>
          <input type="text" name="emailNotice" placeholder="emailNotice" value={this.state.register.emailNotice} onChange={this.handleRegisterChange}/>
          <input type="text" name="mobileNotice" placeholder="mobileNotice" value={this.state.register.mobileNotice} onChange={this.handleRegisterChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
export default RegisterLoginContainer
