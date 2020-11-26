import React from 'react';
import { Link } from 'react-router-dom';

const ShowSpHeater = (props) => {
  const photo = props.spHeater.spHeaterImg;
  const userId = localStorage.getItem('userId');
  console.log('props in sp', props);
  return(
    <div>
      <img src={`http://localhost:9000/` + photo}/>
      <div>{props.spHeater.spHeaterType}</div>
      <div>{props.spHeater.atticSqft}</div>
      <div>{props.spHeater.spHeaterYear}</div>
      <div>{props.spHeater.spHeaterCondition}</div>
      <div>{props.spHeater.coolingSystem}</div>
      <Link to={"/mycasa/spheater/edit"}>Edit</Link>
      <button onClick={props.deleteMySpHeater.bind(null, userId)}>Remove</button>
    </div>
  )
}
export default ShowSpHeater
