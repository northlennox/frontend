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
        <Link to={"/mycasa/attic/edit"}><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></Link>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
              <div className="postedLabel">Attic Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.attic.atticType}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.attic.atticSqft}</span> Square Feet</div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.attic.atticDepth}</span> Inches</div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.attic.insulMaterial}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span>Air Sealed: <span>{props.attic.airSealed === "Yes" ? "Yes" : "No"}</span></div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowAttic
