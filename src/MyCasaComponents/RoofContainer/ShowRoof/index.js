import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowRoof = (props) => {
  const photo = props.roof.roofImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
              <div className="postedLabel">Roof Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.roof.exterior}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.roof.roofColor}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.roof.pvSystem}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.roof.panels}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.roof.dcCapacity}</span><span>kw DC Capacity</span></div>
              </div>
              <div className="updateContainer">
                <div><Link to={"/mycasa/roof/edit"}>Edit</Link></div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowRoof
