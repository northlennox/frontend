import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowHouse = (props) => {
  const photo = props.house.houseImg;
  const userId = sessionStorage.userId;

  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <Link to={"/mycasa/house/edit"}><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo} /></Link>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
              <div className="postedLabel">House Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span>{props.house.address}</div>
                <div>
                  <span className="checkNext"><img src="./../checkMark.svg" /></span>
                  <span>{props.house.city}</span>
                  <span className="spanNext">{props.house.state}</span>
                  <span className="spanNext">{props.house.zipcode}</span>
                </div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.house.houseSqft}</span><span className="spanNext">Square Feet</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.house.houseYear}</span><span className="spanNext">Year Built</span></div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  );
};

export default ShowHouse;
