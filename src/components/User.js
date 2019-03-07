import React, { Component } from 'react'

class User extends Component {
  render() {

    //Destructing
    const{name,meslek,firma} = this.props;
    return (
      <div>
        <ul>
          <li>İsim : {name} </li>
          <li>Meslek: {meslek} </li>
          <li>Firma: {firma}</li>
        </ul>
      </div>
    )
  }
}
export default User;