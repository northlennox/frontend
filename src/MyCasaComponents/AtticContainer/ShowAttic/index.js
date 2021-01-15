import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowAttic = (props) => {
  const photo = props.attic.atticImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      </div>
      <div className="updateContainer">
        <button className="deleteBtn" onClick={props.deleteMyAttic.bind(null, userId)}>Remove</button>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggle">
              <div className="postedLabel">Attic Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div>-<span>{props.attic.atticType}</span></div>
                <div>-<span>{props.attic.atticSqft}</span></div>
                <div>-<span>{props.attic.atticDepth}</span></div>
                <div>-<span>{props.attic.insulMaterial}</span></div>
                <div>-<span>{props.attic.airSealed}</span></div>
              </div>
              <div className="updateContainer">
                <div><Link to={"/mycasa/attic/edit"}>Edit</Link></div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowAttic
