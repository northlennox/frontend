import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowWaHeater = (props) => {
  const photo = props.waHeater.waHeaterImg;
  const userId = sessionStorage.getItem('userId');
  console.log(props.waHeater.waHeaterSingle)
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <Link to={"/mycasa/waheater/edit"}><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></Link>
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
                  <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.waHeater.waHeatertype}</span></div>
                  <div><span className="checkNext"><img src="./../checkMark.svg" /></span>Brand : <span>{props.waHeater.waHeaterBrand}</span></div>
                  <div><span className="checkNext"><img src="./../checkMark.svg" /></span>Year Build: <span>{props.waHeater.waHeaterYear}</span><span className="spanNext"></span></div>
                  <div><span className="checkNext"><img src="./../checkMark.svg" /></span>Condition : <span>{props.waHeater.waHeaterCondition === "Yes" ? "Good" :  "Not Good"}</span></div>
                  <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.waHeater.waHeaterSingle === "Yes" ? "Multiple Water heaters" : "Single Water heater"}</span></div>
                </div>
              </Card.Body>
             </Accordion.Collapse>
            </Card>
          </Accordion>
    </div>
  )
}
export default ShowWaHeater
