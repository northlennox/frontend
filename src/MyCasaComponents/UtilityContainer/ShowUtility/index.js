import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowUtility = (props) => {
  console.log(props);
  const photo = props.utility.utilityImg;
  const userId = sessionStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame">
        <img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      </div>
      <div className="updateContainer">
        <button className="deleteBtn" onClick={props.deleteMyUtility.bind(null, userId)}>Remove</button>
      </div>
      <Accordion className="accordion">
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggleShow">
              <div className="postedLabel">Utility Details</div>
              <div className="detailArr"><img className="down" src="./../../dropdown_drop.svg" /></div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div><span>{props.utility.utilityName}</span></div>
                <div><span>{props.utility.electricityUsageKwh}</span></div>
                <div><span>{props.utility.electricityUsageDollar}</span></div>
                <div><span>{props.utility.gasUsageTherms}</span></div>
                <div><span>{props.utility.gasUsageDollar}</span></div>
                <div><span>{props.utility.highBilling}</span></div>
                <div><span>{props.utility.oldEquipment}</span></div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/utility/edit"}>Edit</Link></div>
                </div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowUtility
