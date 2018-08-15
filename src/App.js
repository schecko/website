import React, { Component } from 'react';
import './App.css';

var GITHUB = "https://github.com/schecko";

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	console.log(win)
	win.focus();
}

class App extends Component {
	render() {
		return (
	  		<div className="App">
				<h1> Scott Checko </h1>
				<a href="{ GITHUB }" onClick = { () => { openInNewTab(GITHUB) } }>{ GITHUB }</a>
	  		</div>
		);
  	}
}

export default App;
