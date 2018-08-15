import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var myStyle = {
           fontSize: 100,
           color: '#FF0000'
     }

    return (
        <div>
            <h1> Header </h1>
            <h2> Content </h2>
            <p style = { myStyle }> this is the content </p>
        </div>
    );
  }
}

export default App;
