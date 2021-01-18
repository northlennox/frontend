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


  componentDidMount(){
    this.getMyinfo()
  }

  getMyinfo = async() => {
    const userId = sessionStorage.getItem('userId');

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

//edit
  handleSubmit = async(e) =>{
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');

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
      const userId = sessionStorage.getItem('userId');
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/users/` + userId, {
        method: 'DELETE',
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();
      console.log('responseParsed? =>', responseParsed)
      if(responseParsed.status === 200){
        sessionStorage.removeItem('userId')

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
    const userId = sessionStorage.getItem('userId');
    if(!userId) {
      this.props.history.push('/');
    }


    return(
      <div>
        <Nav />
        <div className="editContainer">
          <div className="editTitle h2">Update Personal Information</div>
          <div className="editBox">
            <form onSubmit={this.handleSubmit}>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="firstName">First Name</label>
                <input type="firstName" name="firstName" value={this.state.userinfo.firstName} onChange={this.handleChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="lastName">Last Name</label>
                <input type="lastName" name="lastName" value={this.state.userinfo.lastName} onChange={this.handleChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="phNumber">Phone Number</label>
                <input type="phNumber" name="phNumber" value={this.state.userinfo.phNumber} onChange={this.handleChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="password">Password</label>
                <input type="password" name="password" onChange={this.handleChange}/>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="emailNotice">Email Notice</label>
                <div id="emailNotice">
                  <input name="emailNotice" type="radio" checked={this.state.userinfo.emailNotice === "yes"} value="yes" onChange={this.handleChange}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="emailNotice" type="radio" checked={this.state.userinfo.emailNotice === "no"} value="no" onChange={this.handleChange}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <label className="inputLabel" htmlFor="emailNotice">Mobile Notice</label>
                <div id="mobileNotice" >
                  <input name="mobileNotice" type="radio" checked={this.state.userinfo.mobileNotice === "yes"} value="yes" onChange={this.handleChange}/><span className="radioNext">YES</span>
                  <input className="radioInput-right" name="mobileNotice" type="radio" checked={this.state.userinfo.mobileNotice === "no"} value="no" onChange={this.handleChange}/><span className="radioNext">NO</span>
                </div>
              </div>
              <div className="inputContainer">
                <button className="btn" type="submit">Edit</button>
              </div>
            </form>
            <form onSubmit={this.deleteMyacc}>
              <div className="inputContainer">
                <button className="deleteAccBtn" type="submit">delete my account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditMyAccount;
