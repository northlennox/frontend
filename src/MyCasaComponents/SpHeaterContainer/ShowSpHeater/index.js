import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowSpHeater = (props) => {
  const photo = props.spHeater.spHeaterImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <Accordion>
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggle">
              <div className="postedLabel">Space Heater Details</div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">
                <div className="postedInfo">
                  <div>{props.spHeater.spHeaterType}</div>
                  <div>{props.spHeater.spHeaterBrand}</div>
                  <div>{props.spHeater.spHeaterYear}</div>
                  <div>{props.spHeater.spHeaterCondition}</div>
                  <div>{props.spHeater.coolingSystem}</div>
                </div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/spheater/edit"}>Edit</Link></div>
                  <button onClick={props.deleteMySpHeater.bind(null, userId)}>Remove</button>
                </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
          </Accordion>
    </div>
  )
}
export default ShowSpHeater
