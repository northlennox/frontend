import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';
import { Button, Card, Accordion } from 'react-bootstrap';

const ShowUtility = (props) => {
  console.log(props);
  const photo = props.utility.utilityImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <Accordion>
        <Card className="card">
          <Card.Header className="header">
            <Accordion.Toggle variant="link" eventKey="0" className="toggle">
              <div className="postedLabel">Utility Details</div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="cardBody">
              <div className="postedInfo">
                <div>{props.utility.utilityName}</div>
                <div>{props.utility.electricityUsageKwh}</div>
                <div>{props.utility.electricityUsageDollar}</div>
                <div>{props.utility.gasUsageTherms}</div>
                <div>{props.utility.gasUsageDollar}</div>
                <div>{props.utility.highBilling}</div>
                <div>{props.utility.oldEquipment}</div>
                <div className="updateContainer">
                  <div><Link to={"/mycasa/utility/edit"}>Edit</Link></div>
                  <button onClick={props.deleteMyUtility.bind(null, userId)}>Remove</button>
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
