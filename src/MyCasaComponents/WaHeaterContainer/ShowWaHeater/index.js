import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowWaHeater = (props) => {
  const photo = props.waHeater.waHeaterImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      </div>
      <div className="updateContainer">
        <button className="deleteBtn" onClick={props.deleteMyWaHeater.bind(null, userId)}>Remove</button>
      </div>
        <Accordion className="accordion">
          <Card className="card">
            <Card.Header className="header">
              <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
                <div className="postedLabel">Water Heater Details</div>
                <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">
                <div className="postedInfo">
                  <div>-<span>{props.waHeater.waHeatertype}</span></div>
                  <div>-<span>{props.waHeater.waHeaterBrand}</span></div>
                  <div>-<span>{props.waHeater.waHeaterYear}</span><span className="spanNext">Year of Manufacture</span></div>
                  <div>-<span>{props.waHeater.waHeaterCondition === "YES" ? <span>System is Working Well</span> : <span>...?</span>}</span></div>
                  <div>-<span>{props.waHeater.waHeaterSingle === "YES" ? <span>One Water Heater</span> : <span>...?</span> }</span></div>
                </div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/waheater/edit"}>Edit</Link></div>
                </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
          </Accordion>
    </div>
  )
}
export default ShowWaHeater
