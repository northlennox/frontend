import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NavHome.css';




class NavHome extends Component{
  constructor(){
    super()
    this.state = {
      userinfo: {
        email:'',
        password: '',
        username:'',
        name: '',
      },
    }
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

  logout = async() => {
    const userId = localStorage.getItem('userId')
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/logout`, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText)
      }

      const responseParsed = await response.json();

      if(response.status === 200){
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        this.props.history.push('/login')
      }

    }catch(err){
      console.log('logout fail', err);
    }
  }

  render(){
    return(
      <div>
        <div className="navHome">
          <img id="logo" className="logo" src="../icon/greenbanc.png" />

          <div className="nav-home-menu" >
            <div className="nav-item-home">
              <Link to="/" style={{ textDecoration: 'none' }}><div className="navItem-home">About us</div></Link>
            </div>
            <div className="nav-item-home">
              <a href="https://www.greenbanc.com/" style={{ textDecoration: 'none' }}><div className="navItem-home">GreenBanc</div></a>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavHome);
