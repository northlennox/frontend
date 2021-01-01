import React from 'react';
import { Link } from 'react-router-dom';
import '../../MyCasaDashboard/MyCasaDashboard.scss';

const ShowHouse = (props) => {
  console.log('here', props);
  const photo = props.house.houseImg;
  const userId = localStorage.userId;

  return(
    <div className="postedContainer">
      <div className="postedFrame"><img className="postedImg" src={`${process.env.REACT_APP_API}/` + photo} /></div>
      <div className="postedLabel">House Details</div>
      <div className="postedInfo">
        <div>{props.house.address}</div>
        <div>{props.house.city}</div>
        <div>{props.house.state}</div>
        <div>{props.house.zipcode}</div>
        <div>{props.house.houseSqft}</div>
        <div>{props.house.houseYear}</div>
        <Link to={"/mycasa/house/edit"}>Edit</Link>
        <button onClick={props.deleteMyHouse.bind(null, userId)}>Remove</button>
      </div>
    </div>
  )
}
export default ShowHouse


// onClick={props.deleteMyHouse.bind(null, userId)}


// <div className="frameContainer">
//   <img className="showImg" src={`${process.env.REACT_APP_API}/` + photo}/>
//
//     <div className="smtitle">House Details</div>
//     <div>{props.house.address}</div>
//     <div>{props.house.city}</div>
//     <div>{props.house.state}</div>
//     <div>{props.house.zipcode}</div>
//     <div>{props.house.houseSqft}</div>
//     <div>{props.house.houseYear}</div>
//     <Link to={"/mycasa/house/edit"}>Edit</Link>
//     <button onClick={props.deleteMyHouse.bind(null, userId)}>Remove</button>
//
// </div>
