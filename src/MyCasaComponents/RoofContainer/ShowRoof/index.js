import React from 'react';
import { Link } from 'react-router-dom';

const ShowRoof = (props) => {
  const photo = props.roof.roofImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo}/></div>
      <div className="postedLabel">Roof Details</div>
      <div className="postedInfo">
        <div>{props.roof.exterior}</div>
        <div>{props.roof.roofColor}</div>
        <div>{props.roof.pvSystem}</div>
        <div>{props.roof.panels}</div>
        <div>{props.roof.dcCapacity}</div>
        <Link to={"/mycasa/roof/edit"}>Edit</Link>
        <button onClick={props.deleteMyRoof.bind(null, userId)}>Remove</button>
      </div>
    </div>
  )
}
export default ShowRoof
