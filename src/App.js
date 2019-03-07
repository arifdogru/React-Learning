import React, { Component } from 'react';
import User from "./components/User"
import Navbar from "./components/Navbar"


import './App.css';

class App extends Component {
  render() {
    const deneme = "dogru";
    const isAuth= true;
    return (
    

      <div className = "container">
          <Navbar title = "User App 2"></Navbar>
          <hr/>
          <User
          name="Arif Doğru"
          meslek = "Yazılım Mühendisi"
          firma = "ESYS Yazılım Bilişim"
          />
      </div>

      /*
      <div className="App">
        <h1> Merhaba React </h1>
        <h1>{"arif".toUpperCase()}</h1>
        <h4>{deneme}</h4>
        <div>
        {
          isAuth ? <p>Kullanıcı Kayıtlı</p>
          : null
        }
        </div>

        <h4 style = {{color:"red",fontSize:"30px"}}>App Component</h4>
        <h4 className="header">App Component</h4>
        
        
        <User/>
        <User/>
        <User/>
        <User></User>
      </div>*/

    );
  }
}

export default App;
