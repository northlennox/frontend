import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';


class Footer extends Component {
  constructor(){
    super()
    this.state = {

      }
    }


  render(){

    return (
      <div className="footer_container">
        <div className="footer_items"><Link to="/"className="link">About Us</Link></div>
        <div className="footer_items"><Link to="/"className="link">Contact Us</Link></div>
        <div className="footer_items"><Link to="/"className="link">Terms of Use</Link></div>
      </div>
    )
  }
}
export default Footer
