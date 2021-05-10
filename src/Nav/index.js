import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Nav.scss";

const Nav = (props) => {
  const userId = sessionStorage.getItem("userId");
  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/logout`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const responseParsed = await response.json();

      if (responseParsed.status === 200) {
        // const cookies = new Cookies();
        // cookies.remove('userId');
        sessionStorage.removeItem("userId");
        props.history.push("/");
      }
    } catch (err) {
      console.log("fail to logout");
    }
  };

  return (
    <>
      {!sessionStorage.getItem("userId") ? (
        <div className="container navContainer">
          <div className="navRow" id="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logContainer">
                <div className="logoImg">
                  <img src={process.env.PUBLIC_URL + "/logo.png"} />
                </div>
                <div className="logoText">
                  <img src={process.env.PUBLIC_URL + "/electricasa.png"} />
                </div>
              </div>
            </Link>
          </div>
          <div className="navRow navLog">
            <div className="navItem">
              <Link
                to={`/login`}
                className="links"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="navItemText"
                  id="loginSolo"
                  style={{ color: "#979797" }}
                >
                  Login
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (


        <nav class="navbar navbar-expand-lg navbar-light">
          <div className="navbar-brand" id="logo">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="logContainer">
                <div className="logoImg" style={{ marginRight: "20px" }}>
                  <img src={process.env.PUBLIC_URL + "/logo.png"} />
                </div>
                <div className="logoText">
                  <img src={process.env.PUBLIC_URL + "/electricasa.png"} />
                </div>
              </div>
            </Link>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse navContainer__navRow">
              <div className="navbar-nav">
                <Link to={`/home`} className="nav-item nav-link links">
                  <div>Electrify</div>
                </Link>
                <Link to={`/mycasa/${userId}`} className="nav-item nav-link links">
                  <div>My Casa</div>
                </Link>
                <Link to={`/myproject/${userId}`} className="nav-item nav-link links">
                  <div>Projects</div>
                </Link>
                <Link to={`/myaccount/${userId}`} className="nav-item nav-link links">
                  <div>Account</div>
                </Link>
                <button onClick={logout} id="logout">
                  <div className="nav-item nav-link">Log Out</div>
                </button>
              </div>
            </div>
          </nav>

      )}
    </>
  );
};

export default withRouter(Nav);
