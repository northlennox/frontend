import React from 'react';
import { Link } from 'react-router-dom';

const ShowAttic = (props) => {
  const photo = props.attic.atticImg;
  const userId = localStorage.getItem('userId');
  return(
    <div className="frameContainer">
      <img className="showImg" src={`${process.env.REACT_APP_API}/` + photo}/>
      <div className="smtitle">Attic Details</div>
      <div>{props.attic.atticType}</div>
      <div>{props.attic.atticSqft}</div>
      <div>{props.attic.atticDepth}</div>
      <div>{props.attic.insulMaterial}</div>
      <div>{props.attic.airSealed}</div>
      <Link to={"/mycasa/attic/edit"}>Edit</Link>
      <button onClick={props.deleteMyAttic.bind(null, userId)}>Remove</button>
    </div>
  )
}
export default ShowAttic
