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
        <Link to={"/mycasa/utility/edit"}><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></Link>
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
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.utilityName}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.electricityUsageKwh}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.electricityUsageDollar}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.gasUsageTherms}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.gasUsageDollar}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.highBilling}</span></div>
                <div><span className="checkNext"><img src="./../checkMark.svg" /></span><span>{props.utility.oldEquipment}</span></div>
              </div>
            </Card.Body>
           </Accordion.Collapse>
          </Card>
        </Accordion>
    </div>
  )
}
export default ShowUtility
