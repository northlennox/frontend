import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowSpHeater = (props) => {
  const photo = props.spHeater.spHeaterImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      </div>
      <div className="updateContainer">
        <button className="deleteBtn spanNext" onClick={props.deleteMySpHeater.bind(null, userId)}>Remove</button>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
              <div className="postedLabel">Space Heater Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div>-<span>{props.spHeater.spHeaterType}</span></div>
                <div>-<span>{props.spHeater.spHeaterBrand}</span></div>
                <div>-<span>{props.spHeater.coolingSystem}</span><span className="spanNext">Cooling System</span></div>
                <div>-<span>{props.spHeater.spHeaterCondition}</span></div>
                <div>-<span>{props.spHeater.spHeaterYear}</span></div>
              </div>
              <div className="updateContainer">
                <div><Link to={"/mycasa/spheater/edit"}>Edit</Link></div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}
export default ShowSpHeater
