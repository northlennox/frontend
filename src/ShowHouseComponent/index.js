import React from 'react';

const ShowHouseComponent = (props) => {
  console.log('what is props????====>', props);
  return(
    <div className="container">
      <div className="text-center mt-4 pb-5">
        <h1>{props.showHouse.address}</h1>
      </div>
      <div className="row mb-4">
        <div className="col-8 offset-3">
          <div className="row">
            <div className="col-4 offset-1 mt-3">
              <p className="infoList">Address :</p>
              <p className="infoList">Address2 :</p>
              <p className="infoList">State :</p>
              <p className="infoList">Zipcode :</p>
              <p className="infoList">Year :</p>
              <p className="infoList">Sqft :</p>
              <p className="infoList">memo :</p>
              <p className="infoList">photo1 :</p>
              <p className="infoList">photo2 :</p>
              <p className="infoList">photo3 :</p>
              <p className="infoList">photo4 :</p>
              <p className="infoList">Attic Insulation :</p>
              <p className="infoList">WH year :</p>
              <p className="infoList">WH EF :</p>
              <p className="infoList">WH Fuel :</p>
              <p className="infoList">Heating Year :</p>
              <p className="infoList">Heating EF :</p>
              <p className="infoList">Heating Fuel :</p>
              <p className="infoList">Status :</p>
              <p className="infoList">Memo :</p>
            </div>
            <div className="col-4 offset-1 mt-3">
            <p className="infoData">{props.showHouse.address}</p>
            <p className="infoData">{props.showHouse.address2}</p>
            <p className="infoData">{props.showHouse.state}</p>
            <p className="infoData">{props.showHouse.zipcode}</p>
            <p className="infoData">{props.showHouse.year}</p>
            <p className="infoData">{props.showHouse.sqft}</p>
            <p className="infoData">{props.showHouse.memo}</p>
            <p className="infoData"><img src={`${process.env.REACT_APP_API}/` + props.showHouse.productImage} height={100} width={100}/></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowHouseComponent

//
// <p className="infoData">{props.house.attic}</p>
// <p className="infoData">{props.house.whyear}</p>
// <p className="infoData">{props.house.whef}</p>
// <p className="infoData">{props.house.whfuel}</p>
// <p className="infoData">{props.house.heatyear}</p>
// <p className="infoData">{props.house.heatef}</p>
// <p className="infoData">{props.house.heatfuel}</p>
// <p className="infoData">{props.house.status}</p>
// <p className="infoData">{props.house.memo2}</p>
