import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Nav';

class EditMyAccount extends Component {
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

//edit
  handleSubmit = async(e) =>{
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/` + userId, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.state.userinfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok){
      console.log('handle submit for edit is fail')
      throw Error(response.statusText);
    }

    const parsedResponse = await response.json();

    if(parsedResponse.status === 200){

      this.props.history.push('/myaccount/' + userId)
    }else{
      console.log('data was not equal to use is updated')
    }
  }

  handleChange = (e) => {
    this.setState({
      userinfo: {
        ...this.state.userinfo,
      [e.target.name] : e.target.value
      }
    })
  }

//delete
  deleteMyacc = async(e) => {
    e.preventDefault()//MEMO: button will refresh the page by default

    try{
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + userId, {
        method: 'DELETE',
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();
      // console.log('responseParsed? =>', responseParsed)
      if(responseParsed.status === 200){
        //localStorage.setItem('userId', responseParsed.userId)
        //PROBLEM: this is for logging out. delete acc is not logout
        this.props.history.push('/')
      }else{
        console.log('this is fail')
      }


    }catch(err){
      alert('delete is failed')
      console.log('delete is fail')
    }

  }



  render(){
    const userId = localStorage.getItem('userId');
    if(!userId) {
      this.props.history.push('/');
    }


    return(
      <div>
        <Nav />
        <h1>Edit</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="firstName" name="firstName" placeholder="firstName" value={this.state.firstName} onChange={this.handleChange}/>
            <input type="lastName" name="lastName" placeholder="lastName" value={this.state.lastName} onChange={this.handleChange}/>
            <input type="phNumber" name="phNumber" placeholder="phNumber" value={this.state.phNumber} onChange={this.handleChange}/>
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
            <input type="emailNotice" name="emailNotice" placeholder="emailNotice" value={this.state.emailNotice} onChange={this.handleChange}/>
            <input type="mobileNotice" name="mobileNotice" placeholder="mobileNotice" value={this.state.mobileNotice} onChange={this.handleChange}/>
            <button className="btn btn-primary form-control" type="submit">Edit</button>
          </form>
          <form onSubmit={this.deleteMyacc}>
            <button type="submit">delete my account</button>
          </form>
      </div>
    )
  }
}

export default EditMyAccount;
