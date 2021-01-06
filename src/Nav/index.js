import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.scss'

const Nav = (props) => {
  const userId = sessionStorage.getItem('userId');
  const logout = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/logout`, {
        credentials: 'include'
      });

      if(!response.ok){
        throw Error(response.statusText);
      }

      const responseParsed = await response.json();

      if(responseParsed.status === 200){
        // const cookies = new Cookies();
        // cookies.remove('userId');
        sessionStorage.removeItem('userId')
        props.history.push('/')
      }
    }catch(err){
      console.log('fail to logout')
    }
  }


  return(
    <>
      { !sessionStorage.getItem('userId') ?

        <div className="navContainer">
          <div className="navRow" id="logo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="logContainer">
                <div className="logoImg"><img src={process.env.PUBLIC_URL + '/logo.png'}/></div>
                <div className="logoText"><img src={process.env.PUBLIC_URL + '/electricasa.png'}/></div>
              </div>
            </Link>
          </div>
          <div className="navRow">
            <div className="navItem">
              <Link to={`/login`} className="links" style={{ textDecoration: 'none' }}>
                <div className="navItemText" id="loginSolo" style={{ color : '#979797'}}>Login</div>
              </Link>
            </div>
          </div>
        </div>
      :
      <div className="navContainer">
        <div className="navRow" id="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logContainer">
              <div className="logoImg" style={{ marginRight: '20px' }}><img src={process.env.PUBLIC_URL + '/logo.png'}/></div>
              <div className="logoText"><img src={process.env.PUBLIC_URL + '/electricasa.png'}/></div>
            </div>
          </Link>
        </div>
        <div className="navRow navSecond">
          <div className="navItem">
            <Link to={`/home`} className="links" style={{ textDecoration: 'none' }}>
              { window.location.pathname.split('/')[1] === 'home'? <div className="navItemText" id="electrify" style={{ color : 'black'}}>Electrify</div> : <div className="navItemText" id="electrify" style={{ color : '#979797'}}>Electrify</div> }
            </Link>
          </div>
          <div className="navItem">
            <Link to={`/mycasa/${userId}`} className="links" style={{ textDecoration: 'none' }}>
              { window.location.pathname.split('/')[1] === 'mycasa'? <div className="navItemText" id="mycasa" style={{ color : 'black'}}>My Casa</div> : <div className="navItemText" id="mycasa" style={{ color : '#979797'}}>My Casa</div> }
            </Link>
          </div>
          <div className="navItem">
            <Link to={`/myproject/${userId}`} className="links" style={{ textDecoration: 'none' }}>
             { window.location.pathname.split('/')[1] === 'myproject'? <div className="navItemText" id="myproject" style={{ color : 'black'}}>My Project</div> : <div className="navItemText" id="myproject" style={{ color : '#979797'}}>My Project</div> }
            </Link>
          </div>
          <div className="navItem">
            <Link to={`/myaccount/${userId}`} className="links" style={{ textDecoration: 'none' }}>
              { window.location.pathname.split('/')[1] === 'myaccount'? <div className="navItemText" id="myaccount" style={{ color : 'black'}}>My Account</div> : <div className="navItemText" id="myaccount" style={{ color : '#979797'}}>My Account</div> }
            </Link>
          </div>
          <div className="navItem">
            <button onClick={logout} id="logout"><div className="navItemText">Logout</div></button>
          </div>
        </div>
      </div>
      }


    </>

    )
}

export default withRouter(Nav);
