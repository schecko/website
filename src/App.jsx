import React from 'react';
import GithubIntegration from "./components/GithubIntegration"

class App extends React.Component {
	render() {
		return (
	  		<div className="App">
				<h1> Scott Checko </h1>
				<GithubIntegration />
	  		</div>
		);
  	}
}

export default App;
