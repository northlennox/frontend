import React from 'react';
import { Link } from 'react-router-dom';

const ShowAttic = (props) => {
  const photo = props.attic.atticImg
  return(
    <div>
      <img src={`http://localhost:9000/` + photo}/>
      <div>{props.attic.atticType}</div>
      <div>{props.attic.atticSqft}</div>
      <div>{props.attic.atticDepth}</div>
      <div>{props.attic.insulMaterial}</div>
      <div>{props.attic.airSealed}</div>
      <Link to={"/mycasa/attic/edit"}>Edit</Link>
    </div>
  )
}
export default ShowAttic
