import React from 'react';

import { Link, withRouter } from 'react-router-dom';

const Nav = (props) => {
  const userId = localStorage.getItem('userId');
  const logout = async() => {
    try{  
      const response = await fetch(`http://localhost:9000/api/v1/auth/logout`, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText);
      }

      const responseParsed = await response.json();


      if(responseParsed.status === 200){
        console.log(responseParsed.status === 200);
        // const cookies = new Cookies();
        // console.log('cookie =>', cookies);
        // cookies.remove('userId');
        localStorage.removeItem('userId')
        props.history.push('/')
      }

    }catch(err){
      console.log('fail to logout')
    }
  }



  return(
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/mycasa">My Casa</Link>
        </li>
        <li className="nav-item">
          <Link to={`/myaccount/${userId}`}>My Account</Link>
        </li>
        <li className="nav-item">
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
    )
}

export default withRouter(Nav);
