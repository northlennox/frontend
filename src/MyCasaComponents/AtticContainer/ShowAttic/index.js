import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowAttic = (props) => {
  const photo = props.attic.atticImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <Accordion>
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggle">
              <div className="postedLabel">Attic Details</div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="postedInfo">
                <div>{props.attic.atticType}</div>
                <div>{props.attic.atticSqft}</div>
                <div>{props.attic.atticDepth}</div>
                <div>{props.attic.insulMaterial}</div>
                <div>{props.attic.airSealed}</div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/attic/edit"}>Edit</Link></div>
                  <button className="deleteBtn spanNext" onClick={props.deleteMyAttic.bind(null, userId)}>Remove</button>
                </div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowAttic
