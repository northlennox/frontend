import React, { Component } from 'react';
import Nav from './../../Nav';
import { Link, withRouter } from 'react-router-dom';

class HouseContainer extends Component {
  constructor(){
    super()
    this.state = {
      house: '',
    }
  }

  componentDidMount(){
    this.getOneHouse();
  }

  getOneHouse = async() => {
    const userId = localStorage.getItem('userId');

    try{
      const response = await fetch(`${process.env.REACT_APP_API}/api/v1/house/${userId}`,  {
        credentials: 'include'
      })

      if(!response.ok){
        throw Error(response.statusText)
      }

      const houseParsed = await response.json();

      this.setState({
          house: houseParsed.data,
      })

    }catch(err){
      return err
    }
  }




  deleteHouse = async(id, e) => {
    // e.preventDefault();
    try {
      const deleteHouse = await fetch(`${process.env.REACT_APP_API}/api/v1/house/` + id, {
        method: 'DELETE',
        // credentials: 'include'
      })

      // const parsedResponse = await deleteHouse.json();

      this.props.history.push('/mycasa')

    }catch(err){
      console.log(err)
    }
  }


  render(){
    return(
      <div>
        <Nav />
        <div>Show house</div>
          <Link to={`/mycasa/edit/house`}>Edit</Link>
          <button onClick={this.deleteHouse.bind(null, this.state.house._id)}>delete</button>
          <img className="img" src={`${process.env.REACT_APP_API}/` + this.state.house.houseImg } />
          <div>{this.state.house.address}</div>
          <div>{this.state.house.city}</div>
          <div>{this.state.house.state}</div>
          <div>{this.state.house.zipcode}</div>
          <div>{this.state.house.houseYear}</div>
          <div>{this.state.house.houseSqft}</div>
      </div>
    )
  }
}

export default withRouter(HouseContainer)

//<div><img src={`${process.env.REACT_APP_API}/` + this.state.house.houseImg} /></div>
