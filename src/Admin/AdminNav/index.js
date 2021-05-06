import React from 'react';

import { Link, withRouter } from 'react-router-dom';

const AdminNav = (props) => {
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
          <Link to="/adminhome">Home</Link>
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

export default withRouter(AdminNav);
