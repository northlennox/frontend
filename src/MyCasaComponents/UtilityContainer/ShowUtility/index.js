import React from 'react';
import { Link } from 'react-router-dom';

const ShowUtility = (props) => {
  console.log(props);
  const photo = props.utility.utilityImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <div className="postedLabel">Utility Details</div>
      <div className="postedInfo">
        <div>{props.utility.utilityName}</div>
        <div>{props.utility.electricityUsageKwh}</div>
        <div>{props.utility.electricityUsageDollar}</div>
        <div>{props.utility.gasUsageTherms}</div>
        <div>{props.utility.gasUsageDollar}</div>
        <div>{props.utility.highBilling}</div>
        <div>{props.utility.oldEquipment}</div>
        <Link to={"/mycasa/utility/edit"}>Edit</Link>
        <button onClick={props.deleteMyUtility.bind(null, userId)}>Remove</button>
      </div>
    </div>
  )
}
export default ShowUtility
