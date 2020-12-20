import React from 'react';
import { Link } from 'react-router-dom';

const ShowWaHeater = (props) => {
  const photo = props.waHeater.waHeaterImg;
  const userId = localStorage.getItem('userId');
  return(
    <div>
      <img src={`${process.env.REACT_APP_API}/` + photo}/>
      <div className="smtitle">Water Heater Details</div>
      <div>{props.waHeater.waHeatertype}</div>
      <div>{props.waHeater.waHeaterBrand}</div>
      <div>{props.waHeater.waHeaterYear}</div>
      <div>{props.waHeater.waHeaterCondition}</div>
      <div>{props.waHeater.waHeaterSingle}</div>
      <Link to={"/mycasa/waheater/edit"}>Edit</Link>
      <button onClick={props.deleteMyWaHeater.bind(null, userId)}>Remove</button>
    </div>
  )
}
export default ShowWaHeater
