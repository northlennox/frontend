import React from 'react';
import { Link } from 'react-router-dom';

const ShowRoof = (props) => {
  console.log('showRoof');
  const photo = props.roof.roofImg;
  const userId = localStorage.getItem('userId');
  return(
    <div>
      <img src={`http://localhost:9000/` + photo}/>
      <div>{props.roof.exterior}</div>
      <div>{props.roof.roofColor}</div>
      <div>{props.roof.pvSystem}</div>
      <div>{props.roof.panels}</div>
      <div>{props.roof.dcCapacity}</div>
      <Link to={"/mycasa/roof/edit"}>Edit</Link>
      <button onClick={props.deleteMyRoof.bind(null, userId)}>Remove</button>
    </div>
  )
}
export default ShowRoof
