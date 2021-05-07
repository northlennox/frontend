import React from 'react';
import './MyHouseComponenet.css';
import { Link } from 'react-router-dom'

const MyHouseComponenet = (props) => {

  const myHouse = props.allHouses.map(house => {
    if(house.userId === localStorage.getItem('userId')){
    return(
      <div className="oneHouse-container" key={house._id}>
        <div className="oneHouse">
          <div className="top">
            <Link to={`/${house._id}`}><img className="mainPhoto" src={`${process.env.REACT_APP_API}/` + house.productImage1} /></Link>
          </div>

          <div className="summary">
            <div className="home-status">
              { house.status === undefined ?
                <div id="status-t">In-progress</div>
                :
                <div id="status-f">{house.status}</div>
              }
            </div>
            <div>{house.address}</div>
            <div>{house.state}</div>
            <div>{house.zipcode}</div>
          </div>

          <div className="seeEditDelete">
            <div className="seeLink">
              <Link to={`/${house._id}`} style={{ textDecoration: 'none' }}><span className="linkFont">See</span></Link>
            </div>
            <div className="editLink">
              <Link to={`/${house._id}/edit`} style={{ textDecoration: 'none' }}><span className="linkFont">Edit</span></Link>
            </div>
            <div className="rightBtndelete">
              <button className="rightBtnborder" type="button" onClick={props.deleteHouse.bind(null, house._id)}>Delete</button>
            </div>
          </div>
        </div>
        <div className="postingTime">{house.postingTime}</div>
      </div>
      )
    }
  });

  return (
    <div>
      <div className="grid">
        {myHouse}
        <div className="create">
          <Link to="/create">
            <img id="createBtn" src="../icon/plus.png" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyHouseComponenet


// import React from 'react';
// import { Link } from 'react-router-dom'
//
// const MyHouseComponenet = (props) => {
//   const myHouse = props.allHouses.map(house => {
//     if(house.userId === localStorage.getItem('userId')){
//     return(
//       <tr key={house._id}>
//           <td><Link to={`/${house._id}`}><img className="mainPhoto" src={`${process.env.REACT_APP_API}/` + house.productImage} /></Link></td>
//           <td>{house.address}</td>
//           <td>{house.state}</td>
//           <td>{house.zipcode}</td>
//           <td><Link className="btn btn-primary" to={`/${house._id}/edit`}>Edit</Link>
//           <button className="close pt-2 ml-0" type="button" onClick={props.deleteHouse.bind(null, house._id)}><span className="pr-5">X</span></button>
//           </td>
//       </tr>
//       )
//     }
//   });
//
//   return (
//
//     <div className="container">
//         <table className="table table-striped text-center">
//           <thead>
//             <tr>
//               <th scope="col">
//                 Image
//               </th>
//               <th scope="col">Address</th>
//               <th scope="col">State</th>
//               <th scope="col">Zipcode</th>
//               <th scope="col">Edit/Remove</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myHouse}
//           </tbody>
//         </table>
//     </div>
//   )
// }
//
// export default MyHouseComponenet
