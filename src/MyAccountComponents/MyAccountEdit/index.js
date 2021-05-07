import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Nav from '../Nav';


class MyAccountEdit extends Component{
  constructor(){
    super();
    this.state = {
      userInfo: {},
    }
  }

  handleEditFormInput = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    })
  }

  editMyinfo = async(e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId')

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.userInfo),
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      this.props.history.push('/home')

    }catch(err){
      return err
    }
  }


  render(){
    return(
      <div>
        <Nav />
        <div>
          <h2>Edit</h2>
          <form onSubmit={this.editMyinfo} className="form">
            <div>Email:  <input className="" name="email" value={this.state.userInfo.email} onChange={this.handleEditFormInput}/></div>
            <div>Password: <input className="" name="password" value={this.state.userInfo.password} onChange={this.handleEditFormInput}/></div>
            <div>Name: <input className="" name="name" value={this.state.userInfo.name} onChange={this.handleEditFormInput}/></div>
            <div><button className="" type="submit">Edit</button></div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(MyAccountContainer);
