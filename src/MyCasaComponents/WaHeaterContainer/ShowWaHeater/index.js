import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowWaHeater = (props) => {
  const photo = props.waHeater.waHeaterImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
        <Accordion>
          <Card className="card">
            <Card.Header className="header">
              <Accordion.Toggle variant="link" eventKey="0" className="toggle">
                <div className="postedLabel">Water Heater Details</div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="cardBody">
                <div className="postedInfo">
                  <div>{props.waHeater.waHeatertype}</div>
                  <div>{props.waHeater.waHeaterBrand}</div>
                  <div>{props.waHeater.waHeaterYear}</div>
                  <div>{props.waHeater.waHeaterCondition}</div>
                  <div>{props.waHeater.waHeaterSingle}</div>
                </div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/waheater/edit"}>Edit</Link></div>
                  <button onClick={props.deleteMyWaHeater.bind(null, userId)}>Remove</button>
                </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
          </Accordion>
    </div>
  )
}
export default ShowWaHeater
