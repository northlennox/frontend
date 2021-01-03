import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowRoof = (props) => {
  const photo = props.roof.roofImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <Accordion>
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggle">
              <div className="postedLabel">Roof Details</div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div>{props.roof.exterior}</div>
                <div>{props.roof.roofColor}</div>
                <div>{props.roof.pvSystem}</div>
                <div>{props.roof.panels}</div>
                <div>{props.roof.dcCapacity}</div>
              </div>
              <div className="updateContainer">
                <div><Link to={"/mycasa/roof/edit"}>Edit</Link></div>
                <button onClick={props.deleteMyRoof.bind(null, userId)}>Remove</button>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowRoof
